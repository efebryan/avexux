"use client";

import { useState } from "react";
import { StoreHeader } from "@/components/user-dashboard/rewards/StoreHeader";
import { SpinWheel } from "@/components/user-dashboard/rewards/SpinWheel";

export default function RewardsStorePage() {
  const [balance, setBalance] = useState(12500); // Mock starting balance

  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Store</h1>
            <p className="text-gray-500 text-sm">Spin the wheel and claim exclusive bonus payouts.</p>
          </div>
          <div className="bg-[#0f8538] text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2.5 w-full md:w-auto">
            <span className="text-xs font-medium text-green-100">Wallet Balance:</span>
            <span className="text-base font-bold">₦{balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="animate-in fade-in duration-500">
        <SpinWheel balance={balance} setBalance={setBalance} />
      </div>
    </div>
  );
}
