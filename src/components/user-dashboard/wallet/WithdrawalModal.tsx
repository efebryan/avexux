import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, Smartphone, AlertCircle } from "lucide-react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onWithdraw: (amount: number, method: string) => void;
}

export function WithdrawalModal({ isOpen, onClose, availableBalance, onWithdraw }: WithdrawalModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"bank" | "mobile">("bank");
  const minWithdrawal = 5000;

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount >= minWithdrawal && numAmount <= availableBalance) {
      onWithdraw(numAmount, method === "bank" ? "Bank Transfer" : "Mobile Money");
      setAmount("");
    }
  };

  const isInvalid = parseFloat(amount) > availableBalance || parseFloat(amount) < minWithdrawal;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-6 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-900">Withdraw Funds</DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            Available Balance: <span className="font-bold text-[#0f8538]">₦{availableBalance.toLocaleString()}</span>
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <Label className="text-gray-900 font-semibold">Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod("bank")}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  method === "bank" ? "border-[#0f8538] bg-[#ade5bb]/10 text-[#0f8538]" : "border-gray-100 text-gray-500 hover:border-gray-200"
                }`}
              >
                <Landmark className="w-6 h-6" />
                <span className="text-sm font-bold">Bank Transfer</span>
              </button>
              <button
                onClick={() => setMethod("mobile")}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  method === "mobile" ? "border-[#0f8538] bg-[#ade5bb]/10 text-[#0f8538]" : "border-gray-100 text-gray-500 hover:border-gray-200"
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-sm font-bold">Mobile Money</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-900 font-semibold">Amount to Withdraw (₦)</Label>
            <Input 
              type="number" 
              placeholder={`Min: ₦${minWithdrawal.toLocaleString()}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`h-12 rounded-xl text-lg ${isInvalid && amount ? "border-red-500 focus-visible:ring-red-200" : ""}`}
            />
            {amount && parseFloat(amount) < minWithdrawal && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> Minimum withdrawal is ₦{minWithdrawal.toLocaleString()}
              </p>
            )}
            {amount && parseFloat(amount) > availableBalance && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> Insufficient funds
              </p>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12">Cancel</Button>
          <Button 
            onClick={handleWithdraw} 
            disabled={!amount || isInvalid}
            className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md h-12 font-bold"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
