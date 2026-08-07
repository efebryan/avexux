"use client";

import { useState, useEffect } from "react";
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
  LineChart,
  Loader2,
  Wallet,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const planLabels: Record<string, string> = {
  bronze: "Bronze Starter",
  silver: "Silver Earner",
  platinum: "Platinum Pro",
  diamond: "Diamond Elite",
};

export default function ReferralsPage() {
  const [recentPayouts, setRecentPayouts] = useState<any[]>([]);
  const [topReferrers, setTopReferrers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    totalPaidOut: 0,
    conversionRate: "0.0",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Commission Config State
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [commissionConfig, setCommissionConfig] = useState<
    Record<string, number>
  >({
    bronze: 0,
    silver: 1000,
    platinum: 4500,
    diamond: 7500,
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("referrals")
        .select(
          `
          id, 
          commission_earned, 
          status, 
          created_at,
          referrer:profiles!referrer_id(id, full_name),
          referred:profiles!referred_id(id, full_name, email)
        `,
        )
        .order("created_at", { ascending: false });

      // Fetch Commission Config
      const { data: configData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "referral_commission_config")
        .single();

      if (configData?.value) {
        setCommissionConfig(configData.value);
      }

      if (!error && data) {
        // Fetch DEPOSIT transactions to find active subscribers
        const { data: deposits } = await supabase
          .from("transactions")
          .select("user_id")
          .eq("type", "DEPOSIT")
          .eq("status", "Completed");

        const activeSubscribers = new Set(
          deposits?.map((d: any) => d.user_id) || [],
        );

        // Count active referrals
        let activeReferralsCount = 0;
        data.forEach((r: any) => {
          if (r.referred?.id && activeSubscribers.has(r.referred.id)) {
            activeReferralsCount++;
          }
        });

        // Calculate conversion rate
        const conversionRate =
          data.length > 0
            ? ((activeReferralsCount / data.length) * 100).toFixed(1)
            : "0.0";

        // Fetch REFERRAL_BONUS transactions to calculate total paid out
        const { data: payouts } = await supabase
          .from("transactions")
          .select("amount")
          .eq("type", "REFERRAL_BONUS")
          .eq("status", "Completed");

        const totalPaidOutAmt =
          payouts?.reduce(
            (sum: number, tx: any) => sum + Number(tx.amount || 0),
            0,
          ) || 0;

        setStats({
          totalReferrals: data.length,
          activeReferrals: activeReferralsCount,
          totalEarnings: data.reduce(
            (sum: number, r: any) => sum + Number(r.commission_earned || 0),
            0,
          ),
          totalPaidOut: totalPaidOutAmt,
          conversionRate: conversionRate,
        });

        // All Referrals List
        const recent = data.map((r: any) => {
          const name = r.referrer?.full_name || "Unknown";
          const nameParts = name.split(" ");
          const initials =
            nameParts.length > 1
              ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
              : name.substring(0, 2).toUpperCase();

          const shortId = r.id.split("-")[0].toUpperCase();

          return {
            id: `#REF-${shortId}`,
            referrer: name,
            initials: initials,
            color: "bg-emerald-100 text-emerald-700",
            newUser: r.referred?.email || "unknown@mail.com",
            amount: `₦${Number(r.commission_earned || 0).toLocaleString()}`,
            date:
              new Date(r.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }) +
              ", " +
              new Date(r.created_at).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            status: r.status,
            statusColor:
              r.status === "Active" || r.status === "Completed"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            dotColor:
              r.status === "Active" || r.status === "Completed"
                ? "bg-emerald-500"
                : "bg-amber-500",
          };
        });
        setRecentPayouts(recent);

        // Top Referrers
        const referrerMap = new Map();
        data.forEach((r: any) => {
          const refId = r.referrer?.id;
          if (!refId) return;
          if (!referrerMap.has(refId)) {
            referrerMap.set(refId, {
              name: r.referrer?.full_name || "Unknown",
              earnings: 0,
              referrals: 0,
            });
          }
          const refData = referrerMap.get(refId);
          refData.earnings += Number(r.commission_earned || 0);
          refData.referrals += 1;
        });

        const top = Array.from(referrerMap.values())
          .sort((a, b) => b.earnings - a.earnings)
          .slice(0, 10)
          .map((t, index) => ({
            rank: index + 1,
            name: t.name,
            img: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=E2E8F0&color=333`,
            conversion: "N/A",
            earnings: `₦${t.earnings.toLocaleString()}`,
            referrals: t.referrals,
          }));

        setTopReferrers(top);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleSaveCommissionConfig = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: "referral_commission_config", value: commissionConfig });

    if (error) {
      toast.error(`Failed to save config: ${error.message}`);
    } else {
      toast.success("Referral commission configuration saved!");
      setCommissionModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">
            Referrals Management
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor, manage, and optimize your network's growth and payouts.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 flex shadow-sm h-11"
          >
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export Referral Data
          </Button>
          <Button
            onClick={() => setCommissionModalOpen(true)}
            variant="outline"
            className="bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 rounded-lg px-4 flex shadow-sm h-11"
          >
            <Settings className="w-4 h-4 mr-2 text-slate-500" />
            Adjust Referral Commission
          </Button>
        </div>
      </div>

      {/* Five Cards Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Users className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">
              Total Referrals
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalReferrals.toLocaleString()}
            </h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Activity className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">
              Active Referrals
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.activeReferrals.toLocaleString()}
            </h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <LineChart className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">
              Conversion Rate
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.conversionRate}%
            </h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Banknote className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">
              Total Referral Earnings
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ₦{stats.totalEarnings.toLocaleString()}
            </h3>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Wallet className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-medium mb-1">
              Total Paid Out Referral
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ₦{stats.totalPaidOut.toLocaleString()}
            </h3>
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
                <h2 className="font-bold text-lg text-slate-900 tracking-tight">
                  Network Growth Trends
                </h2>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Total referrals tracked over the last 30 days
                </p>
              </div>
              <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 rounded-md">
                  7D
                </button>
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded-md shadow-sm">
                  30D
                </button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 rounded-md">
                  90D
                </button>
              </div>
            </div>

            {/* SVG Line Chart */}
            <div className="w-full h-[220px] relative overflow-x-auto scrollbar-hide">
              <div className="min-w-[500px] h-full relative">
                {/* Tooltip */}
                <div className="absolute left-[15%] top-0 bg-white border border-slate-100 shadow-lg rounded-xl p-3 z-10 hidden md:block">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">
                    NOV 24, 2023
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 leading-tight">
                    412 Referrals
                  </p>
                  <p className="text-[11px] font-bold text-green-500 mt-0.5">
                    +24% vs. LW
                  </p>
                </div>

                <svg
                  viewBox="0 0 800 200"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  {/* Horizontal Grid Lines */}
                  <line
                    x1="0"
                    y1="40"
                    x2="800"
                    y2="40"
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="90"
                    x2="800"
                    y2="90"
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="140"
                    x2="800"
                    y2="140"
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="190"
                    x2="800"
                    y2="190"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />

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
                  <circle
                    cx="800"
                    cy="30"
                    r="4"
                    fill="#fff"
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </Card>

          {/* Recent Referral Payouts Table */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">
                Recent Referrals
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-slate-400 uppercase bg-transparent font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">REF ID</th>
                    <th className="px-6 py-4">REFERRER</th>
                    <th className="px-6 py-4">NEW USER</th>
                    <th className="px-6 py-4">AMOUNT</th>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70 border-t border-slate-100">
                  {recentPayouts.length > 0 ? (
                    recentPayouts
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage,
                      )
                      .map((txn, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="text-[13px] text-green-600 font-medium">
                              {txn.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${txn.color}`}
                              >
                                {txn.initials}
                              </div>
                              <span className="font-bold text-slate-900 text-[13px]">
                                {txn.referrer}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-600 text-[13px]">
                              {txn.newUser}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 text-[13px]">
                              {txn.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-slate-600 text-[13px]">
                                {txn.date.split(",")[0]}
                              </span>
                              <span className="text-slate-400 text-[11px]">
                                {txn.date.split(",")[1]}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${txn.statusColor}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${txn.dotColor}`}
                              ></span>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-slate-500 font-medium"
                      >
                        No referrals found yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {recentPayouts.length > itemsPerPage && (
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-slate-500 font-medium">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-slate-700">
                    {Math.min(currentPage * itemsPerPage, recentPayouts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700">
                    {recentPayouts.length}
                  </span>{" "}
                  entries
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-bold text-xs">
                    {currentPage}
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={
                      currentPage * itemsPerPage >= recentPayouts.length
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Span 1 */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Tier Distribution */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
            <h2 className="font-bold text-lg text-slate-900 tracking-tight mb-6">
              Tier Distribution
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">
                    Tier 1 (Diamond)
                  </span>
                  <span className="text-sm font-bold text-green-600">12%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "12%" }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  High-volume partners (50+ referrals)
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">
                    Tier 2 (Gold)
                  </span>
                  <span className="text-sm font-bold text-amber-500">34%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: "34%" }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Steady growth (10-49 referrals)
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900">
                    Tier 3 (Silver)
                  </span>
                  <span className="text-sm font-bold text-indigo-500">54%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: "54%" }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Standard users (1-9 referrals)
                </p>
              </div>
            </div>
          </Card>

          {/* Top Referrers */}
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden flex flex-col">
            <div className="p-6 pb-4">
              <h2 className="font-bold text-lg text-slate-900 tracking-tight">
                Top Referrers
              </h2>
            </div>

            <div className="flex-1 px-6 space-y-5">
              {topReferrers.length > 0 ? (
                topReferrers.map((user) => (
                  <div
                    key={user.rank}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <img
                            src={user.img}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                          {user.rank}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-slate-900">
                          {user.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                          Conversion:{" "}
                          <span className="font-bold text-slate-700">
                            {user.conversion}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[13px] text-green-600 block">
                        {user.earnings}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {user.referrals} Referrals
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 font-medium py-6 text-sm">
                  No referrers yet.
                </div>
              )}
            </div>

            <div className="p-4 mt-2">
              <Button
                variant="outline"
                className="w-full h-10 text-xs font-bold text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-lg"
              >
                View Full Leaderboard
              </Button>
            </div>
          </Card>

          {/* Partner Campaign Widget */}
          <Card className="border-0 shadow-sm rounded-xl bg-[#005c0a] text-white p-6 relative overflow-hidden">
            {/* Decorative subtle pattern */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-lg tracking-tight mb-2">
                Partner Campaign
              </h3>
              <p className="text-sm text-green-100 font-medium mb-5 leading-relaxed">
                Launch a new double-reward weekend to boost referral rates by up
                to 25%.
              </p>
              <Button className="bg-white text-green-800 hover:bg-slate-100 font-bold h-10 px-5 text-xs rounded-lg shadow-sm">
                Launch Campaign
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Adjust Referral Commission Modal */}
      <Dialog open={commissionModalOpen} onOpenChange={setCommissionModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Referral Commissions
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Set the monetary amount a referrer receives when their invited user
            deposits and enters a specific plan.
          </DialogDescription>

          <div className="space-y-4 py-4">
            {Object.keys(commissionConfig).map((plan) => (
              <div key={plan} className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">
                  {planLabels[plan] || plan}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₦
                  </span>
                  <Input
                    type="number"
                    value={commissionConfig[plan]}
                    onChange={(e) =>
                      setCommissionConfig({
                        ...commissionConfig,
                        [plan]: Number(e.target.value),
                      })
                    }
                    className="pl-8 rounded-xl bg-gray-50 border-gray-200"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setCommissionModalOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCommissionConfig}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
            >
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
