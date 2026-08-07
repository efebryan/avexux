"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, AlertTriangle, UserPlus, ClipboardList, Wallet, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  created_at: Date;
  icon: any;
  color: string;
  bg: string;
  link: string;
  isNew?: boolean;
}

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // 1. Fetch initial data (Pending tasks and withdrawals)
    async function fetchInitialNotifications() {
      const { data: withdrawals } = await supabase
        .from("withdrawal_requests")
        .select("id, amount, created_at, profiles!withdrawal_requests_user_id_fkey(full_name)")
        .eq("status", "Pending")
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: tasks } = await supabase
        .from("task_submissions")
        .select("id, created_at, profiles!task_submissions_user_id_fkey(full_name), tasks!inner(title)")
        .eq("status", "Pending Review")
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: users } = await supabase
        .from("profiles")
        .select("id, full_name, created_at")
        .order("created_at", { ascending: false })
        .limit(3); // Just show the last 3 signups if they are very recent

      const combined: NotificationItem[] = [];

      if (withdrawals) {
        withdrawals.forEach((w: any) => {
          const profile = Array.isArray(w.profiles) ? w.profiles[0] : w.profiles;
          combined.push({
            id: `w-${w.id}`,
            title: "New Withdrawal Request",
            message: `${profile?.full_name || 'A user'} requested ₦${Number(w.amount).toLocaleString()}`,
            time: formatTimeAgo(new Date(w.created_at)),
            created_at: new Date(w.created_at),
            icon: Wallet,
            color: "text-amber-500",
            bg: "bg-amber-50",
            link: "/admin/financials"
          });
        });
      }

      if (tasks) {
        tasks.forEach((t: any) => {
          const profile = Array.isArray(t.profiles) ? t.profiles[0] : t.profiles;
          const task = Array.isArray(t.tasks) ? t.tasks[0] : t.tasks;
          combined.push({
            id: `t-${t.id}`,
            title: "Task Pending Review",
            message: `${profile?.full_name || 'A user'} submitted "${task?.title || 'a task'}"`,
            time: formatTimeAgo(new Date(t.created_at)),
            created_at: new Date(t.created_at),
            icon: ClipboardList,
            color: "text-blue-500",
            bg: "bg-blue-50",
            link: "/admin/history"
          });
        });
      }

      if (users) {
        users.forEach((u: any) => {
          // Only show users that registered in the last 24 hours as notifications
          const isRecent = (new Date().getTime() - new Date(u.created_at).getTime()) < 24 * 60 * 60 * 1000;
          if (isRecent) {
            combined.push({
              id: `u-${u.id}`,
              title: "New User Registration",
              message: `${u.full_name} just created a new account.`,
              time: formatTimeAgo(new Date(u.created_at)),
              created_at: new Date(u.created_at),
              icon: UserPlus,
              color: "text-green-500",
              bg: "bg-green-50",
              link: "/admin/users"
            });
          }
        });
      }

      // Sort combined array by created_at descending
      combined.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
      
      setNotifications(combined.slice(0, 10)); // keep max 10
    }

    fetchInitialNotifications();

    // 2. Setup Realtime Subscriptions
    const channel = supabase.channel('admin_notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'withdrawal_requests' },
        (payload) => {
          const newW = payload.new;
          if (newW.status === 'Pending') {
            const notif: NotificationItem = {
              id: `w-${newW.id}`,
              title: "Live: New Withdrawal!",
              message: `A new withdrawal of ₦${Number(newW.amount).toLocaleString()} was requested.`,
              time: "Just now",
              created_at: new Date(),
              icon: Wallet,
              color: "text-amber-500",
              bg: "bg-amber-50",
              link: "/admin/financials",
              isNew: true
            };
            toast.success(notif.message, { id: notif.id, icon: '💰' });
            setNotifications(prev => [notif, ...prev].slice(0, 10));
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'task_submissions' },
        (payload) => {
          const newT = payload.new;
          if (newT.status === 'Pending Review') {
            const notif: NotificationItem = {
              id: `t-${newT.id}`,
              title: "Live: Task Submitted!",
              message: `A new task submission needs review.`,
              time: "Just now",
              created_at: new Date(),
              icon: ClipboardList,
              color: "text-blue-500",
              bg: "bg-blue-50",
              link: "/admin/history",
              isNew: true
            };
            toast.info(notif.message, { id: notif.id, icon: '📋' });
            setNotifications(prev => [notif, ...prev].slice(0, 10));
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        (payload) => {
          const newU = payload.new;
          const notif: NotificationItem = {
            id: `u-${newU.id}`,
            title: "Live: New User!",
            message: `${newU.full_name || 'Someone'} just registered.`,
            time: "Just now",
            created_at: new Date(),
            icon: UserPlus,
            color: "text-green-500",
            bg: "bg-green-50",
            link: "/admin/users",
            isNew: true
          };
          toast.success(notif.message, { id: notif.id, icon: '👋' });
          setNotifications(prev => [notif, ...prev].slice(0, 10));
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Format date helper
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const handleNotificationClick = (link: string) => {
    setShowNotifications(false);
    router.push(link);
  };

  const handleOpenDropdown = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
    }
  };

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
            onClick={handleOpenDropdown}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown / Modal */}
          {showNotifications && (
            <>
              {/* Backdrop for mobile */}
              <div 
                className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm sm:hidden"
                onClick={() => setShowNotifications(false)}
              />
              
              <div className="fixed top-[72px] right-4 sm:absolute sm:top-full sm:right-0 sm:mt-2 w-[calc(100vw-32px)] max-w-[380px] sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">Notifications</h3>
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                      {notifications.length}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[60vh] sm:max-h-[380px]">
                  <div className="divide-y divide-slate-100">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          onClick={() => handleNotificationClick(notif.link)}
                          className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3.5 relative ${notif.isNew ? 'bg-primary/5' : ''}`}
                        >
                          {notif.isNew && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          )}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color} shadow-sm border border-slate-100/50`}>
                            <notif.icon className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 mb-0.5">
                              <p className="text-sm font-bold text-slate-900 truncate">{notif.title}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-0.5">{notif.time}</p>
                            </div>
                            <p className="text-[13px] text-slate-600 leading-snug">{notif.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500">
                        <CheckCircle2 className="w-8 h-8 text-slate-300 mb-3" />
                        <p className="text-sm font-bold text-slate-900">All caught up!</p>
                        <p className="text-xs mt-1">No new notifications right now.</p>
                      </div>
                    )}
                  </div>
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
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mt-0.5">Master Access</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 shrink-0 ring-1 ring-slate-200">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=0f8538&color=fff" 
              alt="Admin Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
