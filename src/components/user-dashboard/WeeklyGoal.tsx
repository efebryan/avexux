"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Trophy } from "lucide-react";

const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "Premium", threshold: 88000 }, // Matches platinum/diamond/apex
];

const DepositModal = dynamic(() => import("@/components/user-dashboard/wallet/DepositModal").then(mod => mod.DepositModal), {
  ssr: false,
});

export function WeeklyGoal() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [highestDeposit, setHighestDeposit] = useState(0);
  const [dailyTarget, setDailyTarget] = useState(0);
  const [achievedToday, setAchievedToday] = useState(0);

  useEffect(() => {
    async function fetchHighestDeposit() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id);
        
        let maxDeposit = 0;
        if (txData) {
          maxDeposit = txData
            .filter((tx: any) => tx.type?.toLowerCase() === 'deposit' || (tx.metadata?.description || "").toLowerCase().includes('deposit') || (tx.description || "").toLowerCase().includes('deposit'))
            .reduce((max: number, tx: any) => Math.max(max, Number(tx.amount)), 0);
          setHighestDeposit(maxDeposit);
        }

        const currentRankIndex = Math.max(0, ranksConfig.findLastIndex(r => maxDeposit >= r.threshold));
        const userRank = ranksConfig[currentRankIndex].id;

        // Fetch ALL Active tasks for this user's plan
        const { data: activeTasks } = await supabase
          .from("tasks")
          .select("id, reward_amount")
          .eq("status", "Active")
          .in("target_plan", ["All", userRank, "all"]);
        
        // Fetch ALL user submissions
        const { data: allSubmissions } = await supabase
          .from("task_submissions")
          .select("task_id, status, created_at")
          .eq("user_id", user.id);

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        if (activeTasks) {
          // Identify tasks already done BEFORE today
          const doneBeforeTodayIds = new Set(
            (allSubmissions || [])
              .filter(sub => {
                const subDate = new Date(sub.created_at);
                const isDone = sub.status === "Approved" || sub.status === "Pending Review";
                return isDone && subDate < startOfDay;
              })
              .map(sub => sub.task_id)
          );

          // Target is the sum of all active tasks that were NOT completed before today
          const targetSum = activeTasks
            .filter((task: any) => !doneBeforeTodayIds.has(task.id))
            .reduce((sum: number, task: any) => sum + Number(task.reward_amount || 0), 0);
          setDailyTarget(targetSum);
        }

        // Fetch Achieved Today (Sum of reward_amount for tasks submitted today)
        if (allSubmissions) {
          // We can just filter the submissions we already fetched!
          const achievedSum = allSubmissions
            .filter(sub => {
              const subDate = new Date(sub.created_at);
              const isDone = sub.status === "Approved" || sub.status === "Pending Review";
              return isDone && subDate >= startOfDay;
            })
            .reduce((sum: number, sub: any) => {
              // Look up the reward amount from the activeTasks pool
              const taskRef = activeTasks?.find((t: any) => t.id === sub.task_id);
              const reward = taskRef ? Number(taskRef.reward_amount) : 0;
              return sum + reward;
            }, 0);
          setAchievedToday(achievedSum);
        }
      }
    }
    fetchHighestDeposit();
  }, []);

  const handleDeposit = (amount: number, method: string) => {
    toast.success(`Successfully upgraded plan with ₦${amount.toLocaleString()}!`);
    setIsUpgradeModalOpen(false);
  };
  const progressPercentage = dailyTarget > 0 ? Math.min(100, Math.round((achievedToday / dailyTarget) * 100)) : 0;
  const dashoffset = 251.3 - (251.3 * progressPercentage) / 100;

  return (
    <Card className="p-3.5 border border-gray-100 shadow-sm rounded-xl mb-4">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Daily Goal</h3>
      
      {/* Circular Progress */}
      <div className="relative flex justify-center mb-4">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
          <circle 
            cx="48" cy="48" r="40" fill="transparent" stroke="#0f8538" strokeWidth="8" 
            strokeDasharray="251.3" strokeDashoffset={dashoffset} strokeLinecap="round" 
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#0f8538]">{progressPercentage}%</span>
          <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">Goal</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Target:</span>
          <span className="font-bold text-gray-900">₦{dailyTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">Achieved:</span>
          <span className="font-bold text-[#0f8538]">₦{achievedToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
