"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DepositModal } from "@/components/user-dashboard/wallet/DepositModal";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export function WeeklyGoal() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [highestDeposit, setHighestDeposit] = useState(0);

  useEffect(() => {
    async function fetchHighestDeposit() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id);
        
        if (txData) {
          const maxDeposit = txData
            .filter((tx: any) => tx.type?.toLowerCase() === 'deposit' || (tx.metadata?.description || "").toLowerCase().includes('deposit') || (tx.description || "").toLowerCase().includes('deposit'))
            .reduce((max: number, tx: any) => Math.max(max, Number(tx.amount)), 0);
          setHighestDeposit(maxDeposit);
        }
      }
    }
    fetchHighestDeposit();
  }, []);

  const handleDeposit = (amount: number, method: string) => {
    toast.success(`Successfully upgraded plan with ₦${amount.toLocaleString()}!`);
    setIsUpgradeModalOpen(false);
  };
  return (
    <Card className="p-3.5 border border-gray-100 shadow-sm rounded-xl mb-4">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Weekly Goal</h3>
      
      {/* Circular Progress (Mocked) */}
      <div className="relative flex justify-center mb-4">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
          <circle 
            cx="48" cy="48" r="40" fill="transparent" stroke="#0f8538" strokeWidth="8" 
            strokeDasharray="251.3" strokeDashoffset="37.7" strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#0f8538]">85%</span>
          <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">Goal</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Target:</span>
          <span className="font-bold text-gray-900">₦500.00</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Achieved:</span>
          <span className="font-bold text-[#0f8538]">₦425.20</span>
        </div>
      </div>

      <Button 
        onClick={() => setIsUpgradeModalOpen(true)}
        className="w-full h-9 bg-[#f1f5f9] hover:bg-gray-200 text-[#0f8538] text-xs font-bold rounded-lg shadow-none border border-transparent transition-colors"
      >
        Upgrade
      </Button>

      <DepositModal 
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onDeposit={handleDeposit}
        highestDeposit={highestDeposit}
      />
    </Card>
  );
}
