import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RewardItem } from "./RewardCard";
import { ShoppingBag, AlertCircle } from "lucide-react";

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: RewardItem | null;
  balance: number;
  onConfirm: (item: RewardItem) => void;
}

export function RedeemModal({ isOpen, onClose, item, balance, onConfirm }: RedeemModalProps) {
  if (!item) return null;

  const remainingBalance = balance - item.cost;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm sm:rounded-xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-4 border-b border-gray-100 flex flex-col items-center text-center pt-5">
          <div className="w-12 h-12 bg-[#ade5bb]/40 rounded-full flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5 text-[#0f8538]" />
          </div>
          <DialogTitle className="text-base font-bold text-gray-900">Confirm Redemption</DialogTitle>
          <DialogDescription className="text-gray-500 text-xs mt-1 max-w-xs">
            You are about to redeem your earnings for the following item.
          </DialogDescription>
        </div>

        <div className="p-3.5 space-y-3">
          <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Item</span>
              <span className="font-bold text-sm text-gray-900">{item.title}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 block">Cost</span>
              <span className="font-bold text-sm text-[#0f8538]">₦{item.cost.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 border border-gray-100">
             <AlertCircle className="w-4 h-4 text-gray-400 shrink-0" />
             <p className="text-xs text-gray-600">
               Your new balance will be <strong className="text-gray-900">₦{remainingBalance.toLocaleString()}</strong> after this transaction.
             </p>
          </div>
        </div>

        <div className="p-3.5 border-t border-gray-100 bg-gray-50 flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-lg h-8 text-xs font-bold">Cancel</Button>
          <Button 
            onClick={() => onConfirm(item)} 
            className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 text-xs font-bold"
          >
            Confirm & Redeem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
