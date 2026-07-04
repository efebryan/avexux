import { Wallet, ClipboardList, Zap, CheckCircle2, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-4">
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
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦2,450.80</h3>
        </div>
      </Card>

      {/* Pending Earnings */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
            <ClipboardList className="w-3.5 h-3.5" />
          </div>
          <span className="bg-gray-100 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            Steady
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Pending Earnings</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦124.50</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Expected payout in 3 days</p>
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
          <h3 className="text-lg font-bold text-gray-900 leading-tight">₦42.15</h3>
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
          <h3 className="text-lg font-bold text-gray-900 leading-tight">12</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Generates ₦8.50/week passively</p>
        </div>
      </Card>

      {/* Growth Points */}
      <Card className="p-2.5 border border-gray-100 shadow-sm rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1.5">
          <div className="w-7 h-7 rounded-md bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-[11px] font-medium mb-0">Growth Points</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">1,240</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Silver Tier • 260 pts to Gold</p>
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
