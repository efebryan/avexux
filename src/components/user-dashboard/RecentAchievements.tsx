import { Card } from "@/components/ui/card";
import { Medal, Trophy, Star, ShieldCheck } from "lucide-react";

const achievements = [
  { icon: <Medal className="w-4 h-4 text-[#0f8538]" /> },
  { icon: <Trophy className="w-4 h-4 text-[#0f8538]" /> },
  { icon: <Star className="w-4 h-4 text-[#0f8538]" /> },
  { icon: <ShieldCheck className="w-4 h-4 text-gray-400" />, inactive: true },
];

export function RecentAchievements() {
  return (
    <Card className="p-3.5 border border-gray-100 shadow-sm rounded-xl mb-6">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Achievements</h3>
      <div className="flex gap-2">
        {achievements.map((item, i) => (
          <div 
            key={i} 
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              item.inactive ? "bg-gray-100" : "bg-[#ade5bb]/40"
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </Card>
  );
}
