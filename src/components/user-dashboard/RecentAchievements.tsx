import { Card } from "@/components/ui/card";
import { Medal, Trophy, Star, ShieldCheck } from "lucide-react";

const achievements = [
  { icon: <Medal className="w-5 h-5 text-[#0f8538]" /> },
  { icon: <Trophy className="w-5 h-5 text-[#0f8538]" /> },
  { icon: <Star className="w-5 h-5 text-[#0f8538]" /> },
  { icon: <ShieldCheck className="w-5 h-5 text-gray-400" />, inactive: true },
];

export function RecentAchievements() {
  return (
    <Card className="p-6 border border-gray-100 shadow-sm rounded-2xl mb-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Recent Achievements</h3>
      <div className="flex gap-3">
        {achievements.map((item, i) => (
          <div 
            key={i} 
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
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
