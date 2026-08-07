"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { 
  ClipboardList, 
  Gift, 
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 10;

export default function AdminHistoryPage() {
  const [activeTab, setActiveTab] = useState<"tasks" | "spins">("tasks");
  
  const [taskHistory, setTaskHistory] = useState<any[]>([]);
  const [taskPage, setTaskPage] = useState(1);
  const [taskTotal, setTaskTotal] = useState(0);
  const [isTaskLoading, setIsTaskLoading] = useState(true);

  const [spinHistory, setSpinHistory] = useState<any[]>([]);
  const [spinPage, setSpinPage] = useState(1);
  const [spinTotal, setSpinTotal] = useState(0);
  const [isSpinLoading, setIsSpinLoading] = useState(true);

  const fetchTasks = async (page: number) => {
    setIsTaskLoading(true);
    const supabase = createClient();
    
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from("task_submissions")
      .select(`
        id,
        status,
        created_at,
        rating,
        tasks!inner(title, reward_amount),
        profiles!task_submissions_user_id_fkey(full_name, email)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (data) {
      setTaskHistory(data.map((t: any) => {
        const profile = Array.isArray(t.profiles) ? t.profiles[0] : t.profiles;
        const task = Array.isArray(t.tasks) ? t.tasks[0] : t.tasks;
        const fullName = profile?.full_name || "Unknown User";
        const initials = fullName.substring(0,2).toUpperCase();
        
        let statusColor = "bg-slate-50 text-slate-700";
        let dotColor = "bg-slate-500";
        if (t.status === "Approved") {
          statusColor = "bg-green-50 text-green-700"; dotColor = "bg-green-500";
        } else if (t.status === "Pending Review") {
          statusColor = "bg-amber-50 text-amber-700"; dotColor = "bg-amber-500";
        } else if (t.status === "Rejected") {
          statusColor = "bg-red-50 text-red-700"; dotColor = "bg-red-500";
        } else if (t.status === "In Progress") {
          statusColor = "bg-blue-50 text-blue-700"; dotColor = "bg-blue-500";
        }

        return {
          id: t.id,
          user: fullName,
          initials,
          taskTitle: task?.title || "Unknown Task",
          reward: `₦${Number(task?.reward_amount || 0).toLocaleString()}`,
          status: t.status,
          statusColor,
          dotColor,
          date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }));
      if (count !== null) setTaskTotal(count);
    } else {
      console.error("Task History Error:", error);
    }
    setIsTaskLoading(false);
  };

  const fetchSpins = async (page: number) => {
    setIsSpinLoading(true);
    const supabase = createClient();
    
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from("transactions")
      .select(`
        id, reference_id, type, amount, status, created_at,
        profiles!inner(full_name, email)
      `, { count: "exact" })
      .in("type", ["SPIN_REWARD", "SPIN_COST"])
      .order("created_at", { ascending: false })
      .range(from, to);

    if (data) {
      setSpinHistory(data.map((tx: any) => {
        const profile = Array.isArray(tx.profiles) ? tx.profiles[0] : tx.profiles;
        const fullName = profile?.full_name || "Unknown";
        const initials = fullName.substring(0,2).toUpperCase();
        const isReward = tx.type === "SPIN_REWARD";
        
        return {
          id: tx.reference_id || tx.id,
          user: fullName,
          initials,
          type: isReward ? "Reward" : "Cost",
          typeColor: isReward ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
          amount: `₦${Number(tx.amount).toLocaleString()}`,
          amountColor: isReward ? "text-emerald-600" : "text-rose-600",
          status: tx.status,
          date: new Date(tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }));
      if (count !== null) setSpinTotal(count);
    } else {
      console.error("Spin History Error:", error);
    }
    setIsSpinLoading(false);
  };

  useEffect(() => {
    fetchTasks(taskPage);
  }, [taskPage]);

  useEffect(() => {
    fetchSpins(spinPage);
  }, [spinPage]);

  const renderPagination = (page: number, total: number, setPage: (p: number) => void) => {
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
          Showing <span className="font-bold text-slate-700">{total > 0 ? startItem : 0}</span> to <span className="font-bold text-slate-700">{endItem}</span> of {total} results
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
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">System History</h1>
        <p className="text-sm text-slate-500">Track task submissions and reward spins across the platform.</p>
      </div>

      <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab("tasks")}
          className={`pb-4 text-sm font-bold border-b-[3px] transition-colors flex items-center gap-2 ${
            activeTab === "tasks" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Task History
        </button>
        <button 
          onClick={() => setActiveTab("spins")}
          className={`pb-4 text-sm font-bold border-b-[3px] transition-colors flex items-center gap-2 ${
            activeTab === "spins" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Gift className="w-4 h-4" />
          Spin History
        </button>
      </div>

      <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-bold text-lg text-slate-900 tracking-tight">
            {activeTab === "tasks" ? "Recent Task Submissions" : "Recent Spin Transactions"}
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search user or ID..." className="pl-9 h-9 text-xs bg-slate-50 border-slate-200" />
            </div>
            <Button variant="outline" size="sm" className="h-9 text-xs font-semibold bg-slate-50 border-slate-200 text-slate-600 rounded-lg px-3 flex items-center gap-1.5 hover:bg-slate-100 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {(activeTab === "tasks" ? isTaskLoading : isSpinLoading) ? (
            <div className="flex items-center justify-center h-[300px] text-sm text-slate-500 font-medium">Loading history...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/50 font-bold tracking-wider">
                {activeTab === "tasks" ? (
                  <tr>
                    <th className="px-6 py-4 font-bold">USER</th>
                    <th className="px-6 py-4 font-bold">TASK TITLE</th>
                    <th className="px-6 py-4 font-bold">REWARD</th>
                    <th className="px-6 py-4 font-bold">DATE</th>
                    <th className="px-6 py-4 font-bold">STATUS</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-6 py-4 font-bold">TRANSACTION ID</th>
                    <th className="px-6 py-4 font-bold">USER</th>
                    <th className="px-6 py-4 font-bold">TYPE</th>
                    <th className="px-6 py-4 font-bold">AMOUNT</th>
                    <th className="px-6 py-4 font-bold">DATE</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {activeTab === "tasks" ? (
                  taskHistory.length > 0 ? (
                    taskHistory.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-indigo-100 text-indigo-700">
                              {item.initials}
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{item.user}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-600 font-medium text-sm line-clamp-1 max-w-[250px]">{item.taskTitle}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-sm text-slate-700">{item.reward}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-500 font-medium text-[13px]">{item.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${item.statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.dotColor}`}></span>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500 font-medium">No task history found.</td>
                    </tr>
                  )
                ) : (
                  spinHistory.length > 0 ? (
                    spinHistory.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-slate-500 font-medium text-[13px] font-mono">{item.id.substring(0,8)}...</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-100 text-emerald-700">
                              {item.initials}
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{item.user}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${item.typeColor}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold text-sm ${item.amountColor}`}>
                            {item.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-500 font-medium text-[13px]">{item.date}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500 font-medium">No spin history found.</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {activeTab === "tasks" 
          ? renderPagination(taskPage, taskTotal, setTaskPage)
          : renderPagination(spinPage, spinTotal, setSpinPage)
        }
      </Card>
    </div>
  );
}
