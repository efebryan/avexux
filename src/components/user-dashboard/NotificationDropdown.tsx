"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle2, AlertCircle, Info, Check } from "lucide-react";
import Link from "next/link";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "success" | "warning" | "info";
  isRead: boolean;
  category: "Task" | "Account" | "System";
}

// Mock Data
export const mockNotifications: NotificationItem[] = [
  { id: "n1", title: "Task Approved", message: "Your submission for 'UI Testing' was approved! ₦1,500 has been added to your wallet.", time: "2 hours ago", type: "success", isRead: false, category: "Task" },
  { id: "n2", title: "New Task Available", message: "A new premium task 'Review E-commerce App' matches your profile.", time: "5 hours ago", type: "info", isRead: false, category: "Task" },
  { id: "n3", title: "Security Alert", message: "New login detected from Chrome on Windows.", time: "1 day ago", type: "warning", isRead: true, category: "Account" },
  { id: "n4", title: "Platform Update", message: "We've added new gift cards to the Rewards Store!", time: "2 days ago", type: "info", isRead: true, category: "System" },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 3); // Show top 3 in dropdown

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-colors ${isOpen ? "bg-gray-100" : "hover:bg-gray-100"}`}
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#f8fafc]"></span>
        )}
      </button>

      {/* Dropdown Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold text-[#0f8538] hover:text-[#0c6b2c] flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {recentNotifications.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {recentNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 hover:bg-gray-50 transition-colors flex gap-3 ${!notification.isRead ? "bg-green-50/30" : ""}`}
                  >
                    <div className="shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.isRead ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">{notification.time}</p>
                    </div>
                    {!notification.isRead && (
                      <div className="shrink-0 w-2 h-2 bg-[#0f8538] rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                You have no notifications.
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <Link 
              href="/user/notifications" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-sm font-bold text-[#0f8538] hover:text-[#0c6b2c] py-2 rounded-xl hover:bg-green-50 transition-colors"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
