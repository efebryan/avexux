"use client";

import { useState } from "react";
import { Search, UsersRound, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

// Mock Data
const mockReferrals = [
  { id: "1", referrer: "crypto_king", referred: "john_doe99", date: "Oct 24, 2023", earned: 2500, status: "Active" },
  { id: "2", referrer: "sarah_tasks", referred: "mike_hustle", date: "Oct 15, 2023", earned: 450, status: "Active" },
  { id: "3", referrer: "crypto_king", referred: "new_guy12", date: "Oct 25, 2023", earned: 0, status: "Inactive" },
];

const topReferrers = [
  { rank: 1, user: "crypto_king", count: 45, totalEarned: 45000 },
  { rank: 2, user: "sarah_tasks", count: 12, totalEarned: 8500 },
  { rank: 3, user: "mike_hustle", count: 1, totalEarned: 150 },
];

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState(mockReferrals);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReferrals = referrals.filter(r => 
    r.referrer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.referred.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Referral Network</h1>
          <p className="text-gray-500 text-sm">Monitor user referrals and commission payouts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaderboard Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 border border-orange-100 shadow-sm rounded-xl bg-orange-50/50">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                 <Award className="w-5 h-5" />
               </div>
               <div>
                 <h2 className="font-bold text-gray-900">Top Referrers</h2>
                 <p className="text-xs text-gray-500">Highest earning affiliates</p>
               </div>
             </div>
             <div className="space-y-3">
               {topReferrers.map((ref) => (
                 <div key={ref.rank} className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className={`font-bold text-sm ${ref.rank === 1 ? 'text-yellow-500' : ref.rank === 2 ? 'text-gray-400' : 'text-orange-400'}`}>
                       #{ref.rank}
                     </span>
                     <span className="font-bold text-gray-900 text-sm">{ref.user}</span>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-bold text-green-600">₦{ref.totalEarned.toLocaleString()}</p>
                     <p className="text-[10px] text-gray-500">{ref.count} invites</p>
                   </div>
                 </div>
               ))}
             </div>
          </Card>
        </div>

        {/* Main Referrals List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex items-center gap-3">
             <Search className="w-4 h-4 text-gray-400" />
             <input 
               type="text"
               placeholder="Search by referrer or referred user..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full text-sm focus:outline-none"
             />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Referrer</th>
                    <th className="px-6 py-4 font-semibold">Referred User</th>
                    <th className="px-6 py-4 font-semibold">Date Joined</th>
                    <th className="px-6 py-4 font-semibold">Commission</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredReferrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                        <UsersRound className="w-4 h-4 text-gray-400" /> {ref.referrer}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">{ref.referred}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{ref.date}</td>
                      <td className="px-6 py-4 font-bold text-green-600">
                        ₦{ref.earned.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                          ref.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredReferrals.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No referral records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
