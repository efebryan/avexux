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
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col h-full py-6 px-4 bg-gray-900 text-gray-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-blue-600 p-2 rounded-xl">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-white">Arvexus Admin</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Control Center</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          // Exact match for overview, prefix match for others
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                isActive 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-6 border-t border-gray-800 space-y-2">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 text-gray-500" />
              {item.name}
            </Link>
          );
        })}
        
        <div className="pt-4 px-4">
          <p className="text-xs text-gray-500 text-center">Logged in as Super Admin</p>
        </div>
      </div>
    </div>
  );
}
