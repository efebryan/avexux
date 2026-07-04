import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag } from "lucide-react";

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  cost: number;
  icon?: React.ReactNode;
}

interface RewardCardProps {
  item: RewardItem;
  userBalance: number;
  onRedeem: (item: RewardItem) => void;
}

export function RewardCard({ item, userBalance, onRedeem }: RewardCardProps) {
  const canAfford = userBalance >= item.cost;

  return (
    <Card className="p-3.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0f8538]/30 transition-all flex flex-col justify-between bg-white">
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
          {item.icon || <ShoppingCart className="w-4 h-4 text-gray-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-bold block w-fit">
            {item.category}
          </span>
          <h3 className="text-sm font-bold text-gray-900 mt-1 leading-tight truncate">
            {item.title}
          </h3>
        </div>
      </div>
      
      <p className="text-gray-500 text-xs mb-3 flex-1 line-clamp-2">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="font-bold text-sm text-[#0f8538]">
          ₦{item.cost.toLocaleString()}
        </div>
        <Button 
          onClick={() => onRedeem(item)}
          disabled={!canAfford}
          className={`rounded-lg px-3.5 h-7 text-xs font-bold shadow-sm ${
            canAfford 
              ? "bg-gray-900 hover:bg-gray-800 text-white" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed border-0"
          }`}
        >
          {canAfford ? "Redeem" : "Locked"}
        </Button>
      </div>
    </Card>
  );
}
