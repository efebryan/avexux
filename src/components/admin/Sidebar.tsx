"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Wallet, 
  Gift, 
  Settings, 
  HelpCircle,
  ShieldAlert,
  Bell,
  RefreshCw
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardList },
  { name: "Financials", href: "/admin/financials", icon: Wallet },
  { name: "Referrals", href: "/admin/referrals", icon: RefreshCw },
  { name: "Rewards Config", href: "/admin/rewards", icon: Gift },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Support Tickets", href: "/admin/support", icon: HelpCircle },
];

const bottomItems = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-6 px-4 bg-[#0a0f1c] text-slate-300 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/10 blur-[80px] pointer-events-none rounded-full -translate-y-1/2"></div>
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10 relative z-10">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 border border-blue-400/20">
          <ShieldAlert className="w-5 h-5 text-white drop-shadow" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-white drop-shadow-sm">Arvexus</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Admin Pro</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5 relative z-10">
        {navItems.map((item) => {
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm border relative ${
                isActive 
                  ? "bg-blue-600/10 text-white border-blue-500/30 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.05)]" 
                  : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              )}
              <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "text-slate-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-6 border-t border-slate-800/50 space-y-1.5 relative z-10">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border ${
                isActive ? "bg-blue-600/10 text-white border-blue-500/30" : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-45 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
              {item.name}
            </Link>
          );
        })}
        
        <div className="pt-4 px-4 flex items-center gap-3 mt-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center border border-slate-500/30 text-xs font-bold text-white shadow-inner">
            SA
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Super Admin</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
