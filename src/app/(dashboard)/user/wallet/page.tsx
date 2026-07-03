"use client";

import { useState } from "react";
import { Transaction, Withdrawal } from "./types";
import { BalanceCards } from "@/components/user-dashboard/wallet/BalanceCards";
import { WithdrawalModal } from "@/components/user-dashboard/wallet/WithdrawalModal";
import { TransactionTable } from "@/components/user-dashboard/wallet/TransactionTable";
import { WithdrawalTable } from "@/components/user-dashboard/wallet/WithdrawalTable";
import { toast } from "sonner";

const mockTransactions: Transaction[] = [
  { id: "tx1", date: "Oct 24, 2023", description: "Task Approved: UI Testing", type: "Task", amount: 1500, status: "Completed" },
  { id: "tx2", date: "Oct 22, 2023", description: "Referral Bonus: John D.", type: "Referral", amount: 500, status: "Completed" },
  { id: "tx3", date: "Oct 20, 2023", description: "Task Approved: Google Review", type: "Task", amount: 350, status: "Completed" },
  { id: "tx4", date: "Oct 19, 2023", description: "Task Pending: Survey", type: "Task", amount: 500, status: "Pending" },
  { id: "tx5", date: "Oct 15, 2023", description: "Welcome Bonus", type: "Bonus", amount: 1000, status: "Completed" },
];

const mockWithdrawals: Withdrawal[] = [
  { id: "w1", date: "Oct 10, 2023", method: "Bank Transfer", accountDetails: "**** 1234", amount: 8000, status: "Processed" },
  { id: "w2", date: "Sep 25, 2023", method: "Mobile Money", accountDetails: "0801***456", amount: 5000, status: "Failed" },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"transactions" | "withdrawals">("transactions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock State
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(mockWithdrawals);
  const [availableBalance, setAvailableBalance] = useState(12500);
  
  const pendingBalance = 500;
  const bonusEarnings = 1000;
  const referralEarnings = 500;

  const handleWithdrawRequest = (amount: number, method: string) => {
    // Deduct from available balance
    setAvailableBalance(prev => prev - amount);
    
    // Add to withdrawal history
    const newWithdrawal: Withdrawal = {
      id: `w${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      method,
      accountDetails: method === "Bank Transfer" ? "**** 1234" : "0801***456", // Mock detail
      amount,
      status: "Pending"
    };
    
    setWithdrawals([newWithdrawal, ...withdrawals]);
    setIsModalOpen(false);
    toast.success(`Withdrawal request for ₦${amount.toLocaleString()} submitted successfully!`);
    
    // Switch to withdrawals tab so user sees the new entry
    setActiveTab("withdrawals");
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
        bonusEarnings={bonusEarnings}
        referralEarnings={referralEarnings}
        onWithdrawClick={() => setIsModalOpen(true)}
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
          <TransactionTable transactions={mockTransactions} />
        ) : (
          <WithdrawalTable withdrawals={withdrawals} />
        )}
      </div>

      <WithdrawalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableBalance={availableBalance}
        onWithdraw={handleWithdrawRequest}
      />
    </div>
  );
}
