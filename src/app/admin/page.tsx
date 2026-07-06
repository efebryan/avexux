"use client";

import { useState } from "react";

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

function ChartComponent() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const data = [
    { label: "Mon", x: 30, y: 87, w: 36, h: 58, amt: "₦240k", type: "growth" },
    { label: "Tue", x: 95, y: 58, w: 36, h: 87, amt: "₦360k", type: "growth" },
    { label: "Wed", x: 160, y: 80, w: 36, h: 65, amt: "₦270k", type: "decline" },
    { label: "Thu", x: 225, y: 29, w: 36, h: 116, amt: "₦480k", type: "growth" },
    { label: "Fri", x: 290, y: 65, w: 36, h: 80, amt: "₦330k", type: "decline" },
    { label: "Sat", x: 355, y: 15, w: 36, h: 130, amt: "₦540k", type: "growth" },
    { label: "Sun", x: 420, y: 36, w: 36, h: 109, amt: "₦450k", type: "decline" },
  ];

  return (
    <div className="relative flex-1 flex flex-col justify-between mt-4 h-full min-h-0">
      {/* Tooltip Overlay */}
      {hoveredIdx !== null && (
        <div 
          className="absolute bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md z-20 pointer-events-none transition-all duration-150"
          style={{ 
            left: `${((data[hoveredIdx].x + data[hoveredIdx].w / 2) / 500) * 100}%`,
            top: `${(data[hoveredIdx].y / 180) * 100 - 12}%`,
            transform: "translate(-50%, -100%)"
          }}
        >
          {data[hoveredIdx].amt}
        </div>
      )}

      {/* SVG Container */}
      <div className="w-full flex-1 min-h-0 relative">
        <svg viewBox="0 0 500 180" width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible">
          <defs>
            {/* Growth Gradient (Theme Matching Green) */}
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#006e0d" />
              <stop offset="100%" stopColor="#2faf2f" stopOpacity="0.85" />
            </linearGradient>
            {/* Decline Gradient (Red/Rose) */}
            <linearGradient id="declineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Dotted horizontal background grid lines */}
          <line x1="30" y1="20" x2="456" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="30" y1="60" x2="456" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="30" y1="100" x2="456" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="30" y1="145" x2="456" y2="145" stroke="#e2e8f0" strokeWidth="1" />

          {/* Bars */}
          {data.map((item, idx) => (
            <g 
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Bar Rect */}
              <rect
                x={item.x}
                y={item.y}
                width={item.w}
                height={item.h}
                rx="6"
                ry="6"
                fill={item.type === "growth" ? "url(#growthGrad)" : "url(#declineGrad)"}
                className="transition-all duration-300 hover:brightness-95"
                opacity={hoveredIdx === null || hoveredIdx === idx ? 1 : 0.4}
              />
              {/* Glossy overlay sheen on hover */}
              {hoveredIdx === idx && (
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.w}
                  height={item.h}
                  rx="6"
                  ry="6"
                  fill="white"
                  opacity="0.12"
                  className="pointer-events-none"
                />
              )}
              {/* Pixel-Perfect X-axis Label inside SVG */}
              <text
                x={item.x + item.w / 2}
                y="165"
                textAnchor="middle"
                className={`text-[10px] font-bold transition-all duration-150 ${
                  hoveredIdx === idx ? 'fill-slate-900 font-extrabold' : 'fill-slate-400'
                }`}
              >
                {item.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header section */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Realtime Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="p-3.5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between min-h-[110px]"
          >
            {/* Top row: Title and Icon */}
            <div className="flex justify-between items-center gap-2">
              <span className="text-slate-400 text-[9px] font-extrabold tracking-wider uppercase truncate">
                {stat.title}
              </span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
            </div>

            {/* Middle row: Large Value */}
            <div className="my-1.5">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">
                {stat.value}
              </h3>
            </div>
            
            {/* Bottom row: Subtext */}
            <div className="mt-auto pt-1 border-t border-slate-50">
              {i === 0 ? (
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 shrink-0" /> <span className="truncate">{stat.subtext}</span>
                </p>
              ) : i === 1 ? (
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3 shrink-0" /> <span className="truncate">{stat.subtext}</span>
                </p>
              ) : i === 2 ? (
                <p className="text-[10px] font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="text-green-600">32 active</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">13 paused</span>
                </p>
              ) : i === 3 ? (
                <p className="text-[10px] font-bold text-slate-500 truncate">
                  <span className="text-slate-900">₦145k</span> paid out
                </p>
              ) : i === 4 ? (
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 truncate">
                  <span className="text-sm leading-none">+</span> {stat.subtext.replace('+ ', '')}
                </p>
              ) : (
                <p className="text-[10px] text-amber-500 font-bold flex items-center gap-1 truncate">
                  <Calendar className="w-3 h-3 shrink-0" /> {stat.subtext}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue/Activity Chart */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl bg-white p-6 min-h-[310px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg text-slate-900 tracking-tight">
                  Weekly Revenue Activity
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transaction volume over the last 7 days
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                +18.5% Growth
              </div>
            </div>
          </div>

          {/* Senior UI SVG Chart Visualization */}
          <ChartComponent />
        </Card>

        {/* Recent Signups */}
        <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white flex flex-col h-full min-h-[310px]">
          <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-100">
            <h2 className="font-bold text-lg text-slate-900 tracking-tight">Recent Signups</h2>
            <Link
              href="/admin/users"
              className="text-primary text-xs font-extrabold hover:text-primary/80 transition-colors flex items-center gap-0.5 group"
            >
              View All 
              <span className="transform translate-x-0 group-hover:translate-x-0.5 transition-transform font-sans">&rarr;</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {recentRegistrations.map((user, i) => (
              <div
                key={i}
                className="p-3 flex justify-between items-center hover:bg-slate-50/70 transition-colors rounded-xl mx-2 my-0.5 group"
              >
                <div className="flex items-center gap-3">
                  {/* Stylish Gradient Avatar */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm bg-gradient-to-br text-slate-700 ${
                    user.color.includes('blue') ? 'from-blue-50 to-blue-100 text-blue-700' :
                    user.color.includes('green') ? 'from-green-50 to-green-100 text-green-700' :
                    user.color.includes('purple') ? 'from-purple-50 to-purple-100 text-purple-700' :
                    'from-amber-50 to-amber-100 text-amber-700'
                  }`}>
                    {user.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                      {user.username}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{user.email}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{user.joined}</p>
                  
                  {/* Pulsing Active Indicator */}
                  {user.offline ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                  ) : (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Urgent: Pending Withdrawals */}
      <Card className="border border-rose-100 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="p-5 border-b border-rose-100/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-rose-50/50 via-rose-50/20 to-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-200/50 flex items-center justify-center text-rose-600 flex-shrink-0">
              <AlertCircle className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-rose-700 tracking-tight">Urgent: Pending Withdrawals</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                3 requests require immediate verification & settlement
              </p>
            </div>
          </div>
          <Link href="/admin/financials" className="w-full sm:w-auto">
             <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs px-5 py-2 shadow-sm transition-all duration-200 hover:shadow-rose-100 hover:shadow-md">
               Process All Requests
             </Button>
          </Link>
        </div>
        
        <div className="divide-y divide-slate-100/70">
          {pendingWithdrawals.map((req, i) => {
            const initials = req.user.substring(0, 2).toUpperCase();
            return (
              <div
                key={i}
                className="p-4 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-slate-50/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar fallback with cool gradient */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200/30 flex items-center justify-center font-bold text-xs text-rose-700 shadow-sm shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-rose-600 transition-colors cursor-pointer">{req.user}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide flex items-center gap-1.5">
                      <span>{req.method}</span>
                      <span className="text-slate-200 font-normal">|</span>
                      <span>{req.date}</span>
                    </p>
                  </div>
                </div>
                
                {/* Actions & Amount */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                  {/* Subtle Pending Badge */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-100">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mr-1 animate-pulse"></span>
                    Pending
                  </span>
                  
                  {/* Hover Actions */}
                  <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
                      Decline
                    </button>
                    <button className="px-3 py-1 text-[10px] font-extrabold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm">
                      Approve & Pay
                    </button>
                  </div>

                  {/* Styled Amount */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-rose-600 group-hover:scale-105 transition-transform block">
                      {req.amount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
