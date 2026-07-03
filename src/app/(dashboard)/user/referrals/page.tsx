"use client";

import { ReferralStats } from "@/components/user-dashboard/referrals/ReferralStats";
import { InviteCard } from "@/components/user-dashboard/referrals/InviteCard";
import { ReferralLeaderboard } from "@/components/user-dashboard/referrals/ReferralLeaderboard";
import { MyReferralsTable } from "@/components/user-dashboard/referrals/MyReferralsTable";

// Mock Data
const mockLeaders = [
  { rank: 1, username: "CryptoKing99", totalInvites: 450, earnings: 125000 },
  { rank: 2, username: "SarahTasks", totalInvites: 320, earnings: 85000 },
  { rank: 3, username: "Mike_Hustle", totalInvites: 280, earnings: 62000 },
  { rank: 4, username: "EarnWithMe", totalInvites: 150, earnings: 30000 },
  { rank: 5, username: "JohnDoe22", totalInvites: 95, earnings: 15000 },
];

const mockMyReferrals = [
  { id: "1", username: "Alex123", dateJoined: "Oct 20, 2023", status: "Active" as const, earned: 250 },
  { id: "2", username: "DevNerd", dateJoined: "Oct 18, 2023", status: "Active" as const, earned: 150 },
  { id: "3", username: "BusyBee", dateJoined: "Oct 15, 2023", status: "Inactive" as const, earned: 0 },
  { id: "4", username: "CryptoFan", dateJoined: "Oct 10, 2023", status: "Active" as const, earned: 100 },
];

export default function ReferralsPage() {
  const userReferralCode = "bryan123";
  const totalReferrals = 4;
  const activeReferrals = 3;
  const referralEarnings = 500;

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Program</h1>
        <p className="text-gray-500">Invite friends and earn a 5% commission on their tasks for life.</p>
      </div>

      <ReferralStats 
        totalReferrals={totalReferrals}
        activeReferrals={activeReferrals}
        referralEarnings={referralEarnings}
      />

      <InviteCard referralCode={userReferralCode} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MyReferralsTable referrals={mockMyReferrals} />
        <ReferralLeaderboard leaders={mockLeaders} />
      </div>
    </div>
  );
}
