"use client";

import { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, UserPlus, X } from "lucide-react";
import Link from "next/link";

const mockNotifications = [
  {
    id: 1,
    title: "New User Registration",
    message: "Sarah Jenkins just created a new account.",
    time: "2 mins ago",
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: 2,
    title: "Large Withdrawal Request",
    message: "Pending withdrawal of ₦150,000 from David M.",
    time: "1 hour ago",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    id: 3,
    title: "System Update Complete",
    message: "The scheduled maintenance has finished successfully.",
    time: "5 hours ago",
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50"
  }
];

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-full flex items-center justify-between gap-4 h-full bg-white relative">
      {/* Left side: Greeting */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Welcome, Admin! 👋
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* Notification Bell Container */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Notification Dropdown / Modal */}
          {showNotifications && (
            <>
              {/* Backdrop for mobile */}
              <div 
                className="fixed inset-0 z-40 bg-black/20 sm:hidden"
                onClick={() => setShowNotifications(false)}
              />
              
              <div className="absolute top-full right-0 mt-2 w-[calc(100vw-32px)] max-w-[360px] sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[60vh] sm:max-h-[320px]">
                  <div className="divide-y divide-slate-100">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                          <notif.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 mb-0.5">{notif.title}</p>
                          <p className="text-[11px] text-slate-500 leading-tight mb-1.5">{notif.message}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                  <Link 
                    href="/admin/notifications" 
                    onClick={() => setShowNotifications(false)}
                    className="block w-full text-center text-xs font-bold text-primary hover:text-primary/80 transition-colors py-1"
                  >
                    View All Notifications
                  </Link>
                </div>

              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">Admin User</p>
            <p className="text-xs text-slate-500">Master Access</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
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
