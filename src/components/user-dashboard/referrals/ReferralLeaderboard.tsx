import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalInvites: number;
  earnings: number;
}

export function ReferralLeaderboard({ leaders }: { leaders: LeaderboardEntry[] }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-700" />;
      default: return <span className="font-bold text-gray-400 w-5 text-center">{rank}</span>;
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-3.5 border-b border-gray-100 bg-[#f8fafc]">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#0f8538]" /> Monthly Leaderboard
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Top referrers this month. Can you make it to the top?</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-4 py-2.5">Rank</th>
              <th className="px-4 py-2.5">User</th>
              <th className="px-4 py-2.5 text-center">Invites</th>
              <th className="px-4 py-2.5 text-right">Est. Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leaders.map((leader) => (
              <tr key={leader.rank} className={`hover:bg-gray-50/50 transition-colors ${leader.rank <= 3 ? "bg-yellow-50/20" : ""}`}>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${leader.rank <= 3 ? "bg-white shadow-sm border border-yellow-100" : ""}`}>
                    {getRankIcon(leader.rank)}
                  </div>
                </td>
                <td className="px-4 py-2.5 font-bold text-gray-900">{leader.username}</td>
                <td className="px-4 py-2.5 text-center font-medium text-gray-600">{leader.totalInvites}</td>
                <td className="px-4 py-2.5 text-right font-bold text-[#0f8538]">
                  ₦{leader.earnings.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
