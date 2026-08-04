"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Medal, Crown, ShieldCheck, Lock, Gem, Flame } from "lucide-react";

interface RankItem {
  id: string;
  name: string;
  level: string;
  icon: React.ReactNode;
  status: "unlocked" | "current" | "locked";
  bgColor: string;
  textColor: string;
}

const rankList: RankItem[] = [
  {
    id: "bronze",
    name: "Bronze Starter",
    level: "Tier 1",
    icon: <Medal className="w-4 h-4 text-amber-700" />,
    status: "unlocked",
    bgColor: "bg-amber-100/60 border-amber-200",
    textColor: "text-amber-900",
  },
  {
    id: "silver",
    name: "Silver Earner",
    level: "Tier 2",
    icon: <ShieldCheck className="w-4 h-4 text-slate-500" />,
    status: "unlocked",
    bgColor: "bg-slate-100 border-slate-200",
    textColor: "text-slate-700",
  },
  {
    id: "gold",
    name: "Gold Master",
    level: "Tier 3",
    icon: <Crown className="w-4 h-4 text-amber-500" />,
    status: "current",
    bgColor: "bg-amber-50 border-amber-300 ring-2 ring-amber-400/20",
    textColor: "text-amber-900",
  },
  {
    id: "platinum",
    name: "Platinum Pro",
    level: "Tier 4",
    icon: <Trophy className="w-4 h-4 text-cyan-500" />,
    status: "locked",
    bgColor: "bg-gray-50 border-gray-100 opacity-60",
    textColor: "text-gray-400",
  },
  {
    id: "diamond",
    name: "Diamond Elite",
    level: "Tier 5",
    icon: <Gem className="w-4 h-4 text-indigo-500" />,
    status: "locked",
    bgColor: "bg-gray-50 border-gray-100 opacity-60",
    textColor: "text-gray-400",
  },
  {
    id: "apex",
    name: "Apex Legend",
    level: "Tier 6",
    icon: <Flame className="w-4 h-4 text-rose-500" />,
    status: "locked",
    bgColor: "bg-gray-50 border-gray-100 opacity-60",
    textColor: "text-gray-400",
  },
];

export function RankAchievements() {
  return (
    <Card className="p-4 border border-gray-100 shadow-sm rounded-2xl mb-6 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-[#2faf2f]" />
          Rank Achievements (6 Tiers)
        </h3>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#e6f7e6] text-[#2faf2f] uppercase tracking-wide">
          Gold Level
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {rankList.map((rank) => (
          <div
            key={rank.id}
            className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${rank.bgColor}`}
          >
            <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0 border border-black/5">
              {rank.status === "locked" ? (
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                rank.icon
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xs font-bold truncate ${rank.textColor}`}>
                {rank.name}
              </div>
              <div className="text-[10px] text-gray-400 font-medium">
                {rank.status === "current" ? (
                  <span className="text-[#2faf2f] font-bold">Current Rank</span>
                ) : rank.status === "unlocked" ? (
                  <span className="text-gray-500">Unlocked ✓</span>
                ) : (
                  <span>Locked</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Export alias for backward compatibility if imported elsewhere
export { RankAchievements as RecentAchievements };
