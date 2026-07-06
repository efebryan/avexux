"use client";

import { useState } from "react";
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  UserPlus, 
  Wallet,
  Settings,
  MoreVertical,
  Check,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const allNotifications = [
  {
    id: 1,
    type: "user",
    title: "New User Registration",
    message: "Sarah Jenkins just created a new account.",
    time: "2 mins ago",
    date: "Today",
    unread: true,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100"
  },
  {
    id: 2,
    type: "financial",
    title: "Large Withdrawal Request",
    message: "Pending withdrawal of ₦150,000 from David M. Requires manual approval.",
    time: "1 hour ago",
    date: "Today",
    unread: true,
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100"
  },
  {
    id: 3,
    type: "system",
    title: "System Update Complete",
    message: "The scheduled maintenance has finished successfully. All services are operational.",
    time: "5 hours ago",
    date: "Today",
    unread: false,
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100"
  },
  {
    id: 4,
    type: "financial",
    title: "Deposit Received",
    message: "A deposit of ₦50,000 has been credited to account #49021.",
    time: "Yesterday, 2:45 PM",
    date: "Yesterday",
    unread: false,
    icon: Wallet,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100"
  },
  {
    id: 5,
    type: "system",
    title: "Settings Changed",
    message: "Global timezone settings were updated by Admin User.",
    time: "Oct 24, 2023",
    date: "Older",
    unread: false,
    icon: Settings,
    color: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-200"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return n.unread;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-white bg-red-500 px-2.5 py-0.5 rounded-full shadow-sm">{unreadCount} Unread</span>
              )}
            </h1>
            <p className="text-slate-500 text-sm">View and manage your system alerts and activities.</p>
          </div>
        </div>
        
        <Button 
          onClick={markAllAsRead}
          variant="outline" 
          className="bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-xl px-5 shadow-sm h-11"
        >
          <Check className="w-4 h-4 mr-2 text-slate-400" /> Mark All as Read
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 p-6 shrink-0">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filters
          </h3>
          <div className="space-y-1">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${activeFilter === "all" ? "bg-white text-primary shadow-sm border border-slate-200/60" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              All Notifications
            </button>
            <button 
              onClick={() => setActiveFilter("unread")}
              className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${activeFilter === "unread" ? "bg-white text-primary shadow-sm border border-slate-200/60" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              Unread
              {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md">{unreadCount}</span>}
            </button>
            <button 
              onClick={() => setActiveFilter("system")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${activeFilter === "system" ? "bg-white text-primary shadow-sm border border-slate-200/60" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              System Alerts
            </button>
            <button 
              onClick={() => setActiveFilter("financial")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${activeFilter === "financial" ? "bg-white text-primary shadow-sm border border-slate-200/60" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              Financial Actions
            </button>
            <button 
              onClick={() => setActiveFilter("user")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${activeFilter === "user" ? "bg-white text-primary shadow-sm border border-slate-200/60" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}
            >
              User Activity
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto bg-white p-2">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {filteredNotifications.map((notif) => (
                <div key={notif.id} className={`p-4 md:p-6 hover:bg-slate-50/80 transition-colors flex gap-4 ${notif.unread ? "bg-blue-50/10" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${notif.bg} ${notif.color} ${notif.border}`}>
                    <notif.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold ${notif.unread ? "text-slate-900" : "text-slate-700"}`}>
                          {notif.title}
                        </h3>
                        {notif.unread && (
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]"></span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap ml-4">
                        {notif.time}
                      </span>
                    </div>
                    
                    <p className={`text-[13px] leading-relaxed pr-8 ${notif.unread ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                      {notif.message}
                    </p>
                  </div>
                  
                  <button className="text-slate-400 hover:text-slate-600 p-1 self-start">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-4">
                <Bell className="w-8 h-8 text-slate-300" />
              </div>
              <p className="font-bold text-slate-600 text-lg mb-1">No notifications found</p>
              <p className="text-sm font-medium">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
