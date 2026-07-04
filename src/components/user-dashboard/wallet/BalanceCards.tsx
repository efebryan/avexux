import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Clock, Gift, Users, ArrowRight } from "lucide-react";

interface BalanceCardsProps {
  availableBalance: number;
  pendingBalance: number;
  bonusEarnings: number;
  referralEarnings: number;
  onWithdrawClick: () => void;
  onDepositClick: () => void;
}

export function BalanceCards({
  availableBalance,
  pendingBalance,
  bonusEarnings,
  referralEarnings,
  onWithdrawClick,
  onDepositClick
}: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {/* Available Balance (Featured) */}
      <Card className="p-3.5 rounded-xl border-0 shadow-md bg-[#0f8538] text-white flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Wallet className="w-16 h-16" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Wallet className="w-4 h-4 text-green-200" />
            <h3 className="text-green-100 font-medium text-xs">Available Balance</h3>
          </div>
          <p className="text-xl font-bold mb-3">₦{availableBalance.toLocaleString()}</p>
        </div>
        <div className="relative z-10 flex gap-2 w-full">
          <Button 
            onClick={onDepositClick}
            className="flex-1 bg-white text-[#0f8538] hover:bg-green-50 rounded-lg font-bold h-8 text-xs transition-all shadow-sm"
          >
            Deposit
          </Button>
          <Button 
            onClick={onWithdrawClick}
            className="flex-1 bg-transparent hover:bg-white/10 text-white border border-white/40 rounded-lg font-bold h-8 text-xs transition-all"
          >
            Withdraw
          </Button>
        </div>
      </Card>

      {/* Pending Balance */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-yellow-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Pending Balance</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">₦{pendingBalance.toLocaleString()}</p>
      </Card>

      {/* Bonus Earnings */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
            <Gift className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Bonus Earnings</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">₦{bonusEarnings.toLocaleString()}</p>
      </Card>

      {/* Referral Earnings */}
      <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-gray-500 font-medium text-xs">Referral Earnings</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">₦{referralEarnings.toLocaleString()}</p>
      </Card>
    </div>
  );
}
