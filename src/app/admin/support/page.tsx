"use client";

import { useState } from "react";
import { MessageSquare, Mail, Search, Send, CheckCircle2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock Data
const mockTickets = [
  { id: "t1", user: "john_doe99", email: "john@example.com", subject: "Task Rejected Incorrectly", message: "My screenshot was clear but it got rejected.", status: "Open", date: "2 hours ago" },
  { id: "t2", user: "sarah_tasks", email: "sarah@example.com", subject: "Withdrawal not received", message: "It has been 3 days since my withdrawal.", status: "In Progress", date: "1 day ago" },
  { id: "t3", user: "crypto_king", email: "crypto@example.com", subject: "Referral missing", message: "My friend joined but I didn't get credit.", status: "Resolved", date: "3 days ago" },
];

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredTickets = tickets.filter(t => 
    t.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTicket = tickets.find(t => t.id === activeTicket);

  const handleSendReply = () => {
    if (!replyText) return;
    toast.success("Reply sent to user!");
    
    // Mark as resolved after reply, but keep ticket selected so admin can see the resolved state
    setTickets(prev => prev.map(t => t.id === activeTicket ? { ...t, status: "Resolved" } : t));
    setReplyText("");
    // Don't deselect — keep on ticket so admin sees the resolved conversation
  };

  const handleResolve = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "Resolved" } : t));
    toast.success("Ticket marked as resolved");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Support Inbox</h1>
          <p className="text-gray-500 text-sm">Respond to user inquiries and issues.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Ticket List Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm bg-white"
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex-1 overflow-y-auto">
             <div className="divide-y divide-gray-50">
               {filteredTickets.map((ticket) => (
                 <button 
                   key={ticket.id}
                   onClick={() => setActiveTicket(ticket.id)}
                   className={`w-full text-left p-5 hover:bg-slate-50 transition-colors flex flex-col gap-2 ${activeTicket === ticket.id ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                 >
                   <div className="flex justify-between items-start w-full">
                     <span className="font-bold text-gray-900 text-sm truncate pr-2">{ticket.user}</span>
                     <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{ticket.date}</span>
                   </div>
                   <p className="text-sm font-semibold text-gray-700 truncate">{ticket.subject}</p>
                   <div className="flex items-center justify-between w-full mt-1.5">
                     <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border ${
                       ticket.status === 'Open' ? 'bg-red-50 text-red-700 border-red-200' :
                       ticket.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'
                     }`}>
                       {ticket.status}
                     </span>
                     <MessageSquare className="w-3.5 h-3.5 text-gray-300" />
                   </div>
                 </button>
               ))}
               {filteredTickets.length === 0 && (
                 <div className="p-8 text-center text-gray-500 text-sm">No tickets found.</div>
               )}
             </div>
          </div>
        </div>

        {/* Ticket Thread View */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-100 rounded-2xl shadow-sm flex-col hidden lg:flex overflow-hidden">
          {selectedTicket ? (
            <>
              {/* Thread Header */}
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg tracking-tight">{selectedTicket.subject}</h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 font-medium">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gray-400" /> {selectedTicket.user}</span>
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedTicket.email}</span>
                  </div>
                </div>
                {selectedTicket.status !== 'Resolved' && (
                  <Button onClick={() => handleResolve(selectedTicket.id)} variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Resolved
                  </Button>
                )}
              </div>

              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                 {/* User Message */}
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shrink-0 flex items-center justify-center font-bold text-sm text-gray-600 uppercase shadow-inner border border-white">
                     {selectedTicket.user.substring(0, 2)}
                   </div>
                   <div className="flex-1">
                     <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none inline-block shadow-sm">
                       <p className="text-sm text-gray-800 leading-relaxed">{selectedTicket.message}</p>
                     </div>
                     <p className="text-[10px] text-gray-400 font-medium mt-1.5 flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedTicket.date}</p>
                   </div>
                 </div>

                 {/* Admin Reply (if resolved) */}
                 {selectedTicket.status === 'Resolved' && (
                   <div className="flex gap-4 flex-row-reverse">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shrink-0 flex items-center justify-center font-bold text-sm text-white uppercase shadow-inner border border-white">
                       AD
                     </div>
                     <div className="flex-1 flex flex-col items-end">
                       <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none inline-block shadow-sm">
                         <p className="text-sm leading-relaxed">This issue has been reviewed and resolved. Thank you.</p>
                       </div>
                       <p className="text-[10px] text-gray-400 font-medium mt-1.5 flex items-center gap-1">System <CheckCircle2 className="w-3 h-3 text-green-500" /></p>
                     </div>
                   </div>
                 )}
              </div>

              {/* Reply Box */}
              {selectedTicket.status !== 'Resolved' && (
                <div className="p-5 border-t border-gray-100 bg-white shrink-0">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to the user..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none mb-3 bg-gray-50 focus:bg-white transition-all"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendReply} className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 rounded-xl shadow-md hover:-translate-y-0.5 transition-all">
                      <Send className="w-4 h-4" /> Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-medium text-sm">Select a ticket to view the conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

