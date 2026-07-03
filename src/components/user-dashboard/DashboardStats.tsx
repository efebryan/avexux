import { Wallet, ClipboardList, Zap, CheckCircle2, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {/* Wallet Balance */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="bg-[#ade5bb]/40 text-[#0f8538] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <TrendingUpIcon />
            +12%
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Wallet Balance</p>
          <h3 className="text-2xl font-bold text-gray-900">₦2,450.80</h3>
        </div>
        <div className="mt-4 h-10 w-full opacity-60">
           {/* Mock Mini Chart */}
           <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none" preserveAspectRatio="none">
             <path d="M0,30 L0,20 C10,25 20,10 30,15 C40,20 50,5 60,10 C70,15 80,5 90,10 L100,5 L100,30 Z" fill="#ade5bb" />
           </svg>
        </div>
      </Card>

      {/* Pending Earnings */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            <ClipboardList className="w-5 h-5" />
          </div>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
            Steady
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Pending Earnings</p>
          <h3 className="text-2xl font-bold text-gray-900">₦124.50</h3>
          <p className="text-xs text-gray-400 mt-2">Expected payout in 3 days</p>
        </div>
      </Card>

      {/* Today's Earnings */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Zap className="w-5 h-5" />
          </div>
          <span className="bg-[#ade5bb]/40 text-[#0f8538] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <TrendingUpIcon />
            +45%
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Today's Earnings</p>
          <h3 className="text-2xl font-bold text-gray-900">₦42.15</h3>
          <p className="text-xs text-gray-400 mt-2">6 tasks successfully completed</p>
        </div>
      </Card>

      {/* Total Completed */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Completed</p>
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-xs text-gray-400 mt-2">Top 5% of earners this month</p>
        </div>
      </Card>

      {/* Active Referrals */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Active Referrals</p>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-xs text-gray-400 mt-2">Generates ₦8.50/week passively</p>
        </div>
      </Card>

      {/* Growth Points */}
      <Card className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#ade5bb]/40 flex items-center justify-center text-[#0f8538]">
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Growth Points</p>
          <h3 className="text-2xl font-bold text-gray-900">1,240</h3>
          <p className="text-xs text-gray-400 mt-2">Silver Tier • 260 pts to Gold</p>
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
