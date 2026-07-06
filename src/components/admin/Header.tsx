"use client";

import { Search, Bell, HelpCircle, Grid3X3 } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between gap-4 h-full bg-white">
      {/* Left side: Greeting */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Welcome, Admin! 👋
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <button className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>

        <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
          <Grid3X3 className="w-5 h-5" />
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">Admin User</p>
            <p className="text-xs text-slate-500">Master Access</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
            {/* Mock user avatar using a placeholder image from ui-avatars or a local fallback */}
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
              alt="Admin Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
