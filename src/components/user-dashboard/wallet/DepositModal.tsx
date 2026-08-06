import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, CreditCard, AlertCircle, Loader2, Lock } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";
import { verifyDepositAction } from "@/app/(dashboard)/user/wallet/paystack-actions";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: string) => void;
  highestDeposit?: number;
}

export function DepositModal({ isOpen, onClose, onDeposit, highestDeposit = 0 }: DepositModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const minDeposit = 18000;

  // Use a fallback public key for local dev if environment variable is missing
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const config = {
    reference: `DEP_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
    email: "user@avexux.com", // In a real app, pass the actual user email
    amount: parseFloat(amount || "0") * 100, // Paystack amount is in kobo/cents
    publicKey: publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    setIsProcessing(true);
    toast.info("Payment successful! Verifying with server...");
    
    // Call server action to verify securely and update wallet
    const result = await verifyDepositAction(reference.reference, parseFloat(amount));
    
    setIsProcessing(false);
    if (result.success) {
      toast.success(`Successfully deposited ₦${parseFloat(amount).toLocaleString()}`);
      onDeposit(parseFloat(amount), "Paystack");
      setAmount("");
      onClose();
    } else {
      toast.error(result.error || "Failed to verify deposit. Please contact support.");
    }
  };

  const onPaystackClose = () => {
    toast.error("Payment was cancelled.");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount >= minDeposit) {
      initializePayment({ onSuccess, onClose: onPaystackClose });
    }
  };

  const isInvalid = parseFloat(amount) < minDeposit || !amount;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:rounded-xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-900">Deposit Funds</DialogTitle>
          <DialogDescription className="text-xs text-gray-500 mt-0.5">
            Fund your wallet to boost tasks or access other premium features via bank transfer.
          </DialogDescription>
        </div>

        <form onSubmit={handlePay}>
          <div className="p-4 space-y-4">
            {/* Amount Selection */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-900 font-semibold">Select Deposit Package</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Lite Plan", amount: 18000 },
                  { label: "Growth Plan", amount: 42000 },
                  { label: "Pro Business", amount: 88000 },
                  { label: "Enterprise Pro", amount: 124000 },
                ].map((plan) => {
                  const isLocked = plan.amount <= highestDeposit;
                  return (
                  <button
                    key={plan.label}
                    type="button"
                    disabled={isLocked}
                    onClick={() => setAmount(plan.amount.toString())}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isLocked
                        ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                        : amount === plan.amount.toString() 
                          ? "border-[#2faf2f] bg-[#e6f7e6] ring-2 ring-[#2faf2f]/20" 
                          : "border-gray-200 hover:border-[#2faf2f]/50 hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-[11px] font-bold text-gray-900">{plan.label}</div>
                      {isLocked && <Lock className="w-3 h-3 text-gray-400" />}
                    </div>
                    <div className={`text-sm font-extrabold mt-0.5 ${isLocked ? "text-gray-400" : "text-[#2faf2f]"}`}>
                      ₦{plan.amount.toLocaleString()}
                    </div>
                  </button>
                )})}
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 space-y-1.5 text-xs text-blue-700 mt-2">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <CreditCard className="w-4 h-4" /> Secure Payment via Paystack
              </p>
              <p className="text-[11px] opacity-90">
                You will be redirected to Paystack to complete this transaction securely using your Card, Bank Transfer, or USSD.
              </p>
              <p className="text-[10px] opacity-70 mt-1 italic">
                *Funds will credit automatically after successful payment.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2 mx-0 mb-0">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-lg h-8 text-xs font-bold">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isInvalid || isProcessing}
              className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 text-xs font-bold"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay with Paystack"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
