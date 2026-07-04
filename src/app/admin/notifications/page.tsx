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

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Broadcast notification sent successfully!");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Broadcast Notifications</h1>
          <p className="text-gray-500 text-sm">Send alerts and updates directly to user dashboards.</p>
        </div>
      </div>

      <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white">
        <form onSubmit={handleSendNotification} className="space-y-5">
          
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Notification Title</label>
             <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="e.g., System Maintenance Upcoming"
               className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
             />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Message Body</label>
             <textarea 
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Enter the notification details here..."
               rows={4}
               className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
             />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Notification Type</label>
               <div className="flex gap-2">
                 <button 
                   type="button"
                   onClick={() => setType("info")}
                   className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   <Info className="w-4 h-4" /> Info
                 </button>
                 <button 
                   type="button"
                   onClick={() => setType("warning")}
                   className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
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
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-10 bg-white"
               >
                 <option value="all">All Registered Users</option>
                 <option value="active">Active Users Only</option>
                 <option value="pro">Pro Tier Users</option>
               </select>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Broadcast
            </Button>
          </div>
        </form>
      </Card>

      {/* History Preview */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-400" /> Recent Broadcasts
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
           <div className="space-y-3">
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
               <div>
                 <p className="font-bold text-gray-900 text-sm">Welcome to the new dashboard!</p>
                 <p className="text-xs text-gray-500">Sent to All Users</p>
               </div>
               <span className="text-xs font-bold text-gray-400">Oct 20, 2023</span>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
}
