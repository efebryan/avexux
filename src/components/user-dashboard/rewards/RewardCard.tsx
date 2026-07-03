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
    <Card className="flex flex-col h-full rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0f8538]/30 transition-all overflow-hidden group bg-white">
      <div className="h-40 bg-gray-50 flex items-center justify-center p-6 border-b border-gray-50 group-hover:bg-[#ade5bb]/20 transition-colors">
        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {item.icon || <ShoppingCart className="w-8 h-8 text-gray-400" />}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Tag className="w-3 h-3" /> {item.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {item.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="font-bold text-lg text-[#0f8538]">
            ₦{item.cost.toLocaleString()}
          </div>
          <Button 
            onClick={() => onRedeem(item)}
            disabled={!canAfford}
            className={`rounded-xl px-6 font-bold shadow-sm ${
              canAfford 
                ? "bg-gray-900 hover:bg-gray-800 text-white" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed border-0"
            }`}
          >
            {canAfford ? "Redeem" : "Locked"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
