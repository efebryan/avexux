"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

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

// Dynamic recent signups will be used instead



function ChartComponent({ data }: { data: any[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    const skeletonHeights = [40, 70, 45, 80, 55, 30, 95];
    return (
      <div className="flex-1 flex items-center justify-center min-h-[180px]">
        <div className="animate-pulse flex space-x-4 items-end h-[120px]">
          {skeletonHeights.map((h, i) => (
            <div key={i} className="w-9 bg-slate-100 rounded-md" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
    );
  }

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
      <div className="w-full flex-1 min-h-0 relative overflow-x-auto scrollbar-hide">
        <div className="min-w-[500px] h-full">
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
    </div>
  );
}

export default function AdminOverviewPage() {
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [activeTasks, setActiveTasks] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  
  // Real data for subtexts
  const [pendingWithdrawalsCount, setPendingWithdrawalsCount] = useState(0);
  const [totalReferralsPayout, setTotalReferralsPayout] = useState(0);
  const [depositsToday, setDepositsToday] = useState(0);
  const [usersThisWeek, setUsersThisWeek] = useState(0);
  
  // Chart Data
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartGrowth, setChartGrowth] = useState({ pct: 0, type: "neutral" });
  
  // Recent Signups
  const [recentSignups, setRecentSignups] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFinancials() {
      const supabase = createClient();
      
      const { data: depositData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "DEPOSIT")
        .eq("status", "Completed");

      if (depositData) {
        const sum = depositData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalDeposits(sum);
      }

      const { data: withdrawalData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "WITHDRAWAL")
        .eq("status", "Completed");

      if (withdrawalData) {
        const sum = withdrawalData.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalWithdrawals(sum);
      }

      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      if (usersCount !== null) setTotalUsers(usersCount);

      const { count: activeUsersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("status", "ACTIVE");
      if (activeUsersCount !== null) setActiveUsers(activeUsersCount);

      const { count: referralsCount } = await supabase
        .from("referrals")
        .select("*", { count: "exact", head: true });
      if (referralsCount !== null) setTotalReferrals(referralsCount);

      const { count: tasksCount } = await supabase
        .from("tasks")
        .select("*", { count: "exact", head: true });
      if (tasksCount !== null) setTotalTasks(tasksCount);

      const { count: activeTasksCount } = await supabase
        .from("tasks")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");
      if (activeTasksCount !== null) setActiveTasks(activeTasksCount);

      // Fetch Subtext Real Data
      const { count: pWithdrawals } = await supabase
        .from("transactions")
        .select("*", { count: "exact", head: true })
        .eq("type", "WITHDRAWAL")
        .eq("status", "Pending");
      if (pWithdrawals !== null) setPendingWithdrawalsCount(pWithdrawals);

      const { data: refPayout } = await supabase
        .from("referrals")
        .select("commission_earned")
        .eq("status", "Completed");
      if (refPayout) {
        const refSum = refPayout.reduce((acc, r) => acc + (Number(r.commission_earned) || 0), 0);
        setTotalReferralsPayout(refSum);
      }

      const startOfDay = new Date();
      startOfDay.setHours(0,0,0,0);
      const { data: depsToday } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "DEPOSIT")
        .eq("status", "Completed")
        .gte("created_at", startOfDay.toISOString());
      if (depsToday) {
        const depSum = depsToday.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
        setDepositsToday(depSum);
      }

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const { count: uThisWeek } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfWeek.toISOString());
      if (uThisWeek !== null) setUsersThisWeek(uThisWeek);

      // Fetch Chart Data (last 7 days of DEPOSIT)
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 6);
      last7Days.setHours(0,0,0,0);
      
      const { data: chartTx } = await supabase
        .from("transactions")
        .select("amount, created_at")
        .eq("type", "DEPOSIT")
        .eq("status", "Completed")
        .gte("created_at", last7Days.toISOString());

      const days: { dateStr: string; label: string; amt: number }[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        days.push({
          dateStr: d.toISOString().split("T")[0],
          label: d.toLocaleDateString("en-US", { weekday: "short" }),
          amt: 0
        });
      }

      if (chartTx) {
        chartTx.forEach((tx) => {
          const txDate = tx.created_at.split("T")[0];
          const day = days.find(d => d.dateStr === txDate);
          if (day) {
            day.amt += Number(tx.amount) || 0;
          }
        });
      }

      const maxAmt = Math.max(...days.map(d => d.amt), 1);
      
      const computedChartData = days.map((d, i) => {
        const h = Math.max(10, (d.amt / maxAmt) * 120);
        const y = 145 - h;
        const prevAmt = i > 0 ? days[i-1].amt : 0;
        return {
          label: d.label,
          x: 30 + (i * 65),
          y,
          w: 36,
          h,
          amt: `₦${d.amt.toLocaleString()}`,
          type: d.amt >= prevAmt ? "growth" : "decline"
        };
      });

      setChartData(computedChartData);

      // Compute simple growth between first half and second half of the week for the top label
      const firstHalfSum = days.slice(0, 3).reduce((acc, d) => acc + d.amt, 0);
      const secondHalfSum = days.slice(3, 7).reduce((acc, d) => acc + d.amt, 0);
      let pct = 0;
      if (firstHalfSum > 0) {
        pct = ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100;
      }
      setChartGrowth({
        pct: Number(pct.toFixed(1)),
        type: pct >= 0 ? "growth" : "decline"
      });
      // Fetch Recent Signups (last 4)
      const { data: signups } = await supabase
        .from("profiles")
        .select("full_name, email, created_at, status")
        .order("created_at", { ascending: false })
        .limit(4);

      if (signups) {
        const formatted = signups.map((s, idx) => {
          const colors = [
            "bg-blue-100 text-blue-700",
            "bg-green-100 text-green-700",
            "bg-purple-100 text-purple-700",
            "bg-orange-100 text-orange-700",
          ];
          const name = s.full_name || "Unknown User";
          const init = name.substring(0, 2).toUpperCase();
          
          // Calculate time ago
          const diffMs = new Date().getTime() - new Date(s.created_at).getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHrs / 24);
          let joinedText = "";
          if (diffHrs < 1) joinedText = "Just now";
          else if (diffHrs < 24) joinedText = `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
          else joinedText = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

          return {
            username: name,
            email: s.email,
            joined: joinedText,
            initials: init,
            color: colors[idx % colors.length],
            offline: s.status !== "ACTIVE",
          };
        });
        setRecentSignups(formatted);
      }
    }
    fetchFinancials();
  }, []);

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
                {stat.title === "DEPOSITS RECEIVED" 
                  ? `₦${totalDeposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                  : stat.title === "WITHDRAWALS PAID" 
                  ? `₦${totalWithdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                  : stat.title === "TOTAL USERS"
                  ? totalUsers.toLocaleString()
                  : stat.title === "ACTIVE USERS"
                  ? activeUsers.toLocaleString()
                  : stat.title === "TOTAL TASKS"
                  ? totalTasks.toLocaleString()
                  : stat.title === "TOTAL REFERRALS"
                  ? totalReferrals.toLocaleString()
                  : stat.value}
              </h3>
            </div>
            
            {/* Bottom row: Subtext */}
            <div className="mt-auto pt-1 border-t border-slate-50">
              {i === 0 ? (
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 shrink-0" /> <span className="truncate">+{usersThisWeek} this week</span>
                </p>
              ) : i === 1 ? (
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3 shrink-0" /> <span className="truncate">Active accounts</span>
                </p>
              ) : i === 2 ? (
                <p className="text-[10px] font-bold flex items-center gap-1 whitespace-nowrap">
                  <span className="text-green-600">{activeTasks} active</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">{Math.max(0, totalTasks - activeTasks)} inactive</span>
                </p>
              ) : i === 3 ? (
                <p className="text-[10px] font-bold text-slate-500 truncate">
                  <span className="text-slate-900">₦{totalReferralsPayout.toLocaleString()}</span> paid out
                </p>
              ) : i === 4 ? (
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 truncate">
                  <span className="text-sm leading-none">+</span> ₦{depositsToday.toLocaleString()} today
                </p>
              ) : (
                <p className="text-[10px] text-amber-500 font-bold flex items-center gap-1 truncate">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {pendingWithdrawalsCount} pending requests
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
              <div className={`border text-xs font-semibold px-3 py-1 rounded-full ${
                chartGrowth.type === "growth" 
                  ? "bg-green-50 border-green-100 text-green-700" 
                  : "bg-rose-50 border-rose-100 text-rose-700"
              }`}>
                {chartGrowth.pct > 0 ? "+" : ""}{chartGrowth.pct}% {chartGrowth.type === "growth" ? "Growth" : "Decline"}
              </div>
            </div>
          </div>

          {/* Senior UI SVG Chart Visualization */}
          <ChartComponent data={chartData} />
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
            {recentSignups.map((user, i) => (
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
    </div>
  );
}
