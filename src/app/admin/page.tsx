"use client";

import { Users, ClipboardList, Wallet, ArrowDownToLine, UsersRound, Trophy, Activity, AlertCircle, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { title: "Total Users", value: "1,245", subtext: "+24 this week", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Active Users", value: "890", subtext: "Logged in last 30 days", icon: Activity, color: "text-green-600", bg: "bg-green-100" },
  { title: "Total Tasks", value: "45", subtext: "32 active, 13 paused", icon: ClipboardList, color: "text-purple-600", bg: "bg-purple-100" },
  { title: "Total Referrals", value: "3,402", subtext: "₦145,000 paid out", icon: UsersRound, color: "text-orange-600", bg: "bg-orange-100" },
  { title: "Deposits Received", value: "₦2.4M", subtext: "+₦150k today", icon: ArrowDownToLine, color: "text-emerald-600", bg: "bg-emerald-100" },
  { title: "Withdrawals Paid", value: "₦1.8M", subtext: "42 pending requests", icon: Wallet, color: "text-rose-600", bg: "bg-rose-100" },
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

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Platform Overview</h1>
          <p className="text-gray-500 text-sm">Key metrics and recent activity across Arvexus.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
             Generate Report
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 border border-gray-100 shadow-sm rounded-xl flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-[11px] text-gray-400 font-medium">{stat.subtext}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Recent Registrations */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
             <h2 className="font-bold text-gray-900">Recent Registrations</h2>
             <Link href="/admin/users" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
               View All <ArrowUpRight className="w-3 h-3" />
             </Link>
          </div>
          <div className="divide-y divide-gray-50 bg-white">
            {recentRegistrations.map((user, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs uppercase">
                    {user.username.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold mb-1">
                    {user.status}
                  </span>
                  <p className="text-[11px] text-gray-400">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Needed (Pending Withdrawals) */}
        <Card className="border border-red-100 shadow-sm rounded-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white pl-5">
             <div className="flex items-center gap-2">
               <AlertCircle className="w-4 h-4 text-red-500" />
               <h2 className="font-bold text-gray-900">Pending Withdrawals</h2>
             </div>
             <Link href="/admin/financials" className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
               Review All <ArrowUpRight className="w-3 h-3" />
             </Link>
          </div>
          <div className="divide-y divide-gray-50 bg-white pl-1">
            {pendingWithdrawals.map((req, i) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{req.user}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{req.method}</span>
                    <span>•</span>
                    <span>{req.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">{req.amount}</span>
                  <Button size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 font-medium h-7 text-xs shadow-none border border-red-100">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
