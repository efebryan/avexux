"use client";

import { Wallet, ClipboardList, Zap, CheckCircle2, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function DashboardStats() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: walletData } = await supabase
          .from("wallets")
          .select("balance, today_earnings")
          .eq("user_id", user.id)
          .single();
        
        if (walletData) {
          setWalletBalance(walletData.balance);
          setTodayEarnings(walletData.today_earnings);
        }

        const { count } = await supabase
          .from("referrals")
          .select("*", { count: "exact", head: true })
          .eq("referrer_id", user.id);
        
        if (count !== null) {
          setActiveReferrals(count);
        }
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
      {/* Wallet Balance */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <span className="bg-[#ade5bb]/40 text-[#0f8538] text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUpIcon />
            +12%
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Wallet Balance</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        </div>
      </Card>


      {/* Today's Earnings */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="bg-[#ade5bb]/40 text-[#0f8538] text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUpIcon />
            +45%
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Today's Earnings</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦{todayEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">6 tasks completed</p>
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
          <h3 className="text-lg font-bold text-gray-900 leading-tight">156</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Top 5% of earners this month</p>
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
          <p className="text-[10px] text-gray-400 mt-0.5">Generates ₦8.50/week passively</p>
        </div>
      </Card>

    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
