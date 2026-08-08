"use client";

import { useState, useEffect } from "react";
import { ReferralStats } from "@/components/user-dashboard/referrals/ReferralStats";
import { InviteCard } from "@/components/user-dashboard/referrals/InviteCard";
import { ReferralLeaderboard } from "@/components/user-dashboard/referrals/ReferralLeaderboard";
import { MyReferralsTable } from "@/components/user-dashboard/referrals/MyReferralsTable";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export default function ReferralsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userReferralCode, setUserReferralCode] = useState("");
  const [myReferrals, setMyReferrals] = useState<any[]>([]);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [commissionText, setCommissionText] = useState("earn commission on their tasks for life");
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    referralEarnings: 0,
  });

  useEffect(() => {
    const supabase = createClient();

    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // 1. Fetch user's referral code
      const { data: profile } = await supabase
        .from("profiles")
        .select("referral_code")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        setUserReferralCode(profile.referral_code);
      }

      // 2. Fetch users who were referred by this user using the referrals table
      const { data: referralsData } = await supabase
        .from("referrals")
        .select(`
          id,
          status,
          commission_earned,
          created_at,
          referred:profiles!referred_id(full_name)
        `)
        .eq("referrer_id", user.id);

      if (referralsData) {
        const formattedReferrals = referralsData.map((ref: any) => ({
          id: ref.id,
          username: ref.referred?.full_name || "Unknown User",
          dateJoined: new Date(ref.created_at).toLocaleDateString(),
          status: ref.status === "Active" ? "Active" : "Inactive",
          earned: Number(ref.commission_earned || 0),
        }));

        setMyReferrals(formattedReferrals);

        setStats({
          totalReferrals: formattedReferrals.length,
          activeReferrals: formattedReferrals.filter(r => r.status === "Active").length,
          referralEarnings: formattedReferrals.reduce((sum, r) => sum + r.earned, 0),
        });
      }

      // 3. Fetch commission config for display text
      const { data: commConfig } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "referral_commission_config")
        .single();

      if (commConfig?.value) {
        const levels = commConfig.value.levels || commConfig.value;
        if (Array.isArray(levels) && levels.length > 0) {
          const pct = levels[0].percentage || levels[0];
          if (typeof pct === "number") {
            setCommissionText(`earn a ${pct}% commission on their tasks for life`);
          }
        } else if (typeof commConfig.value.percentage === "number") {
          setCommissionText(`earn a ${commConfig.value.percentage}% commission on their tasks for life`);
        }
      }

      // 4. Fetch top referrers for leaderboard
      const { data: topReferrers } = await supabase
        .from("referrals")
        .select(`
          referrer_id,
          commission_earned,
          referrer:profiles!referrer_id(full_name)
        `);

      if (topReferrers && topReferrers.length > 0) {
        // Aggregate by referrer
        const aggregated = new Map<string, { name: string; totalInvites: number; earnings: number }>();
        topReferrers.forEach((r: any) => {
          const existing = aggregated.get(r.referrer_id);
          const name = r.referrer?.full_name || "Unknown User";
          if (existing) {
            existing.totalInvites += 1;
            existing.earnings += Number(r.commission_earned || 0);
          } else {
            aggregated.set(r.referrer_id, {
              name,
              totalInvites: 1,
              earnings: Number(r.commission_earned || 0),
            });
          }
        });

        const sorted = Array.from(aggregated.values())
          .sort((a, b) => b.totalInvites - a.totalInvites)
          .slice(0, 5)
          .map((item, idx) => ({
            rank: idx + 1,
            username: item.name,
            totalInvites: item.totalInvites,
            earnings: item.earnings,
          }));

        setLeaders(sorted);
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0f8538]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Program</h1>
        <p className="text-gray-500">Invite friends and {commissionText}.</p>
      </div>

      <ReferralStats 
        totalReferrals={stats.totalReferrals}
        activeReferrals={stats.activeReferrals}
        referralEarnings={stats.referralEarnings}
      />

      <InviteCard referralCode={userReferralCode} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MyReferralsTable referrals={myReferrals} />
        <ReferralLeaderboard leaders={leaders.length > 0 ? leaders : []} />
      </div>
    </div>
  );
}

