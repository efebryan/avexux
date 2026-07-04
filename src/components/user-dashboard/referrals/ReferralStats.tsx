import { Card } from "@/components/ui/card";
import { Users, UserCheck, Coins } from "lucide-react";

interface ReferralStatsProps {
  totalReferrals: number;
  activeReferrals: number;
  referralEarnings: number;
}

export function ReferralStats({ totalReferrals, activeReferrals, referralEarnings }: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
      {/* Total Referrals */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Total Referrals</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">{totalReferrals.toLocaleString()}</p>
      </Card>

      {/* Active Referrals */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-green-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#ade5bb]/40 flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-[#0f8538]" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Active Referrals</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">{activeReferrals.toLocaleString()}</p>
      </Card>

      {/* Referral Earnings */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-yellow-200 transition-colors flex flex-col justify-center bg-[#f8fafc]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Coins className="w-4 h-4 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Referral Earnings</h3>
        </div>
        <p className="text-lg font-bold text-[#0f8538]">₦{referralEarnings.toLocaleString()}</p>
      </Card>
    </div>
  );
}
