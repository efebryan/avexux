"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Smartphone, Play, ThumbsUp, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  category: "Social" | "Video" | "App Install" | "Reviews";
  payout: number;
  completed: number;
  total: number;
  platform: string;
  icon: React.ReactNode;
}

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "TikTok Product Review",
    category: "Reviews",
    payout: 2500,
    completed: 850,
    total: 1000,
    platform: "TikTok",
    icon: <Play className="w-5 h-5" />,
  },
  {
    id: "task-2",
    title: "Join Telegram Support Channel",
    category: "Social",
    payout: 750,
    completed: 1842,
    total: 2000,
    platform: "Telegram",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: "task-3",
    title: "Download & Install Arvexus Beta",
    category: "App Install",
    payout: 3500,
    completed: 420,
    total: 500,
    platform: "Android / iOS",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "task-4",
    title: "Follow and Like Brand Launch Post",
    category: "Social",
    payout: 500,
    completed: 2900,
    total: 3000,
    platform: "Twitter (X)",
    icon: <ThumbsUp className="w-5 h-5" />,
  },
  {
    id: "task-5",
    title: "Watch 2-Min Promotional Video",
    category: "Video",
    payout: 600,
    completed: 1100,
    total: 1500,
    platform: "YouTube",
    icon: <Play className="w-5 h-5" />,
  },
  {
    id: "task-6",
    title: "Write Google Play App Review",
    category: "Reviews",
    payout: 2000,
    completed: 650,
    total: 800,
    platform: "Google Play Store",
    icon: <Smartphone className="w-5 h-5" />,
  },
];

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Social", "Video", "App Install", "Reviews"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredTasks = initialTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || task.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Verification Info Alert */}
        <div className="bg-[#e6f7e6]/50 rounded-2xl p-6 border border-[#e6f7e6] flex items-center justify-between gap-6 mb-16 flex-col md:flex-row text-center md:text-left">
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-[#2faf2f] flex items-center justify-center text-white shrink-0 shadow-md shadow-green-900/10">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Earn Verified Naira (₦) Rewards</h3>
              <p className="text-xs text-gray-500 mt-0.5">Complete any campaign below. Upload proof, get validated, withdraw directly to bank.</p>
            </div>
          </div>
          <Link 
            href="/register" 
            className="h-11 px-5 rounded-xl bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            Create Earner Account <Send className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Task Filtering Area */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Categories Tab */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === category
                    ? "bg-[#2faf2f] text-white shadow-sm"
                    : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-150 bg-white text-xs placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all"
            />
          </div>
        </div>

        {/* Task Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const percent = Math.round((task.completed / task.total) * 100);
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="py-1 px-2.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">
                          {task.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-400">{task.platform}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-bold text-gray-900 mb-6 font-heading min-h-[48px]">
                        {task.title}
                      </h4>
                    </div>

                    <div>
                      {/* Completion Progress Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                          <span>Progress</span>
                          <span>{task.completed}/{task.total} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                          <div 
                            className="bg-[#2faf2f] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Reward</div>
                          <div className="text-lg font-black text-gray-900 font-heading">{formatPrice(task.payout)}</div>
                        </div>
                        <Link
                          href={`/register?task=${task.id}`}
                          className="h-10 px-4 rounded-xl bg-[#2faf2f]/10 text-[#2faf2f] hover:bg-[#2faf2f] hover:text-white font-bold text-xs flex items-center justify-center transition-all"
                        >
                          Complete Task
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <p className="text-gray-500 font-semibold text-sm">No tasks matched your search or category filter.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
