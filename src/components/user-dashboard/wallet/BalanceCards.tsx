import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Clock, Gift, Users, ArrowRight } from "lucide-react";

interface BalanceCardsProps {
  availableBalance: number;
  pendingBalance: number;
  bonusEarnings: number;
  referralEarnings: number;
  onWithdrawClick: () => void;
}

export function BalanceCards({
  availableBalance,
  pendingBalance,
  bonusEarnings,
  referralEarnings,
  onWithdrawClick
}: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Available Balance (Featured) */}
      <Card className="p-6 rounded-3xl border-0 shadow-lg bg-[#0f8538] text-white flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-green-200" />
            <h3 className="text-green-100 font-medium text-sm">Available Balance</h3>
          </div>
          <p className="text-3xl font-bold mb-6">₦{availableBalance.toLocaleString()}</p>
        </div>
        <Button 
          onClick={onWithdrawClick}
          className="relative z-10 w-full bg-white text-[#0f8538] hover:bg-green-50 rounded-xl font-bold h-11 flex items-center justify-between px-4 group-hover:shadow-md transition-all"
        >
          Withdraw Funds
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Card>

      {/* Pending Balance */}
      <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-yellow-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm">Pending Balance</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">₦{pendingBalance.toLocaleString()}</p>
      </Card>

      {/* Bonus Earnings */}
      <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
            <Gift className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm">Bonus Earnings</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">₦{bonusEarnings.toLocaleString()}</p>
      </Card>

      {/* Referral Earnings */}
      <Card className="p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm">Referral Earnings</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">₦{referralEarnings.toLocaleString()}</p>
      </Card>
    </div>
  );
}
