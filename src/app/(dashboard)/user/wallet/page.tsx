"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import { Transaction, Withdrawal } from "./types";
import { BalanceCards } from "@/components/user-dashboard/wallet/BalanceCards";
import { WithdrawalModal } from "@/components/user-dashboard/wallet/WithdrawalModal";
import { TransactionTable } from "@/components/user-dashboard/wallet/TransactionTable";
import { WithdrawalTable } from "@/components/user-dashboard/wallet/WithdrawalTable";
import { toast } from "sonner";
import { requestWithdrawalAction } from "./actions";

const DepositModal = dynamic(() => import("@/components/user-dashboard/wallet/DepositModal").then(mod => mod.DepositModal), {
  ssr: false,
});

const mockTransactions: Transaction[] = [];

const mockWithdrawals: Withdrawal[] = [];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"transactions" | "withdrawals">("transactions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  
  // State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [withdrawableBalance, setWithdrawableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [bonusEarnings, setBonusEarnings] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [bankDetails, setBankDetails] = useState<{ bankName: string; accountNumber: string; accountName: string } | null>(null);

  useEffect(() => {
    async function fetchWallet() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: walletData } = await supabase
          .from("wallets")
          .select("balance, pending_balance, total_earned")
          .eq("user_id", user.id)
          .single();
          
        const { data: profileData } = await supabase
          .from("profiles")
          .select("bank_name, account_number, account_name")
          .eq("id", user.id)
          .single();
          
        if (profileData && profileData.bank_name) {
          setBankDetails({
            bankName: profileData.bank_name,
            accountNumber: profileData.account_number,
            accountName: profileData.account_name || ""
          });
        }
        
        if (walletData) {
          setAvailableBalance(walletData.balance);
          setPendingBalance(walletData.pending_balance);
          setBonusEarnings(walletData.total_earned);
        }

        const { data: refData } = await supabase
          .from("referrals")
          .select("reward_amount")
          .eq("referrer_id", user.id)
          .eq("status", "completed");
          
        if (refData) {
          const refSum = refData.reduce((acc, curr) => acc + Number(curr.reward_amount), 0);
          setReferralEarnings(refSum);
        }

        // Fetch Transactions
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (txData) {
          const formattedTx: Transaction[] = txData.map((tx: any) => ({
            id: tx.id,
            date: new Date(tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: tx.metadata?.description || `${tx.type.charAt(0).toUpperCase() + tx.type.slice(1).toLowerCase().replace('_', ' ')}`,
            type: tx.type,
            amount: Number(tx.amount),
            status: tx.status,
          }));
          setTransactions(formattedTx);

          const sumDeposits = txData
            .filter((tx: any) => tx.type?.toLowerCase() === "deposit" || (tx.metadata?.description || "").toLowerCase().includes("deposit") || (tx.description || "").toLowerCase().includes("deposit"))
            .reduce((acc: number, tx: any) => acc + Number(tx.amount), 0);
          setTotalDeposit(sumDeposits);
        }

        // Fetch Withdrawals
        const { data: wData } = await supabase
          .from("withdrawal_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        let pastWithdrawalsSum = 0;
        if (wData) {
          const formattedW: Withdrawal[] = wData.map((w: any) => ({
            id: w.id,
            date: new Date(w.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            method: "Bank Transfer",
            accountDetails: `${w.bank_name} - ${w.account_number}`,
            amount: Number(w.amount),
            status: w.status === "Approved" ? "Processed" : w.status,
          }));
          setWithdrawals(formattedW);

          pastWithdrawalsSum = wData
            .filter((w: any) => w.status !== "Rejected")
            .reduce((acc: number, w: any) => acc + Number(w.amount), 0);
        }

        if (walletData) {
          const wb = Math.min(walletData.balance, walletData.total_earned - pastWithdrawalsSum);
          setWithdrawableBalance(Math.max(wb, 0));
        }
      }
    }
    fetchWallet();
  }, []);

  const handleWithdrawRequest = async (amount: number, method: string) => {
    toast.loading("Processing withdrawal...", { id: "withdraw" });
    
    const res = await requestWithdrawalAction(amount, method);
    
    if (res.success) {
      toast.success(`Withdrawal request for ₦${amount.toLocaleString()} submitted!`, { id: "withdraw" });
      
      // Optimistic update
      setAvailableBalance(prev => prev - amount);
      setWithdrawableBalance(prev => prev - amount);
      setPendingBalance(prev => prev + amount);
      
      const newWithdrawal: Withdrawal = {
        id: `w${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        method,
        accountDetails: bankDetails ? `${bankDetails.bankName} - ${bankDetails.accountNumber}` : "Local Bank - 1234567890",
        amount,
        status: "Pending"
      };
      
      setWithdrawals([newWithdrawal, ...withdrawals]);
      setIsModalOpen(false);
      setActiveTab("withdrawals");
    } else {
      toast.error(res.error || "Failed to process withdrawal", { id: "withdraw" });
    }
  };

  const handleDepositRequest = (amount: number, method: string) => {
    // Add to available balance and total deposit
    setAvailableBalance(prev => prev + amount);
    setTotalDeposit(prev => prev + amount);
    
    // Add to transaction history
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `Deposit: ${method}`,
      type: "deposit",
      amount,
      status: "Completed"
    };
    
    setTransactions([newTransaction, ...transactions]);
    setIsDepositModalOpen(false);
    toast.success(`Successfully deposited ₦${amount.toLocaleString()}!`);
    
    // Switch to transactions tab
    setActiveTab("transactions");
  };

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-500">Manage your earnings, request withdrawals, and view transaction history.</p>
      </div>

      <BalanceCards 
        availableBalance={availableBalance}
        pendingBalance={pendingBalance}
        depositBalance={totalDeposit}
        earningsBalance={withdrawableBalance}
        withdrawableBalance={withdrawableBalance}
        onWithdrawClick={() => setIsModalOpen(true)}
        onDepositClick={() => setIsDepositModalOpen(true)}
      />

      <div className="mt-12">
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          <button 
            onClick={() => setActiveTab("transactions")}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "transactions" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Transaction History
          </button>
          <button 
            onClick={() => setActiveTab("withdrawals")}
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "withdrawals" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Withdrawal History
          </button>
        </div>

        {activeTab === "transactions" ? (
          <TransactionTable transactions={transactions} />
        ) : (
          <WithdrawalTable withdrawals={withdrawals} />
        )}
      </div>

      <WithdrawalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableBalance={withdrawableBalance}
        bankDetails={bankDetails}
        onWithdraw={handleWithdrawRequest}
      />

      <DepositModal 
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDepositRequest}
        highestDeposit={
          transactions
            .filter(tx => tx.type.toLowerCase() === 'deposit' || tx.description.toLowerCase().includes('deposit'))
            .reduce((max, tx) => Math.max(max, tx.amount), 0)
        }
      />
    </div>
  );
}
