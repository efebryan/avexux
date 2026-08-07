"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ChevronLeft,
  ChevronRight,
  Wallet,
  Search,
  CheckCircle2,
  XCircle,
  Building2,
  Hash,
  Copy
} from "lucide-react";
import { Input } from "@/components/ui/input";

import { adminProcessWithdrawalAction } from "../actions";

const PAGE_SIZE = 10;

export default function AdminWithdrawalsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithdrawals = async (pageNum: number) => {
    setIsLoading(true);
    const supabase = createClient();
    
    const from = (pageNum - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from("withdrawal_requests")
      .select(`
        id, amount, bank_name, account_number, account_name, created_at, status,
        profiles!withdrawal_requests_user_id_fkey(full_name, email)
      `, { count: "exact" })
      .eq("status", "Pending")
      .order("created_at", { ascending: true })
      .range(from, to);

    if (data) {
      setRequests(data.map((w: any) => {
        const profile = Array.isArray(w.profiles) ? w.profiles[0] : w.profiles;
        const fullName = profile?.full_name || "Unknown User";
        return {
          id: w.id,
          name: fullName,
          email: profile?.email || "",
          initials: fullName.substring(0,2).toUpperCase(),
          method: "BANK TRANSFER",
          amount: `₦${Number(w.amount).toLocaleString()}`,
          bank: w.bank_name,
          account: w.account_number,
          accountName: w.account_name,
          date: new Date(w.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }));
      if (count !== null) setTotal(count);
    } else {
      console.error("Withdrawals Fetch Error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWithdrawals(page);
  }, [page]);

  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    toast.loading(`Processing request...`, { id: "process_withdrawal" });
    const res = await adminProcessWithdrawalAction(id, action);
    
    if (res.success) {
      setRequests(requests.filter(req => req.id !== id));
      setTotal(prev => Math.max(0, prev - 1));
      toast.success(`Request ${action.toLowerCase()} successfully`, { id: "process_withdrawal" });
      
      // If we cleared the page, and there is a previous page, jump back
      if (requests.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchWithdrawals(page); // refetch current page to fill empty slot
      }
    } else {
      toast.error(res.error || "Failed to process request", { id: "process_withdrawal" });
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, { id: "copy", duration: 2000 });
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
    const startItem = (page - 1) * PAGE_SIZE + 1;
    const endItem = Math.min(page * PAGE_SIZE, total);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-700">{total > 0 ? startItem : 0}</span> to <span className="font-bold text-slate-700">{endItem}</span> of {total} pending requests
        </span>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {pages.map((p, idx) => (
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="text-slate-400 text-xs font-bold px-1">...</span>
              ) : (
                <button 
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold ${
                    p === page 
                      ? "bg-primary text-white" 
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              )
            ))}

            <button 
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-10 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Pending Withdrawals</h1>
        </div>
        <p className="text-sm text-slate-500">Review and process all pending withdrawal requests.</p>
      </div>

      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col min-h-[500px]">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-bold text-lg text-slate-900 tracking-tight">
            Requests Queue
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search by name or email..." className="pl-9 h-9 text-xs bg-slate-50 border-slate-200" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px] text-sm text-slate-500 font-medium">Loading requests...</div>
          ) : requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white hover:border-slate-300 transition-all flex flex-col h-full">
                  
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        {req.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{req.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{req.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end group/amount cursor-pointer" onClick={() => handleCopy(req.amount, "Amount")}>
                      <div className="flex items-center gap-1.5">
                        <Copy className="w-4 h-4 text-slate-300 opacity-0 group-hover/amount:opacity-100 transition-opacity hover:text-rose-500" />
                        <span className="font-black text-lg text-rose-600 block leading-tight">{req.amount}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{req.date}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3.5 mb-5 space-y-2 border border-slate-100 flex-1">
                    <div className="flex items-center gap-2 text-xs group/copy cursor-pointer" onClick={() => handleCopy(req.bank, "Bank Name")}>
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 w-16">Bank:</span>
                      <span className="font-bold text-slate-900 flex-1 truncate">{req.bank}</span>
                      <Copy className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/copy:opacity-100 transition-opacity hover:text-primary shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs group/copy cursor-pointer" onClick={() => handleCopy(req.account, "Account Number")}>
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 w-16">Account:</span>
                      <span className="font-bold text-slate-900 font-mono tracking-wider flex-1 truncate">{req.account}</span>
                      <Copy className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/copy:opacity-100 transition-opacity hover:text-primary shrink-0" />
                    </div>
                    {req.accountName && (
                      <div className="flex items-center gap-2 text-xs group/copy cursor-pointer" onClick={() => handleCopy(req.accountName, "Account Name")}>
                        <div className="w-3.5 h-3.5 text-slate-400 flex items-center justify-center font-bold text-[10px]">A</div>
                        <span className="text-slate-500 w-16">Name:</span>
                        <span className="font-bold text-slate-900 flex-1 truncate" title={req.accountName}>{req.accountName}</span>
                        <Copy className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/copy:opacity-100 transition-opacity hover:text-primary shrink-0" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Button 
                      onClick={() => handleAction(req.id, "Approved")}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-10 text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAction(req.id, "Rejected")}
                      className="w-full border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold h-10 text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="font-bold text-slate-900">All caught up!</h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm mt-1">There are no pending withdrawal requests in the queue right now.</p>
            </div>
          )}
        </div>

        {renderPagination()}
      </Card>
    </div>
  );
}
