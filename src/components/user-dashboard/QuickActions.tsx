"use client";

import { ChevronRight, Banknote, Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function QuickActions() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://arvexus.com/ref/bryan123");
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Explore New Tasks */}
      <Link 
        href="/user/tasks"
        className="group relative overflow-hidden bg-[#0f8538] rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-between"
      >
        <div className="relative z-10 text-white">
          <p className="text-sm font-medium opacity-90 mb-1">Explore</p>
          <h3 className="text-xl font-bold">New Tasks</h3>
        </div>
        <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      </Link>

      {/* Withdraw Cash Out */}
      <Link 
        href="/user/wallet"
        className="group relative overflow-hidden bg-[#1f2328] rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-between border border-[#2d3136]"
      >
        <div className="relative z-10 text-white">
          <p className="text-sm font-medium opacity-70 mb-1">Withdraw</p>
          <h3 className="text-xl font-bold">Cash Out</h3>
        </div>
        <div className="relative z-10 text-gray-400 group-hover:text-white transition-colors">
          <Banknote className="w-8 h-8" strokeWidth={1.5} />
        </div>
      </Link>

      {/* Affiliate Copy Link */}
      <button 
        onClick={handleCopyLink}
        className="group relative overflow-hidden bg-gray-200/80 rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-lg shadow-sm flex items-center justify-between border border-gray-300"
      >
        <div className="relative z-10 text-gray-900">
          <p className="text-sm font-medium text-gray-600 mb-1">Affiliate</p>
          <h3 className="text-xl font-bold">Copy Link</h3>
        </div>
        <div className="relative z-10 text-[#0f8538] bg-white p-2.5 rounded-xl shadow-sm transition-transform group-hover:scale-110">
          <Copy className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
}
