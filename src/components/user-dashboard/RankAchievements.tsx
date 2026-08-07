"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  Medal,
  Crown,
  ShieldCheck,
  Lock,
  Gem,
  Flame,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const ranksConfig = [
  {
    id: "bronze",
    name: "Bronze Starter",
    level: "Tier 1",
    threshold: 0,
    icon: <Medal className="w-4 h-4 text-amber-700" />,
    colors: {
      unlocked: {
        bg: "bg-amber-100/60 border-amber-200",
        text: "text-amber-900",
      },
      current: {
        bg: "bg-amber-50 border-amber-300 ring-2 ring-amber-400/20",
        text: "text-amber-900",
      },
    },
  },
  {
    id: "silver",
    name: "Silver Earner",
    level: "Tier 2",
    threshold: 18000,
    icon: <ShieldCheck className="w-4 h-4 text-slate-500" />,
    colors: {
      unlocked: { bg: "bg-slate-100 border-slate-200", text: "text-slate-700" },
      current: {
        bg: "bg-slate-50 border-slate-300 ring-2 ring-slate-400/20",
        text: "text-slate-800",
      },
    },
  },

  {
    id: "gold",
    name: "Gold Master",
    level: "Tier 3",
    threshold: 42000,
    icon: <Crown className="w-4 h-4 text-amber-500" />,
    colors: {
      unlocked: { bg: "bg-amber-50 border-amber-200", text: "text-amber-900" },
      current: {
        bg: "bg-amber-50 border-amber-300 ring-2 ring-amber-400/20",
        text: "text-amber-900",
      },
    },
  },
  {
    id: "platinum",
    name: "Platinum Pro",
    level: "Tier 4",
    threshold: 88000,
    icon: <Trophy className="w-4 h-4 text-cyan-500" />,
    colors: {
      unlocked: { bg: "bg-cyan-50 border-cyan-200", text: "text-cyan-800" },
      current: {
        bg: "bg-cyan-50 border-cyan-300 ring-2 ring-cyan-400/20",
        text: "text-cyan-900",
      },
    },
  },
];

export function RankAchievements() {
  const [highestDeposit, setHighestDeposit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHighestDeposit() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id);

        if (txData) {
          const maxDeposit = txData
            .filter(
              (tx: any) =>
                tx.type?.toLowerCase() === "deposit" ||
                (tx.metadata?.description || "")
                  .toLowerCase()
                  .includes("deposit") ||
                (tx.description || "").toLowerCase().includes("deposit"),
            )
            .reduce(
              (max: number, tx: any) => Math.max(max, Number(tx.amount)),
              0,
            );
          setHighestDeposit(maxDeposit);
        }
      }
      setIsLoading(false);
    }
    fetchHighestDeposit();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-4 border border-gray-100 shadow-sm rounded-2xl mb-6 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-20 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </Card>
    );
  }

  const hasDeposited = highestDeposit > 0;
  
  const currentRankIndex = hasDeposited
    ? Math.max(0, ranksConfig.findLastIndex((r) => highestDeposit >= r.threshold))
    : -1;

  const currentRankName = hasDeposited
    ? ranksConfig[currentRankIndex].name.split(" ")[0] + " Level"
    : "Unranked";

  return (
    <Card className="p-4 border border-gray-100 shadow-sm rounded-2xl mb-6 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-[#2faf2f]" />
          Rank Achievements (4 Tiers)
        </h3>
        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide ${
          hasDeposited ? "bg-[#e6f7e6] text-[#2faf2f]" : "bg-gray-100 text-gray-500"
        }`}>
          {currentRankName}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {ranksConfig.map((rank, index) => {
          let status: "unlocked" | "current" | "locked" = "locked";
          if (hasDeposited) {
            if (index < currentRankIndex) status = "unlocked";
            if (index === currentRankIndex) status = "current";
          }

          const bgColor =
            status === "locked"
              ? "bg-gray-50 border-gray-100 opacity-60"
              : status === "unlocked"
              ? "bg-slate-50 border-slate-200 opacity-70"
              : rank.colors[status].bg;
          const textColor =
            status === "locked" 
              ? "text-gray-400" 
              : status === "unlocked"
              ? "text-slate-600"
              : rank.colors[status].text;

          return (
            <div
              key={rank.id}
              className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${bgColor}`}
            >
              <div className={`w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0 border border-black/5 ${status === "unlocked" ? "grayscale opacity-60" : ""}`}>
                {status === "locked" ? (
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  rank.icon
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-bold truncate ${textColor}`}>
                  {rank.name}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {status === "current" ? (
                    <span className="text-[#2faf2f] font-bold">
                      Current Rank
                    </span>
                  ) : status === "unlocked" ? (
                    <span className="text-gray-500">Unlocked ✓</span>
                  ) : (
                    <span>Locked</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// Export alias for backward compatibility if imported elsewhere
export { RankAchievements as RecentAchievements };
