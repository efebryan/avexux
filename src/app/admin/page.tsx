"use client";

import { Users, ClipboardList, Wallet, ArrowDownToLine, UsersRound, Activity, AlertCircle, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const stats = [
  { title: "Total Users", value: "1,245", subtext: "+24 this week", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { title: "Active Users", value: "890", subtext: "Logged in last 30 days", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { title: "Total Tasks", value: "45", subtext: "32 active, 13 paused", icon: ClipboardList, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { title: "Total Referrals", value: "3,402", subtext: "₦145,000 paid out", icon: UsersRound, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { title: "Deposits Received", value: "₦2.4M", subtext: "+₦150k today", icon: ArrowDownToLine, color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { title: "Withdrawals Paid", value: "₦1.8M", subtext: "42 pending requests", icon: Wallet, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
];

const recentRegistrations = [
  { username: "john_doe99", email: "john@example.com", joined: "2 hours ago", status: "Active" },
  { username: "sarah_tasks", email: "sarah@example.com", joined: "4 hours ago", status: "Active" },
  { username: "mike_hustle", email: "mike.h@example.com", joined: "5 hours ago", status: "Active" },
  { username: "crypto_king", email: "crypto@example.com", joined: "1 day ago", status: "Active" },
];

const pendingWithdrawals = [
  { user: "Alex123", amount: "₦15,000", method: "Bank Transfer", date: "Oct 24, 2023" },
  { user: "DevNerd", amount: "₦5,000", method: "Bank Transfer", date: "Oct 24, 2023" },
  { user: "CryptoFan", amount: "₦25,000", method: "Bank Transfer", date: "Oct 23, 2023" },
];

// Simple mock data for chart
const chartData = [40, 60, 45, 80, 55, 90, 75];
const maxChartValue = Math.max(...chartData);

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Platform Overview</h1>
          <p className="text-gray-500 text-sm">Key metrics and real-time activity across Arvexus.</p>
        </div>
        <div className="flex gap-2 hidden md:flex">
           <Button
             onClick={() => toast.info("Report generation is not yet connected to the backend.")}
             className="bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all hover:-translate-y-0.5 rounded-xl px-6"
           >
             Generate Report
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 border border-gray-100 shadow-sm hover:shadow-md rounded-2xl flex items-start justify-between bg-white transition-all duration-300 hover:-translate-y-1 group">
            <div>
              <p className="text-gray-500 text-xs font-semibold mb-2 tracking-wide uppercase">{stat.title}</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" /> {stat.subtext}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} border ${stat.border} transition-transform duration-300 group-hover:scale-110`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue/Activity Chart (Custom CSS) */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white p-6">
          <div className="flex justify-between items-center mb-8">
             <div>
               <h2 className="font-bold text-lg text-gray-900">Weekly Revenue Activity</h2>
               <p className="text-xs text-gray-500">Transaction volume over the last 7 days</p>
             </div>
             <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
               +18.5% Growth
             </span>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 md:gap-6 mt-4">
            {chartData.map((val, idx) => (
              <div key={idx} className="w-full flex flex-col items-center gap-3 group relative">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative"
                  style={{ height: `${(val / maxChartValue) * 100}%` }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    ₦{(val * 1200).toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Registrations */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
             <h2 className="font-bold text-gray-900">Recent Signups</h2>
             <Link href="/admin/users" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
               View All
             </Link>
          </div>
          <div className="divide-y divide-gray-50 flex-1 overflow-y-auto">
            {recentRegistrations.map((user, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs uppercase shadow-inner">
                    {user.username.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="w-2 h-2 rounded-full bg-green-500 mb-1"></span>
                  <p className="text-[10px] text-gray-400">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Needed (Pending Withdrawals) */}
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden relative bg-gradient-to-br from-rose-500 to-red-600 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
               <AlertCircle className="w-5 h-5 text-white" />
             </div>
             <div>
               <h2 className="font-bold text-lg">Urgent: Pending Withdrawals</h2>
               <p className="text-sm text-red-100 font-medium">3 requests require immediate attention</p>
             </div>
           </div>
           <Link href="/admin/financials" className="bg-white text-red-600 text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-red-50 transition-colors flex items-center gap-1">
             Process Now <ArrowUpRight className="w-4 h-4" />
           </Link>
        </div>
        <div className="divide-y divide-white/10 relative z-10">
          {pendingWithdrawals.map((req, i) => (
            <div key={i} className="p-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors">
              <div>
                <p className="text-sm font-bold mb-1">{req.user}</p>
                <div className="flex items-center gap-2 text-xs text-red-200">
                  <span>{req.method}</span>
                  <span className="opacity-50">•</span>
                  <span>{req.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-extrabold">{req.amount}</span>
                <Link href="/admin/financials">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white font-medium h-8 text-xs border-0 rounded-lg backdrop-blur-sm">
                    Review Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
