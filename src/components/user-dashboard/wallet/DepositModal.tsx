import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";
import { verifyDepositAction } from "@/app/(dashboard)/user/wallet/paystack-actions";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: string) => void;
}

export function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const minDeposit = 1000;

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
            {/* Amount */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-900 font-semibold">Amount to Deposit (₦)</Label>
              <Input 
                type="number" 
                placeholder={`Min: ₦${minDeposit.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className={`h-9 rounded-lg text-sm ${parseFloat(amount) < minDeposit && amount ? "border-red-500 focus-visible:ring-red-200" : ""}`}
              />
              {amount && parseFloat(amount) < minDeposit && (
                <p className="text-red-500 text-[10px] flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> Minimum deposit is ₦{minDeposit.toLocaleString()}
                </p>
              )}
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
