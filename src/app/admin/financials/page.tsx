"use client";

import { useState } from "react";
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

// Mock Data
const transactionHistory = [
  {
    id: "#TXN-84291",
    user: "John Doe",
    initials: "JD",
    color: "bg-green-100 text-green-700",
    type: "DEPOSIT",
    typeColor: "bg-blue-100 text-blue-700",
    amount: "₦50,000",
    status: "Completed",
    statusColor: "bg-green-50 text-green-700",
    dotColor: "bg-green-500"
  },
  {
    id: "#TXN-84292",
    user: "Sarah Amadi",
    initials: "SA",
    color: "bg-blue-100 text-blue-700",
    type: "WITHDRAWAL",
    typeColor: "bg-rose-100 text-rose-700",
    amount: "₦12,500",
    amountColor: "text-rose-600",
    status: "Pending",
    statusColor: "bg-amber-50 text-amber-700",
    dotColor: "bg-amber-500"
  },
  {
    id: "#TXN-84293",
    user: "Michael Kola",
    initials: "MK",
    color: "bg-slate-100 text-slate-700",
    type: "TASK REWARD",
    typeColor: "bg-slate-100 text-slate-700",
    amount: "₦2,500",
    status: "Completed",
    statusColor: "bg-green-50 text-green-700",
    dotColor: "bg-green-500"
  }
];

const pendingRequests = [
  {
    id: "req1",
    name: "Adeola Bakare",
    img: "https://ui-avatars.com/api/?name=Adeola+Bakare&background=E2E8F0&color=333",
    method: "BANK TRANSFER",
    amount: "₦85,000",
    bank: "GTBank PLC",
    account: "012****984"
  },
  {
    id: "req2",
    name: "Chioma Eze",
    img: "https://ui-avatars.com/api/?name=Chioma+Eze&background=E2E8F0&color=333",
    method: "BANK TRANSFER",
    amount: "₦15,200",
    bank: "Zenith Bank",
    account: "208****412"
  },
  {
    id: "req3",
    name: "Umar Sani",
    img: "https://ui-avatars.com/api/?name=Umar+Sani&background=E2E8F0&color=333",
    method: "BANK TRANSFER",
    amount: "₦45,000",
    bank: "Kuda MFB",
    account: "309****112"
  }
];



export default function FinancialsPage() {
  const [requests, setRequests] = useState(pendingRequests);

  const handleAction = (id: string, action: string) => {
    setRequests(requests.filter(req => req.id !== id));
    toast.success(`Request ${action} successfully`);
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Four Cards Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Wallet className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 12.5%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Total Revenue</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦42.8M</h3>
          </div>
        </Card>

        {/* Pending Withdrawals */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <ClipboardList className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 4.2%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Pending Withdrawals</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦2.4M</h3>
          </div>
        </Card>

        {/* Total Deposits */}
        <Card className="p-3.5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <PiggyBank className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 18.5%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Total Deposits</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦85.1M</h3>
          </div>
        </Card>

        {/* Net Profit */}
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
            <p className="text-slate-500 text-[11px] font-bold mb-0.5">Net Profit</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">₦14.2M</h3>
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
            <div className="w-full h-[220px] relative">
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
                  {transactionHistory.map((txn, i) => (
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
                Showing <span className="font-bold text-slate-700">1</span> to <span className="font-bold text-slate-700">10</span> of 2,450 results
              </span>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-bold text-xs">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
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
                      onClick={() => handleAction(req.id, "approved")}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-9 text-xs rounded-lg shadow-sm"
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAction(req.id, "rejected")}
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
              <button className="text-[11px] font-extrabold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
                View All Pending Requests (14)
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
