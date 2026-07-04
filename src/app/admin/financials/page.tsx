"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowDownToLine, ArrowUpToLine, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

// Mock Data
const mockDeposits = [
  { id: "d1", user: "john_doe99", amount: 15000, method: "Bank Transfer", ref: "TRX-998822", date: "Oct 24, 2023, 10:30 AM", status: "Pending" },
  { id: "d2", user: "sarah_tasks", amount: 5000, method: "Bank Transfer", ref: "TRX-445511", date: "Oct 23, 2023, 2:15 PM", status: "Confirmed" },
  { id: "d3", user: "new_guy12", amount: 1000, method: "Bank Transfer", ref: "TRX-112233", date: "Oct 23, 2023, 9:00 AM", status: "Rejected" },
];

const mockWithdrawals = [
  { id: "w1", user: "mike_hustle", amount: 8000, account: "Access Bank - 0123456789", date: "Oct 24, 2023, 11:45 AM", status: "Pending" },
  { id: "w2", user: "crypto_king", amount: 25000, account: "GTBank - 0987654321", date: "Oct 22, 2023, 4:20 PM", status: "Processed" },
  { id: "w3", user: "john_doe99", amount: 5000, account: "Zenith Bank - 1122334455", date: "Oct 20, 2023, 1:10 PM", status: "Failed" },
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Financial Management</h1>
          <p className="text-gray-500 text-sm">Verify deposits and process user withdrawals.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card className="p-4 border border-emerald-100 shadow-sm rounded-xl flex items-center justify-between bg-white">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1">Pending Deposits</p>
            <h3 className="text-2xl font-bold text-emerald-600">
              ₦{deposits.filter(d => d.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ArrowDownToLine className="w-6 h-6" />
          </div>
        </Card>
        
        <Card className="p-4 border border-rose-100 shadow-sm rounded-xl flex items-center justify-between bg-white">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1">Pending Withdrawals</p>
            <h3 className="text-2xl font-bold text-rose-600">
              ₦{withdrawals.filter(w => w.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
            <ArrowUpToLine className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab("deposits")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "deposits" ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          User Deposits
          <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full">
            {deposits.filter(d => d.status === "Pending").length} Pending
          </span>
        </button>
        <button 
          onClick={() => setActiveTab("withdrawals")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "withdrawals" ? "border-rose-600 text-rose-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Withdrawal Requests
          <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full">
            {withdrawals.filter(w => w.status === "Pending").length} Pending
          </span>
        </button>
      </div>

      {/* Content based on Tab */}
      {activeTab === "deposits" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Amount & Ref</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {deposits.map((dep) => (
                  <tr key={dep.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{dep.user}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-emerald-600">₦{dep.amount.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{dep.method} • {dep.ref}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{dep.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                        dep.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        dep.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {dep.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {dep.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleDepositAction(dep.id, "Confirmed")}
                            className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDepositAction(dep.id, "Rejected")}
                            className="h-8 text-xs font-bold text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Amount & Account</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {withdrawals.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{req.user}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-rose-600">₦{req.amount.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{req.account}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{req.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                        req.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        req.status === "Processed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleWithdrawalAction(req.id, "Processed")}
                            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Paid
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleWithdrawalAction(req.id, "Failed")}
                            className="h-8 text-xs font-bold text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Fail
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Completed</span>
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
