"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wallet, 
  Users, 
  Settings, 
  HelpCircle,
  Leaf,
  ListTodo
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/user", icon: LayoutDashboard },
  { name: "Task Center", href: "/user/tasks", icon: ClipboardList },
  { name: "My Tasks", href: "/user/my-tasks", icon: ListTodo },
  { name: "Wallet", href: "/user/wallet", icon: Wallet },
  { name: "Referrals", href: "/user/referrals", icon: Users },
];

const bottomItems = [
  { name: "Settings", href: "/user/settings", icon: Settings },
  { name: "Support", href: "/user/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-[#0f8538] p-2 rounded-xl">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-gray-900">Arvexus</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Digital Growth</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/user" && item.name === "Dashboard");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                isActive 
                  ? "bg-[#ade5bb] text-[#0f8538] shadow-sm shadow-[#ade5bb]/20" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#0f8538]" : "text-gray-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation & Upgrade */}
      <div className="mt-auto pt-6 border-t border-gray-200/60 space-y-2">
        {bottomItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <item.icon className="w-5 h-5 text-gray-500" />
            {item.name}
          </Link>
        ))}
        
        <div className="pt-4">
          <Button className="w-full bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md shadow-[#0f8538]/20 font-semibold py-5">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
