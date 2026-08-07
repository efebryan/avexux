"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, Check } from "lucide-react";
import { NotificationItem } from "@/components/user-dashboard/NotificationDropdown";
import { createClient } from "@/utils/supabase/client";

const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "platinum", threshold: 88000 },
];

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "unread" | "Task" | "Account" | "System"
  >("all");
  const supabase = createClient();

  useEffect(() => {
    async function fetchNotifications() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .or(`user_id.eq.${user.id},user_id.is.null`)
        .order("created_at", { ascending: false });

      let formatted: NotificationItem[] = [];
      if (data) {
        formatted = data.map((n: any) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          time: timeAgo(n.created_at),
          type: n.type,
          isRead: n.is_read,
          category: n.category || "System",
        }));
      }

      // Check Spin Eligibility
      const { data: txData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("user_id", user.id)
        .eq("type", "DEPOSIT")
        .eq("status", "Completed");

      let maxDeposit = 0;
      if (txData) {
        maxDeposit = txData.reduce(
          (max: number, tx: any) => Math.max(max, Number(tx.amount)),
          0,
        );
      }
      const rankIndex = Math.max(
        0,
        ranksConfig.findLastIndex((r) => maxDeposit >= r.threshold),
      );
      const userPlan = ranksConfig[rankIndex].id;

      const { data: settingsData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "wheel_config")
        .single();

      let spinDays = [5];
      if (
        settingsData?.value?.planDays &&
        settingsData.value.planDays[userPlan]
      ) {
        spinDays = settingsData.value.planDays[userPlan];
      } else {
        if (["platinum", "diamond"].includes(userPlan))
          spinDays = [1, 2, 3, 4, 5];
        else if (userPlan === "silver") spinDays = [1, 5];
      }

      const today = new Date().getDay();
      if (spinDays.includes(today)) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const { count: freeSpinsUsed } = await supabase
          .from("rewards_spins")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("cost_paid", 0)
          .gte("created_at", startOfDay.toISOString());

        if (freeSpinsUsed === 0) {
          formatted.unshift({
            id: "virtual_spin",
            title: "Free Spin Available!",
            message:
              "You have a free lucky spin available today. Try your luck!",
            time: "Just now",
            type: "success",
            category: "System",
            isRead: false,
          });
        }
      }

      setNotifications(formatted);
    }

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = async () => {
    const unreadIds = notifications
      .filter((n) => !n.isRead && n.id !== "virtual_spin")
      .map((n) => n.id);
    if (unreadIds.length === 0) {
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      return;
    }

    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("id", unreadIds);
  };

  const markAsRead = async (id: string) => {
    if (id === "virtual_spin") {
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      return;
    }
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread" && n.isRead) return false;
    if (
      activeTab !== "all" &&
      activeTab !== "unread" &&
      n.category !== activeTab
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notifications
          </h1>
          <p className="text-gray-500">
            Stay updated on your tasks, earnings, and account alerts.
          </p>
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
            <span className="bg-[#0f8538] text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
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
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors flex gap-4 ${!notification.isRead ? "bg-green-50/30" : ""}`}
              >
                <div className="shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <p
                      className={`text-base ${!notification.isRead ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs font-bold text-gray-400 whitespace-nowrap">
                      {notification.time}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {notification.message}
                  </p>
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
            <p className="font-medium text-gray-900 mb-1">
              You're all caught up!
            </p>
            <p className="text-sm">No notifications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
