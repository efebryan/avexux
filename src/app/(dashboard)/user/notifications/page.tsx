"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Info, Check } from "lucide-react";
import { mockNotifications, NotificationItem } from "@/components/user-dashboard/NotificationDropdown";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "Task" | "Account" | "System">("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "unread" && n.isRead) return false;
    if (activeTab !== "all" && activeTab !== "unread" && n.category !== activeTab) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-500">Stay updated on your tasks, earnings, and account alerts.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl shadow-sm text-sm font-bold transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab("all")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "all" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab("unread")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === "unread" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Unread
          {unreadCount > 0 && (
             <span className="bg-[#0f8538] text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab("Task")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "Task" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Tasks
        </button>
        <button 
          onClick={() => setActiveTab("Account")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "Account" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Account
        </button>
        <button 
          onClick={() => setActiveTab("System")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "System" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          System
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-500">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${!notification.isRead ? "bg-green-50/30" : ""}`}
              >
                <div className="shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <p className={`text-base ${!notification.isRead ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs font-bold text-gray-400 whitespace-nowrap">{notification.time}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {notification.category}
                    </span>
                    {!notification.isRead && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs font-bold text-[#0f8538] hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gray-300" />
            </div>
            <p className="font-medium text-gray-900 mb-1">You're all caught up!</p>
            <p className="text-sm">No notifications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
