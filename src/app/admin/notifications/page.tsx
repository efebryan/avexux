"use client";

import { useState } from "react";
import { Send, Users, Info, Bell, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [audience, setAudience] = useState("all");
  const [broadcasts, setBroadcasts] = useState([
    { title: "Welcome to the new dashboard!", audience: "All Users", type: "info", date: "Oct 20, 2023" },
  ]);

  const audienceLabel: Record<string, string> = {
    all: "All Users",
    active: "Active Users",
    pro: "Pro Tier Users",
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newBroadcast = {
      title,
      audience: audienceLabel[audience] ?? "All Users",
      type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
    toast.success("Broadcast notification sent successfully!");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Broadcast Notifications</h1>
          <p className="text-gray-500 text-sm">Send alerts and updates directly to user dashboards.</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 border border-gray-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <form onSubmit={handleSendNotification} className="space-y-5 relative z-10">
          
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1.5">Notification Title</label>
             <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="e.g., System Maintenance Upcoming"
               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all"
             />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1.5">Message Body</label>
             <textarea 
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Enter the notification details here..."
               rows={4}
               className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none bg-gray-50 focus:bg-white transition-all"
             />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Notification Type</label>
               <div className="flex gap-2">
                 <button 
                   type="button"
                   onClick={() => setType("info")}
                   className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${type === 'info' ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   <Info className="w-4 h-4" /> Info
                 </button>
                 <button 
                   type="button"
                   onClick={() => setType("warning")}
                   className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${type === 'warning' ? 'bg-yellow-50 border-yellow-300 text-yellow-700 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   <AlertTriangle className="w-4 h-4" /> Alert
                 </button>
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
               <select 
                 value={audience}
                 onChange={(e) => setAudience(e.target.value)}
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-11 bg-white font-medium"
               >
                 <option value="all">All Registered Users</option>
                 <option value="active">Active Users Only</option>
                 <option value="pro">Pro Tier Users</option>
               </select>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 rounded-xl shadow-md hover:-translate-y-0.5 transition-all px-6">
              <Send className="w-4 h-4" /> Send Broadcast
            </Button>
          </div>
        </form>
      </Card>

      {/* History Preview */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg tracking-tight">
          <Bell className="w-5 h-5 text-gray-400" /> Recent Broadcasts
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="divide-y divide-gray-50">
             {broadcasts.map((b, i) => (
               <div key={i} className="flex items-center justify-between p-4 px-5 hover:bg-gray-50/50 transition-colors">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${b.type === 'warning' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                     {b.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm">{b.title}</p>
                     <p className="text-xs text-gray-500 mt-0.5">Sent to {b.audience}</p>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap ml-4">{b.date}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

    </div>
  );
}
