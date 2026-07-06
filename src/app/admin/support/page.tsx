"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Ticket, 
  Clock, 
  Star, 
  Plus, 
  Filter,
  ListFilter,
  MoreHorizontal,
  UserPlus,
  Share,
  CheckCircle2,
  Paperclip,
  Smile,
  History as HistoryIcon,
  Send,
  ExternalLink,
  ChevronRight
} from "lucide-react";

// Mock Data
const ticketsData = [
  {
    id: "#TX-84920",
    priority: "HIGH",
    priorityColor: "text-red-600",
    time: "9:15 AM",
    user: "Sarah Jenkins",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=E2E8F0&color=333",
    preview: "I am having trouble with my recent transaction...",
    status: "In Progress",
    statusColor: "bg-amber-500",
    agent: "https://ui-avatars.com/api/?name=Alex+Rivera&background=0f172a&color=fff"
  },
  {
    id: "#TX-84919",
    priority: "MEDIUM",
    priorityColor: "text-amber-500",
    time: "8:30 AM",
    user: "Michael Chen",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=E2E8F0&color=333",
    preview: "Technical error code 504 during checkout...",
    status: "Open",
    statusColor: "bg-blue-500",
    agent: null
  },
  {
    id: "#TX-84917",
    priority: "HIGH",
    priorityColor: "text-red-600",
    time: "Yesterday",
    user: "David Miller",
    avatar: "https://ui-avatars.com/api/?name=David+Miller&background=E2E8F0&color=333",
    preview: "Card declined for recurring subscription...",
    status: "Pending",
    statusColor: "bg-amber-500",
    agent: null
  }
];

export default function SupportPage() {
  const [activeTicketId, setActiveTicketId] = useState("#TX-84920");
  const [replyText, setReplyText] = useState("");
  const [replyTab, setReplyTab] = useState("user");

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-4 md:-m-6 lg:-m-8 bg-white font-sans overflow-hidden">
      
      {/* Top Metrics Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Tickets</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-slate-900 leading-none">1,284</span>
                <span className="text-[11px] font-bold text-green-500 leading-none mb-0.5">+12%</span>
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-slate-200"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Open / Pending</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-slate-900 leading-none">42 / 18</span>
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-slate-200 hidden md:block"></div>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Avg Response</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-slate-900 leading-none">1.4h</span>
                <span className="text-[11px] font-bold text-green-500 leading-none mb-0.5">-15m</span>
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-slate-200 hidden lg:block"></div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">CSAT Score</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-slate-900 leading-none">4.82/5</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-lg px-4 shadow-sm h-10 hidden sm:flex">
            Export CSV
          </Button>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-lg px-4 shadow-sm h-10">
            <Plus className="w-4 h-4 mr-1.5" /> Create
          </Button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        
        {/* ================= LEFT COLUMN: TICKETS ================= */}
        <div className="w-full md:w-[320px] flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-white">
          <div className="p-4 border-b border-slate-100 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-900">Tickets (42)</h2>
              <div className="flex items-center gap-2 text-slate-400">
                <Filter className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                <ListFilter className="w-4 h-4 cursor-pointer hover:text-slate-700" />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button className="px-3 py-1 bg-green-700 text-white text-[11px] font-bold rounded-full whitespace-nowrap shrink-0">Open</button>
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-full whitespace-nowrap shrink-0 transition-colors">My Tickets</button>
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-full whitespace-nowrap shrink-0 transition-colors">High Priority</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-100">
              {ticketsData.map(ticket => (
                <div 
                  key={ticket.id}
                  onClick={() => setActiveTicketId(ticket.id)}
                  className={`p-4 cursor-pointer transition-colors border-l-4 relative ${activeTicketId === ticket.id ? 'bg-green-50/40 border-l-green-600' : 'bg-white border-l-transparent hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-900">{ticket.id}</span>
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${ticket.priorityColor}`}>{ticket.priority}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{ticket.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <img src={ticket.avatar} alt={ticket.user} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <span className="font-bold text-[13px] text-slate-900 truncate">{ticket.user}</span>
                  </div>

                  <p className="text-[12px] text-slate-500 truncate pr-6">{ticket.preview}</p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${ticket.statusColor}`}></span>
                      <span className="text-[10px] font-bold text-amber-500">{ticket.status}</span>
                    </div>
                    {ticket.agent && (
                      <img src={ticket.agent} className="w-5 h-5 rounded-full object-cover border border-white shadow-sm" alt="Agent" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MIDDLE COLUMN: CHAT ================= */}
        <div className="w-full md:flex-1 flex flex-col bg-[#fafafa]">
          {/* Chat Header */}
          <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0 flex justify-between items-center shadow-[0_4px_20px_-15px_rgba(0,0,0,0.05)] z-10">
            <div className="flex items-center gap-4">
              <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=E2E8F0&color=333" alt="User" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-[15px] font-bold text-slate-900">Sarah Jenkins</h2>
                  <span className="text-[11px] font-bold text-slate-400">{activeTicketId}</span>
                </div>
                <button className="text-[11px] font-bold text-green-600 hover:underline flex items-center gap-1">
                  View User Profile <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                <UserPlus className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                <Share className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* User Message */}
            <div className="flex gap-4 max-w-[85%]">
              <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=E2E8F0&color=333" alt="User" className="w-8 h-8 rounded-full shrink-0 mt-1" />
              <div>
                <div className="flex items-center gap-2 mb-1.5 ml-1">
                  <span className="font-bold text-[13px] text-slate-900">Sarah Jenkins</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">9:15 AM</span>
                </div>
                <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl rounded-tl-none">
                  <p className="text-[14px] text-slate-800 leading-relaxed">
                    I am having trouble with my recent transaction #P-90213. It says 'Pending' but the funds have been deducted from my wallet. Can you please check? I need this resolved urgently as it's for a client payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Agent Message */}
            <div className="flex gap-4 max-w-[85%] self-end ml-auto flex-row-reverse">
              <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=0f172a&color=fff" alt="Agent" className="w-8 h-8 rounded-full shrink-0 mt-1" />
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1.5 mr-1 flex-row-reverse">
                  <span className="font-bold text-[13px] text-green-700">Alex Rivera (Agent)</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">9:16 AM</span>
                </div>
                <div className="bg-[#e6f4ea] border border-[#d3ecd9] p-4 rounded-2xl rounded-tr-none text-slate-800 text-[14px] leading-relaxed shadow-sm">
                  <p className="mb-3">Hello Sarah! I'm sorry to hear about the confusion.</p>
                  <p>
                    I've flagged this for our financial department to investigate. We'll get back to you shortly. In the meantime, I can see your account status is verified, so there should be no hold-ups once the transaction clears on the network.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Reply Area */}
          <div className="p-6 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-6 mb-3 border-b border-slate-100">
              <button 
                onClick={() => setReplyTab("user")}
                className={`pb-2 text-[13px] font-bold border-b-2 transition-colors ${replyTab === 'user' ? 'border-green-600 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                Reply to User
              </button>
              <button 
                onClick={() => setReplyTab("internal")}
                className={`pb-2 text-[13px] font-bold border-b-2 transition-colors ${replyTab === 'internal' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                Internal Note
              </button>
            </div>

            <div className={`border rounded-xl flex flex-col focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all ${replyTab === 'internal' ? 'bg-amber-50/30 border-amber-200' : 'bg-slate-50/50 border-slate-200'}`}>
              <textarea 
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response here..."
                className="w-full bg-transparent p-4 text-[13px] text-slate-700 focus:outline-none resize-none"
              ></textarea>
              <div className="p-3 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <HistoryIcon className="w-4 h-4" />
                  </button>
                </div>
                <Button className="bg-[#34a853] hover:bg-[#2e9649] text-white font-bold rounded-lg shadow-sm h-9 px-4">
                  Send Reply <Send className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTEXT ================= */}
        <div className="hidden lg:flex w-[300px] flex-shrink-0 border-l border-slate-200 bg-white flex-col">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">User Context</h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5">Account Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-bold text-[13px] text-slate-900">Verified</span>
                </div>
              </div>
              
              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5">Total Lifetime Value</p>
                <p className="font-bold text-[14px] text-slate-900">$12,450.00</p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5">Customer Since</p>
                <p className="font-bold text-[13px] text-slate-900">Aug 14, 2023</p>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Recent History</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent before:left-0 before:z-0">
              
              <div className="relative flex items-start gap-4 z-10">
                <div className="w-[11px] h-[11px] rounded-full bg-slate-200 border-2 border-white shrink-0 mt-1"></div>
                <div>
                  <p className="text-[12px] font-bold text-slate-900 leading-none mb-1">Payout Issue Resolved</p>
                  <p className="text-[10px] text-slate-500 font-medium">Oct 12, 2024 • #TX-81022</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4 z-10">
                <div className="w-[11px] h-[11px] rounded-full bg-slate-200 border-2 border-white shrink-0 mt-1"></div>
                <div>
                  <p className="text-[12px] font-bold text-slate-900 leading-none mb-1">Plan Upgrade</p>
                  <p className="text-[10px] text-slate-500 font-medium">Sep 28, 2024 • Billing</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4 z-10">
                <div className="w-[11px] h-[11px] rounded-full bg-slate-200 border-2 border-white shrink-0 mt-1"></div>
                <div>
                  <p className="text-[12px] font-bold text-slate-900 leading-none mb-1">Welcome Onboarding</p>
                  <p className="text-[10px] text-slate-500 font-medium">Aug 15, 2024 • Account</p>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <Button variant="outline" className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-lg text-xs h-9 shadow-sm">
                View Full History
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
