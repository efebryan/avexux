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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      {/* Explore New Tasks */}
      <Link 
        href="/user/tasks"
        className="group relative overflow-hidden bg-[#0f8538] rounded-xl p-4 text-left transition-transform hover:-translate-y-1 hover:shadow-md shadow-sm flex items-center justify-between"
      >
        <div className="relative z-10 text-white">
          <p className="text-xs font-medium opacity-90 mb-0.5">Explore</p>
          <h3 className="text-base font-bold">New Tasks</h3>
        </div>
        <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
      </Link>

      {/* Withdraw Cash Out */}
      <Link 
        href="/user/wallet"
        className="group relative overflow-hidden bg-[#1f2328] rounded-xl p-4 text-left transition-transform hover:-translate-y-1 hover:shadow-md shadow-sm flex items-center justify-between border border-[#2d3136]"
      >
        <div className="relative z-10 text-white">
          <p className="text-xs font-medium opacity-70 mb-0.5">Withdraw</p>
          <h3 className="text-base font-bold">Cash Out</h3>
        </div>
        <div className="relative z-10 text-gray-400 group-hover:text-white transition-colors">
          <Banknote className="w-6 h-6" strokeWidth={1.5} />
        </div>
      </Link>

      {/* Affiliate Copy Link */}
      <button 
        onClick={handleCopyLink}
        className="group relative overflow-hidden bg-gray-200/80 rounded-xl p-4 text-left transition-transform hover:-translate-y-1 hover:shadow-md shadow-sm flex items-center justify-between border border-gray-300"
      >
        <div className="relative z-10 text-gray-900">
          <p className="text-xs font-medium text-gray-600 mb-0.5">Affiliate</p>
          <h3 className="text-base font-bold">Copy Link</h3>
        </div>
        <div className="relative z-10 text-[#0f8538] bg-white p-2 rounded-lg shadow-sm transition-transform group-hover:scale-110">
          <Copy className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}
