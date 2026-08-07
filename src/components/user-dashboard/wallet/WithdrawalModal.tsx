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
  bankDetails: { bankName: string; accountNumber: string; accountName: string } | null;
  onWithdraw: (amount: number, method: string) => void;
}

const withdrawalAmounts = [5000, 10000, 20000, 50000, 100000, 200000, 500000];

export function WithdrawalModal({ isOpen, onClose, availableBalance, bankDetails, onWithdraw }: WithdrawalModalProps) {
  const [amount, setAmount] = useState<string>("5000");

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount <= availableBalance) {
      onWithdraw(numAmount, "Bank Transfer");
    }
  };

  const isInvalid = parseFloat(amount) > availableBalance || !amount || !bankDetails;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:rounded-xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-900">Withdraw Funds</DialogTitle>
          <DialogDescription className="text-xs text-gray-500 mt-0.5">
            Available Balance: <span className="font-bold text-[#0f8538]">₦{availableBalance.toLocaleString()}</span>
          </DialogDescription>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-900 font-semibold">Payment Destination</Label>
            
            {!bankDetails ? (
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-bold">Bank Details Missing</span>
                </div>
                <p className="text-[11px] text-rose-500 font-medium">You must set up your bank details in your account settings before you can withdraw funds.</p>
                <Button 
                  variant="outline" 
                  className="mt-1 h-8 text-xs font-bold bg-white border-rose-200 text-rose-600 hover:bg-rose-50"
                  onClick={() => window.location.href = '/user/settings?tab=bank'}
                >
                  Set up Bank Details
                </Button>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#0f8538]" />
                    <span className="text-xs font-bold text-gray-700">{bankDetails.bankName}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{bankDetails.accountNumber}</span>
                </div>
                <p className="text-[11px] text-gray-500 pl-6 font-medium uppercase tracking-wide">{bankDetails.accountName}</p>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-gray-900 font-semibold">Select Amount to Withdraw</Label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs outline-none focus:ring-2 focus:ring-green-500 font-semibold text-gray-700"
            >
              {withdrawalAmounts.map((val) => (
                <option key={val} value={val}>
                  ₦{val.toLocaleString()}
                </option>
              ))}
            </select>
            {parseFloat(amount) > availableBalance && (
              <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" /> Insufficient funds for this amount
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2 mx-0 mb-0">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-lg h-8 text-xs font-bold">Cancel</Button>
          <Button 
            onClick={handleWithdraw} 
            disabled={isInvalid}
            className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 text-xs font-bold"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
