"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Wallet, 
  RefreshCw,
  Settings, 
  HelpCircle,
  LayoutGrid,
  FileText,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardList },
  { name: "Financials", href: "/admin/financials", icon: Wallet },
  { name: "Referrals", href: "/admin/referrals", icon: RefreshCw },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-6 bg-[#111827] text-slate-300 relative overflow-hidden">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 mb-10">
        <div className="bg-[#22c55e] p-2 rounded-xl flex-shrink-0">
          <LayoutGrid className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-none text-white tracking-tight">Arvexus</span>
          <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest mt-1">SUPER ADMIN</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 px-6 py-3.5 transition-all duration-200 font-medium text-sm ${
                isActive 
                  ? "bg-[#1f2937] text-white border-l-[3px] border-[#22c55e]" 
                  : "text-slate-400 hover:bg-[#1f2937] hover:text-slate-200 border-l-[3px] border-transparent"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#22c55e]" : "text-slate-500 group-hover:text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-6 space-y-6">
        <Button className="w-full bg-[#22c55e] hover:bg-green-600 text-white font-semibold shadow-md rounded-lg flex items-center justify-center gap-2 h-11">
           <FileText className="w-4 h-4" />
           Generate Report
        </Button>

        <div className="flex flex-col space-y-4 pt-4">
          <Link href="/admin/support" className="flex items-center gap-4 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-500" />
            Help Center
          </Link>
          
          <button className="flex items-center gap-4 text-sm font-medium text-red-500 hover:text-red-400 transition-colors w-full text-left">
            <LogOut className="w-5 h-5 text-red-500" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
