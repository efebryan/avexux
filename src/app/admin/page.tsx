"use client";

import {
  Users,
  ClipboardList,
  Wallet,
  ArrowDownToLine,
  UsersRound,
  Activity,
  AlertCircle,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const stats = [
  {
    title: "TOTAL USERS",
    value: "1,245",
    subtext: "+24 this week",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    subtextColor: "text-green-600",
  },
  {
    title: "ACTIVE USERS",
    value: "890",
    subtext: "Logged in last 30 days",
    icon: Activity,
    color: "text-green-500",
    bg: "bg-green-50",
    subtextColor: "text-slate-400",
  },
  {
    title: "TOTAL TASKS",
    value: "45",
    subtext: "32 active · 13 paused",
    icon: ClipboardList,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    subtextColor: "text-green-600",
  },
  {
    title: "TOTAL REFERRALS",
    value: "3,402",
    subtext: "₦145,000 paid out",
    icon: UsersRound,
    color: "text-amber-500",
    bg: "bg-amber-50",
    subtextColor: "text-slate-900", // Will style specific parts manually in render
  },
  {
    title: "DEPOSITS RECEIVED",
    value: "₦2.4M",
    subtext: "+ ₦150k today",
    icon: ArrowDownToLine,
    color: "text-teal-500",
    bg: "bg-teal-50",
    subtextColor: "text-green-600",
  },
  {
    title: "WITHDRAWALS PAID",
    value: "₦1.8M",
    subtext: "42 pending requests",
    icon: Wallet,
    color: "text-rose-500",
    bg: "bg-rose-50",
    subtextColor: "text-amber-500",
  },
];

const recentRegistrations = [
  {
    username: "john_doe99",
    email: "john@example.com",
    joined: "2 hours ago",
    initials: "JO",
    color: "bg-blue-100 text-blue-700",
  },
  {
    username: "sarah_tasks",
    email: "sarah@example.com",
    joined: "4 hours ago",
    initials: "SA",
    color: "bg-green-100 text-green-700",
  },
  {
    username: "mike_hustle",
    email: "mike.h@example.com",
    joined: "5 hours ago",
    initials: "MI",
    color: "bg-purple-100 text-purple-700",
  },
  {
    username: "crypto_king",
    email: "crypto@example.com",
    joined: "1 day ago",
    initials: "CR",
    color: "bg-orange-100 text-orange-700",
    offline: true,
  },
];

const pendingWithdrawals = [
  {
    user: "Alex123",
    amount: "₦15,000",
    method: "Bank Transfer",
    date: "Oct 24, 2023",
  },
  {
    user: "DevNerd",
    amount: "₦5,000",
    method: "Bank Transfer",
    date: "Oct 24, 2023",
  },
  {
    user: "CryptoFan",
    amount: "₦25,000",
    method: "Bank Transfer",
    date: "Oct 23, 2023",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-slate-500 text-sm">
            Key metrics and real-time activity across Arvexus.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-xl px-4 hidden sm:flex">
            <Calendar className="w-4 h-4 mr-2 text-slate-500" />
            Last 30 Days
          </Button>
          <Button
            onClick={() => toast.info("Report generation is not yet connected to the backend.")}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-md rounded-xl px-5 w-full md:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="p-4 lg:p-5 border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-[11px] font-bold mb-2 tracking-wider uppercase">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Custom formatting for subtexts based on design */}
            <div className="mt-3 lg:mt-4">
              {i === 0 ? (
                <p className="text-sm text-green-600 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> {stat.subtext}
                </p>
              ) : i === 1 ? (
                <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> {stat.subtext}
                </p>
              ) : i === 2 ? (
                <p className="text-sm font-bold flex items-center gap-1.5">
                  <span className="text-green-600">32 active</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="text-slate-500">13 paused</span>
                </p>
              ) : i === 3 ? (
                <p className="text-sm font-bold text-slate-500">
                  <span className="text-slate-900">₦145,000</span> paid out
                </p>
              ) : i === 4 ? (
                <p className="text-sm text-green-600 font-bold flex items-center gap-1.5">
                  <span className="text-lg leading-none">+</span> {stat.subtext.replace('+ ', '')}
                </p>
              ) : (
                <p className="text-sm text-amber-500 font-bold flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {stat.subtext}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue/Activity Chart */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl bg-white p-6 min-h-[380px] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="font-bold text-lg text-slate-900">
                Weekly Revenue Activity
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Transaction volume over the last 7 days
              </p>
            </div>
            <div className="bg-green-50 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full">
              +18.5% Growth
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="mt-auto flex justify-between items-end h-48 border-b border-slate-100 pb-2 relative">
             <div className="w-full flex justify-between px-6 z-10 items-end h-full">
               {[40, 60, 45, 80, 55, 90, 75].map((val, idx) => (
                 <div key={idx} className="w-8 md:w-12 bg-slate-100 rounded-t-md relative hover:bg-slate-200 transition-colors" style={{ height: `${val}%` }}></div>
               ))}
             </div>
             {/* Chart labels */}
             <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-6 text-xs font-bold text-slate-400">
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
               <span>Sun</span>
             </div>
          </div>
        </Card>

        {/* Recent Signups */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col h-full min-h-[380px]">
          <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-50">
            <h2 className="font-bold text-lg text-slate-900">Recent Signups</h2>
            <Link
              href="/admin/users"
              className="text-green-600 text-sm font-bold hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {recentRegistrations.map((user, i) => (
              <div
                key={i}
                className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors rounded-xl mx-2 my-1"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.color}`}>
                    {user.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      {user.username}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{user.joined}</p>
                  <span className={`w-2 h-2 rounded-full ${user.offline ? 'bg-slate-200' : 'bg-green-500'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Urgent: Pending Withdrawals */}
      <Card className="border border-rose-100 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="p-6 border-b border-rose-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-rose-50/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
              <AlertCircle className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-rose-600">Urgent: Pending Withdrawals</h2>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                3 requests require immediate attention
              </p>
            </div>
          </div>
          <Link href="/admin/financials" className="w-full sm:w-auto">
             <Button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-6">
               Process Now
             </Button>
          </Link>
        </div>
        
        <div className="divide-y divide-slate-50">
          {pendingWithdrawals.map((req, i) => (
            <div
              key={i}
              className="p-5 px-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-0.5">{req.user}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {req.method} <span className="mx-1.5 text-slate-300">•</span> {req.date}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-slate-900">{req.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
