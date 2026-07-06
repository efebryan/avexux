"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowDownToLine, ArrowUpToLine, Download, Activity, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

// Mock Data
const mockDeposits = [
  { 
    id: "d1", 
    user: "john_doe99", 
    email: "john@example.com",
    amount: 15000, 
    method: "Bank Transfer", 
    ref: "TRX-998822", 
    date: "Oct 24, 2023, 10:30 AM", 
    status: "Pending",
    img: "https://ui-avatars.com/api/?name=John+Doe&background=E2E8F0&color=333" 
  },
  { 
    id: "d2", 
    user: "sarah_tasks", 
    email: "sarah@tasks.org",
    amount: 5000, 
    method: "Bank Transfer", 
    ref: "TRX-445511", 
    date: "Oct 23, 2023, 2:15 PM", 
    status: "Confirmed",
    img: "https://ui-avatars.com/api/?name=Sarah+Tasks&background=E2E8F0&color=333"
  },
  { 
    id: "d3", 
    user: "new_guy12", 
    email: "newguy@mail.com",
    amount: 1000, 
    method: "Bank Transfer", 
    ref: "TRX-112233", 
    date: "Oct 23, 2023, 9:00 AM", 
    status: "Rejected",
    img: "https://ui-avatars.com/api/?name=New+Guy&background=E2E8F0&color=333"
  },
];

const mockWithdrawals = [
  { 
    id: "w1", 
    user: "mike_hustle", 
    email: "mike@hustle.com",
    amount: 8000, 
    account: "Access Bank",
    accountNumber: "0123456789", 
    date: "Oct 24, 2023, 11:45 AM", 
    status: "Pending",
    img: "https://ui-avatars.com/api/?name=Mike+Hustle&background=E2E8F0&color=333"
  },
  { 
    id: "w2", 
    user: "crypto_king", 
    email: "crypto@king.net",
    amount: 25000, 
    account: "GTBank",
    accountNumber: "0987654321", 
    date: "Oct 22, 2023, 4:20 PM", 
    status: "Processed",
    img: "https://ui-avatars.com/api/?name=Crypto+King&background=E2E8F0&color=333"
  },
  { 
    id: "w3", 
    user: "john_doe99", 
    email: "john@example.com",
    amount: 5000, 
    account: "Zenith Bank",
    accountNumber: "1122334455", 
    date: "Oct 20, 2023, 1:10 PM", 
    status: "Failed",
    img: "https://ui-avatars.com/api/?name=John+Doe&background=E2E8F0&color=333"
  },
];

export default function AdminFinancialsPage() {
  const [activeTab, setActiveTab] = useState<"deposits" | "withdrawals">("deposits");
  const [deposits, setDeposits] = useState(mockDeposits);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);

  const handleDepositAction = (id: string, action: "Confirmed" | "Rejected") => {
    setDeposits(deposits.map(d => {
      if (d.id === id) {
        toast.success(`Deposit ${action.toLowerCase()}`);
        return { ...d, status: action };
      }
      return d;
    }));
  };

  const handleWithdrawalAction = (id: string, action: "Processed" | "Failed") => {
    setWithdrawals(withdrawals.map(w => {
      if (w.id === id) {
        toast.success(`Withdrawal marked as ${action.toLowerCase()}`);
        return { ...w, status: action };
      }
      return w;
    }));
  };

  // Calculate summaries
  const totalProcessedDeposits = deposits.filter(d => d.status === "Confirmed").reduce((acc, curr) => acc + curr.amount, 0);
  const totalProcessedWithdrawals = withdrawals.filter(w => w.status === "Processed").reduce((acc, curr) => acc + curr.amount, 0);
  const totalProcessed = totalProcessedDeposits + totalProcessedWithdrawals;
  
  const pendingDeposits = deposits.filter(d => d.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingWithdrawals = withdrawals.filter(w => w.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingDepositsCount = deposits.filter(d => d.status === "Pending").length;
  const pendingWithdrawalsCount = withdrawals.filter(w => w.status === "Pending").length;

  return (
    <div className="space-y-6 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Management</h1>
          <p className="text-slate-500 text-sm mt-1">Verify deposits and process user withdrawals seamlessly.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 flex shadow-sm">
            <FileText className="w-4 h-4 mr-2 text-slate-500" />
            Generate Report
          </Button>
          <Button className="bg-primary hover:bg-primary/95 text-white font-semibold shadow-sm rounded-lg px-5 w-full md:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-2">
        
        {/* Total Processed */}
        <Card className="p-6 border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Processed Vol.</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ₦{totalProcessed.toLocaleString()}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 relative z-10">
            <Activity className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </Card>
        
        {/* Pending Deposits */}
        <Card className="p-6 border border-emerald-100 shadow-sm rounded-2xl flex items-center justify-between bg-emerald-50/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Pending Deposits</p>
              {pendingDepositsCount > 0 && (
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {pendingDepositsCount} new
                </span>
              )}
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-600 tracking-tight">
              ₦{pendingDeposits.toLocaleString()}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100/50 border border-emerald-100 flex items-center justify-center text-emerald-600 relative z-10 transition-transform group-hover:-translate-y-1">
            <ArrowDownToLine className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </Card>
        
        {/* Pending Withdrawals */}
        <Card className="p-6 border border-rose-100 shadow-sm rounded-2xl flex items-center justify-between bg-rose-50/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-rose-700 text-xs font-bold uppercase tracking-wider">Pending Withdrawals</p>
              {pendingWithdrawalsCount > 0 && (
                <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {pendingWithdrawalsCount} req
                </span>
              )}
            </div>
            <h3 className="text-3xl font-extrabold text-rose-600 tracking-tight">
              ₦{pendingWithdrawals.toLocaleString()}
            </h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-100/50 border border-rose-100 flex items-center justify-center text-rose-600 relative z-10 transition-transform group-hover:-translate-y-1">
            <ArrowUpToLine className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </Card>
      </div>

      {/* Modern Segmented Tabs */}
      <div className="bg-slate-100 p-1 rounded-xl inline-flex mb-2 border border-slate-200 shadow-inner">
        <button 
          onClick={() => setActiveTab("deposits")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "deposits" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          User Deposits
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeTab === "deposits" ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"
          }`}>
            {deposits.length}
          </span>
        </button>
        <button 
          onClick={() => setActiveTab("withdrawals")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "withdrawals" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Withdrawal Requests
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeTab === "withdrawals" ? "bg-rose-100 text-rose-600" : "bg-slate-200 text-slate-500"
          }`}>
            {withdrawals.length}
          </span>
        </button>
      </div>

      {/* Content based on Tab */}
      {activeTab === "deposits" ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">USER</th>
                  <th className="px-6 py-4">TRANSACTION</th>
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deposits.map((dep) => (
                  <tr key={dep.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
                          <img src={dep.img} alt={dep.user} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{dep.user}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{dep.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-[15px]">₦{dep.amount.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 mt-0.5 font-medium">{dep.method} <span className="text-slate-300 mx-1">•</span> <span className="font-mono text-[11px] text-slate-400">{dep.ref}</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{dep.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        dep.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                        dep.status === "Confirmed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          dep.status === "Pending" ? "bg-amber-500 animate-pulse" :
                          dep.status === "Confirmed" ? "bg-emerald-500" : "bg-red-500"
                        }`}></span>
                        {dep.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {dep.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDepositAction(dep.id, "Rejected")}
                            className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-lg shadow-sm bg-white"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" strokeWidth={2.5} />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleDepositAction(dep.id, "Confirmed")}
                            className="h-8 px-3 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm border border-primary"
                          >
                            <Check className="w-4 h-4 mr-1.5" strokeWidth={3} /> Confirm
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block">Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">USER</th>
                  <th className="px-6 py-4">PAYOUT DETAILS</th>
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {withdrawals.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
                          <img src={req.img} alt={req.user} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{req.user}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{req.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-[15px]">₦{req.amount.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 mt-0.5 font-medium">{req.account} <span className="text-slate-300 mx-1">•</span> <span className="font-mono text-[11px] text-slate-400">{req.accountNumber}</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{req.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        req.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                        req.status === "Processed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          req.status === "Pending" ? "bg-amber-500 animate-pulse" :
                          req.status === "Processed" ? "bg-emerald-500" : "bg-red-500"
                        }`}></span>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleWithdrawalAction(req.id, "Failed")}
                            className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-lg shadow-sm bg-white"
                            title="Fail"
                          >
                            <XCircle className="w-4 h-4" strokeWidth={2.5} />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleWithdrawalAction(req.id, "Processed")}
                            className="h-8 px-3 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm border border-primary"
                          >
                            <Check className="w-4 h-4 mr-1.5" strokeWidth={3} /> Mark Paid
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
