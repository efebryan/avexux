"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Settings, 
  Users, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Banknote,
  LineChart
} from "lucide-react";

// Mock Data
const recentPayouts = [
  {
    id: "#TXN-88210",
    referrer: "Babatunde O.",
    initials: "BO",
    color: "bg-emerald-100 text-emerald-700",
    newUser: "chidi.e@mail.com",
    amount: "₦12,500.00",
    date: "Dec 01, 2023",
    status: "Completed",
    statusColor: "bg-emerald-50 text-emerald-700",
    dotColor: "bg-emerald-500"
  },
  {
    id: "#TXN-88195",
    referrer: "Amina M.",
    initials: "AM",
    color: "bg-slate-100 text-slate-700",
    newUser: "sarah.jones@web.co",
    amount: "₦8,200.00",
    date: "Nov 30, 2023",
    status: "Pending",
    statusColor: "bg-amber-50 text-amber-700",
    dotColor: "bg-amber-500"
  },
  {
    id: "#TXN-88188",
    referrer: "Kelechi U.",
    initials: "KU",
    color: "bg-indigo-100 text-indigo-700",
    newUser: "fola.williams@biz.ng",
    amount: "₦15,000.00",
    date: "Nov 29, 2023",
    status: "Completed",
    statusColor: "bg-emerald-50 text-emerald-700",
    dotColor: "bg-emerald-500"
  }
];

const topReferrers = [
  {
    rank: 1,
    name: "Obi Nwosu",
    img: "https://ui-avatars.com/api/?name=Obi+Nwosu&background=E2E8F0&color=333",
    conversion: "18.4%",
    earnings: "₦842K",
    referrals: 142
  },
  {
    rank: 2,
    name: "Adebayo S.",
    img: "https://ui-avatars.com/api/?name=Adebayo+S&background=E2E8F0&color=333",
    conversion: "15.2%",
    earnings: "₦610K",
    referrals: 98
  },
  {
    rank: 3,
    name: "Fatima K.",
    img: "https://ui-avatars.com/api/?name=Fatima+K&background=E2E8F0&color=333",
    conversion: "14.8%",
    earnings: "₦525K",
    referrals: 84
  }
];

export default function ReferralsPage() {
  return (
    <div className="space-y-6 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">Referrals Management</h1>
          <p className="text-slate-500 text-sm">Monitor, manage, and optimize your network's growth and payouts.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 flex shadow-sm h-11">
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export Referral Data
          </Button>
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 flex shadow-sm h-11">
            <Settings className="w-4 h-4 mr-2 text-slate-500" />
            Adjust Referral Commission
          </Button>
        </div>
      </div>

      {/* Four Cards Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Users className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="text-green-600 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +12%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">Total Referrals</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">8,432</h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Activity className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="text-green-600 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +5.4%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">Active Affiliates</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">1,240</h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <LineChart className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="text-rose-500 text-xs font-bold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" strokeWidth={3} /> -0.8%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">Conversion Rate</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">12.4%</h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Banknote className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="text-green-600 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> +18%
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">Total Referral Payouts</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">₦4.2M</h3>
          </div>
        </Card>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Span 2 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Network Growth Trends Chart */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bold text-lg text-slate-900 tracking-tight">Network Growth Trends</h2>
                <p className="text-[13px] text-slate-500 mt-0.5">Total referrals tracked over the last 30 days</p>
              </div>
              <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 rounded-md">7D</button>
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded-md shadow-sm">30D</button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 rounded-md">90D</button>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="w-full h-[220px] relative overflow-x-auto scrollbar-hide">
              <div className="min-w-[500px] h-full relative">
              
              {/* Tooltip */}
              <div className="absolute left-[15%] top-0 bg-white border border-slate-100 shadow-lg rounded-xl p-3 z-10 hidden md:block">
                <p className="text-[10px] font-bold text-slate-400 mb-1">NOV 24, 2023</p>
                <p className="text-sm font-extrabold text-slate-900 leading-tight">412 Referrals</p>
                <p className="text-[11px] font-bold text-green-500 mt-0.5">+24% vs. LW</p>
              </div>
              
              <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                
                {/* Horizontal Grid Lines */}
                <line x1="0" y1="40" x2="800" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1.5" />
                <line x1="0" y1="90" x2="800" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1.5" />
                <line x1="0" y1="140" x2="800" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1.5" />
                <line x1="0" y1="190" x2="800" y2="190" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Line Path */}
                <path 
                  d="M 0,160 L 100,130 L 200,140 L 300,100 L 400,90 L 500,110 L 600,60 L 700,65 L 800,30" 
                  fill="none" 
                  stroke="#16a34a" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="0" cy="160" r="3" fill="#16a34a" />
                <circle cx="100" cy="130" r="3" fill="#16a34a" />
                <circle cx="200" cy="140" r="3" fill="#16a34a" />
                <circle cx="300" cy="100" r="3" fill="#16a34a" />
                <circle cx="400" cy="90" r="3" fill="#16a34a" />
                <circle cx="500" cy="110" r="3" fill="#16a34a" />
                <circle cx="600" cy="60" r="3" fill="#16a34a" />
                <circle cx="700" cy="65" r="3" fill="#16a34a" />
                <circle cx="800" cy="30" r="4" fill="#fff" stroke="#16a34a" strokeWidth="2" />
              </svg>
              </div>
            </div>
          </Card>

          {/* Recent Referral Payouts Table */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">Recent Referral Payouts</h2>
              <button className="text-[13px] font-bold text-green-600 hover:text-green-700 transition-colors">
                View All Transactions
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-slate-400 uppercase bg-transparent font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">TRANSACTION ID</th>
                    <th className="px-6 py-4">REFERRER</th>
                    <th className="px-6 py-4">NEW USER</th>
                    <th className="px-6 py-4">AMOUNT</th>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70 border-t border-slate-100">
                  {recentPayouts.map((txn, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-green-600 font-medium">{txn.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${txn.color}`}>
                            {txn.initials}
                          </div>
                          <span className="font-bold text-slate-900 text-[13px]">{txn.referrer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-[13px]">{txn.newUser}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 text-[13px]">{txn.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-600 text-[13px]">{txn.date.split(',')[0]}</span>
                          <span className="text-slate-400 text-[11px]">{txn.date.split(',')[1]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${txn.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${txn.dotColor}`}></span>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
        </div>

        {/* Right Column - Span 1 */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Tier Distribution */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
            <h2 className="font-bold text-lg text-slate-900 tracking-tight mb-6">Tier Distribution</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">Tier 1 (Diamond)</span>
                  <span className="text-sm font-bold text-green-600">12%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '12%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">High-volume partners (50+ referrals)</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">Tier 2 (Gold)</span>
                  <span className="text-sm font-bold text-amber-500">34%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '34%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Steady growth (10-49 referrals)</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">Tier 3 (Silver)</span>
                  <span className="text-sm font-bold text-indigo-500">54%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '54%' }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Standard users (1-9 referrals)</p>
              </div>
            </div>
          </Card>

          {/* Top Referrers */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden flex flex-col">
            <div className="p-6 pb-4">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">Top Referrers</h2>
            </div>
            
            <div className="flex-1 px-6 space-y-5">
              {topReferrers.map((user) => (
                <div key={user.rank} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                        {user.rank}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-slate-900">{user.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        Conversion: <span className="font-bold text-slate-700">{user.conversion}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[13px] text-green-600 block">{user.earnings}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{user.referrals} Referrals</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 mt-2">
              <Button variant="outline" className="w-full h-10 text-xs font-bold text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-lg">
                View Full Leaderboard
              </Button>
            </div>
          </Card>

          {/* Partner Campaign Widget */}
          <Card className="border-0 shadow-sm rounded-xl bg-[#005c0a] text-white p-6 relative overflow-hidden">
            {/* Decorative subtle pattern */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-lg tracking-tight mb-2">Partner Campaign</h3>
              <p className="text-sm text-green-100 font-medium mb-5 leading-relaxed">
                Launch a new double-reward weekend to boost referral rates by up to 25%.
              </p>
              <Button className="bg-white text-green-800 hover:bg-slate-100 font-bold h-10 px-5 text-xs rounded-lg shadow-sm">
                Launch Campaign
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
