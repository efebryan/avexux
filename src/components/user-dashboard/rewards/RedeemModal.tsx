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
      <DialogContent className="max-w-md sm:rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-6 border-b border-gray-100 flex flex-col items-center text-center pt-8">
          <div className="w-16 h-16 bg-[#ade5bb]/40 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[#0f8538]" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">Confirm Redemption</DialogTitle>
          <DialogDescription className="text-gray-500 mt-2 max-w-xs">
            You are about to redeem your earnings for the following item.
          </DialogDescription>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Item</span>
              <span className="font-bold text-gray-900">{item.title}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 block">Cost</span>
              <span className="font-bold text-[#0f8538]">₦{item.cost.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
             <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
             <p className="text-sm text-gray-600">
               Your new balance will be <strong className="text-gray-900">₦{remainingBalance.toLocaleString()}</strong> after this transaction.
             </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12">Cancel</Button>
          <Button 
            onClick={() => onConfirm(item)} 
            className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md h-12 font-bold"
          >
            Confirm & Redeem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
