"use client";

import { Wallet, Zap, CheckCircle2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function DashboardStats() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: walletData } = await supabase
          .from("wallets")
          .select("balance, total_earned")
          .eq("user_id", user.id)
          .single();
        
        if (walletData) {
          setWalletBalance(walletData.balance);
          setTotalEarnings(walletData.total_earned || 0);
        }

        const { count } = await supabase
          .from("referrals")
          .select("*", { count: "exact", head: true })
          .eq("referrer_id", user.id)
          .eq("status", "Active");
        
        if (count !== null) {
          setActiveReferrals(count);
        }

        const { data: completedTasks } = await supabase
          .from("task_submissions")
          .select("created_at")
          .eq("user_id", user.id)
          .eq("status", "Approved");

        if (completedTasks) {
          setTotalCompleted(completedTasks.length);

          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const completedTodayCount = completedTasks.filter((t: any) => new Date(t.created_at) >= today).length;
          setTodayCompleted(completedTodayCount);
        }
      }
      setIsLoading(false);
    }
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[90px] bg-white rounded-lg border border-gray-100 shadow-sm animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
      {/* Wallet Balance */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Wallet className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Wallet Balance</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        </div>
      </Card>


      {/* Task Earnings */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Zap className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Total Earnings</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦{totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{totalCompleted} tasks completed</p>
        </div>
      </Card>

      {/* Total Completed */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Total Completed</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{totalCompleted}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Lifetime approved tasks</p>
        </div>
      </Card>

      {/* Active Referrals */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Active Referrals</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{activeReferrals}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{activeReferrals === 1 ? '1 active referral' : `${activeReferrals} active referrals`}</p>
        </div>
      </Card>

    </div>
  );
}
