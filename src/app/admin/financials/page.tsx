"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Wallet, 
  ClipboardList, 
  PiggyBank, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

import { adminProcessWithdrawalAction } from "../actions";

export default function FinancialsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [txPage, setTxPage] = useState(1);
  const [txTotal, setTxTotal] = useState(0);
  const PAGE_SIZE = 10;
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [pendingWithdrawalsSum, setPendingWithdrawalsSum] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    async function fetchFinancials() {
      const supabase = createClient();
      
      const { data: depositData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "DEPOSIT")
        .eq("status", "Completed");

      let deposits = 0;
      if (depositData) {
        deposits = depositData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalDeposits(deposits);
      }

      const { data: withdrawalData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "WITHDRAWAL")
        .eq("status", "Completed");

      if (withdrawalData) {
        const sum = withdrawalData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalWithdrawals(sum);
      }

      const { data: pendingWithdrawalData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "WITHDRAWAL")
        .eq("status", "Pending");

      if (pendingWithdrawalData) {
        const sum = pendingWithdrawalData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setPendingWithdrawalsSum(sum);
      }

      const { data: earningsData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "TASK_REWARD")
        .eq("status", "Completed");

      if (earningsData) {
        const sum = earningsData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalEarnings(sum);
      }

      // Fetch actual pending requests
      const { data: wData, count: wCount } = await supabase
        .from("withdrawal_requests")
        .select(`
          id, amount, bank_name, account_number, account_name, created_at, status,
          profiles!withdrawal_requests_user_id_fkey(full_name, email)
        `, { count: "exact" })
        .eq("status", "Pending")
        .order("created_at", { ascending: true })
        .limit(5);

      if (wCount !== null) {
        setTotalPendingRequests(wCount);
      }

      if (wData) {
        setRequests(wData.map((w: any) => {
          const profile = Array.isArray(w.profiles) ? w.profiles[0] : w.profiles;
          const fullName = profile?.full_name || "Unknown User";
          return {
            id: w.id,
            name: fullName,
            img: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=E2E8F0&color=333`,
            method: "BANK TRANSFER",
            amount: `₦${Number(w.amount).toLocaleString()}`,
            bank: w.bank_name,
            account: w.account_number
          };
        }));
      }

    }
    fetchFinancials();
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      const supabase = createClient();
      
      const from = (txPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data: txData, count } = await supabase
        .from("transactions")
        .select(`
          id, reference_id, type, amount, status, created_at,
          profiles!inner(full_name, email)
        `, { count: "exact" })
        .in("type", ["DEPOSIT", "WITHDRAWAL"])
        .order("created_at", { ascending: false })
        .range(from, to);

      if (txData) {
        setTransactions(txData.map((tx: any) => {
          const profile = Array.isArray(tx.profiles) ? tx.profiles[0] : tx.profiles;
          const fullName = profile?.full_name || "Unknown";
          const typeColor = tx.type === "DEPOSIT" ? "bg-blue-100 text-blue-700" : 
                            tx.type === "WITHDRAWAL" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-700";
          
          let statusColor = "bg-slate-50 text-slate-700";
          let dotColor = "bg-slate-500";
          if (tx.status === "Completed") {
            statusColor = "bg-green-50 text-green-700"; dotColor = "bg-green-500";
          } else if (tx.status === "Pending") {
            statusColor = "bg-amber-50 text-amber-700"; dotColor = "bg-amber-500";
          } else if (tx.status === "Failed" || tx.status === "Cancelled") {
            statusColor = "bg-red-50 text-red-700"; dotColor = "bg-red-500";
          }

          const initials = fullName.substring(0,2).toUpperCase();

          return {
            id: tx.reference_id,
            user: tx.profiles?.full_name || "Unknown",
            initials,
            color: "bg-slate-100 text-slate-700",
            type: tx.type,
            typeColor,
            amount: `₦${Number(tx.amount).toLocaleString()}`,
            amountColor: tx.type === "WITHDRAWAL" ? "text-rose-600" : "text-green-600",
            status: tx.status,
            statusColor,
            dotColor
          };
        }));
        if (count !== null) setTxTotal(count);
      }
    }
    
    fetchTransactions();
  }, [txPage]);

  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    toast.loading(`Processing request...`, { id: "process_withdrawal" });
    const res = await adminProcessWithdrawalAction(id, action);
    
    if (res.success) {
      setRequests(requests.filter(req => req.id !== id));
      toast.success(`Request ${action.toLowerCase()} successfully`, { id: "process_withdrawal" });
    } else {
      toast.error(res.error || "Failed to process request", { id: "process_withdrawal" });
    }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Four Cards Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Deposits */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Wallet className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Total Deposits</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦{totalDeposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </Card>

        {/* Total Withdrawals */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <PiggyBank className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Total Withdrawals</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦{totalWithdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </Card>

        {/* Pending Withdrawals */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <ClipboardList className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Pending Withdrawals</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦{pendingWithdrawalsSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </Card>

        {/* Total Earnings */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 9.1%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Total Earnings (Tasks)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦{totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </Card>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Span 2 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Revenue vs Payouts Chart Card */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="font-bold text-lg text-slate-900 tracking-tight">Revenue vs Payouts</h2>
                <p className="text-xs text-slate-500 mt-0.5">Last 30 days financial performance analysis</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Revenue
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Payouts
                </div>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="w-full h-[220px] relative overflow-x-auto scrollbar-hide">
              <div className="min-w-[500px] h-full">
                <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="800" y2="50" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="100" x2="800" y2="100" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="150" x2="800" y2="150" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="200" x2="800" y2="200" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
                
                {/* Payouts Line (Dashed Red) */}
                <path 
                  d="M 0,190 C 100,160 200,190 300,180 C 400,150 450,150 500,180 C 600,220 700,100 800,140" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="3" 
                  strokeDasharray="6 6"
                />
                
                {/* Revenue Line (Solid Green) */}
                <path 
                  d="M 0,180 C 50,110 100,70 200,130 C 300,200 350,50 450,70 C 550,90 600,170 700,20 C 750,-30 800,50 800,50" 
                  fill="none" 
                  stroke="#006e0d" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
              </div>
            </div>
          </Card>

          {/* Transaction History Table */}
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">Transaction History</h2>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold bg-slate-50 border-slate-200 text-slate-600 rounded-lg px-3 flex items-center gap-1.5 hover:bg-slate-100">
                  All Types <ChevronDown className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold bg-slate-50 border-slate-200 text-slate-600 rounded-lg px-3 flex items-center gap-1.5 hover:bg-slate-100">
                  All Statuses <ChevronDown className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold bg-slate-50 border-slate-200 text-slate-600 rounded-lg px-3 flex items-center gap-1.5 hover:bg-slate-100">
                  <Calendar className="w-3.5 h-3.5" /> Date Range
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-slate-400 uppercase bg-transparent font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">TRANSACTION ID</th>
                    <th className="px-6 py-4 font-bold">USER</th>
                    <th className="px-6 py-4 font-bold">TYPE</th>
                    <th className="px-6 py-4 font-bold">AMOUNT</th>
                    <th className="px-6 py-4 font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70 border-t border-slate-100">
                  {transactions.map((txn, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-slate-500 font-medium text-[13px]">{txn.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${txn.color}`}>
                            {txn.initials}
                          </div>
                          <span className="font-bold text-slate-900 text-sm">{txn.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${txn.typeColor}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold text-sm ${txn.amountColor || "text-green-600"}`}>
                          {txn.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${txn.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${txn.dotColor}`}></span>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-500 font-medium">
                Showing <span className="font-bold text-slate-700">{txTotal > 0 ? (txPage - 1) * PAGE_SIZE + 1 : 0}</span> to <span className="font-bold text-slate-700">{Math.min(txPage * PAGE_SIZE, txTotal)}</span> of {txTotal} results
              </span>
              
              {Math.ceil(txTotal / PAGE_SIZE) > 1 && (
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setTxPage(txPage - 1)}
                    disabled={txPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {(() => {
                    const totalPages = Math.ceil(txTotal / PAGE_SIZE) || 1;
                    const pages = [];
                    for (let i = 1; i <= totalPages; i++) {
                      if (i === 1 || i === totalPages || (i >= txPage - 1 && i <= txPage + 1)) {
                        pages.push(i);
                      } else if (pages[pages.length - 1] !== '...') {
                        pages.push('...');
                      }
                    }
                    
                    return pages.map((p, idx) => (
                      p === '...' ? (
                        <span key={`ellipsis-${idx}`} className="text-slate-400 text-xs font-bold px-1">...</span>
                      ) : (
                        <button 
                          key={p}
                          onClick={() => setTxPage(p as number)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold ${
                            p === txPage 
                              ? "bg-primary text-white" 
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    ));
                  })()}

                  <button 
                    onClick={() => setTxPage(txPage + 1)}
                    disabled={txPage === Math.ceil(txTotal / PAGE_SIZE)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </Card>
          
        </div>

        {/* Right Column - Span 1 (Pending Approval) */}
        <div className="lg:col-span-1">
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">Pending Approval</h2>
              <p className="text-xs text-slate-500 mt-0.5">Review and approve withdrawal requests</p>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 p-5 overflow-y-auto">
              {requests.map((req) => (
                <div key={req.id} className="border border-slate-100 rounded-xl p-4 shadow-sm relative group bg-white hover:border-slate-200 transition-all">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100">
                        <img src={req.img} alt={req.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{req.name}</h4>
                        <p className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-wider">{req.method}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-rose-500">{req.amount}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs mb-4">
                    <span className="text-slate-400">Bank Name:</span>
                    <span className="text-slate-900 font-medium text-right">{req.bank}</span>
                    <span className="text-slate-400">Account No:</span>
                    <span className="text-slate-900 font-medium text-right">{req.account}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleAction(req.id, "Approved")}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-9 text-xs rounded-lg shadow-sm"
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAction(req.id, "Rejected")}
                      className="w-full border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold h-9 text-xs rounded-lg"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              
              {requests.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-slate-500 font-medium">No pending requests.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-center">
              <Link href="/admin/withdrawals" className="text-[11px] font-extrabold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
                View All Pending Requests ({totalPendingRequests})
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
