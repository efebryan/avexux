"use client";

import { useState, useEffect } from "react";
import { ReferralStats } from "@/components/user-dashboard/referrals/ReferralStats";
import { InviteCard } from "@/components/user-dashboard/referrals/InviteCard";
import { ReferralLeaderboard } from "@/components/user-dashboard/referrals/ReferralLeaderboard";
import { MyReferralsTable } from "@/components/user-dashboard/referrals/MyReferralsTable";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

// Mock Data for Leaderboard (Requires a backend view or RPC to aggregate total invites efficiently)
const mockLeaders = [
  { rank: 1, username: "CryptoKing99", totalInvites: 450, earnings: 125000 },
  { rank: 2, username: "SarahTasks", totalInvites: 320, earnings: 85000 },
  { rank: 3, username: "Mike_Hustle", totalInvites: 280, earnings: 62000 },
  { rank: 4, username: "EarnWithMe", totalInvites: 150, earnings: 30000 },
  { rank: 5, username: "JohnDoe22", totalInvites: 95, earnings: 15000 },
];

export default function ReferralsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userReferralCode, setUserReferralCode] = useState("");
  const [myReferrals, setMyReferrals] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    referralEarnings: 0,
  });

  const supabase = createClient();

  useEffect(() => {
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
        <p className="text-gray-500">Invite friends and earn a 5% commission on their tasks for life.</p>
      </div>

      <ReferralStats 
        totalReferrals={stats.totalReferrals}
        activeReferrals={stats.activeReferrals}
        referralEarnings={stats.referralEarnings}
      />

      <InviteCard referralCode={userReferralCode} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MyReferralsTable referrals={myReferrals} />
        <ReferralLeaderboard leaders={mockLeaders} />
      </div>
    </div>
  );
}
