import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, CreditCard, AlertCircle } from "lucide-react";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: string) => void;
}

export function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [method, setMethod] = useState<"card" | "bank">("card");
  const minDeposit = 1000;

  // Card Details State
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount >= minDeposit) {
      onDeposit(numAmount, method === "card" ? "Card Payment" : "Bank Transfer");
      setAmount("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    }
  };

  const isInvalid = parseFloat(amount) < minDeposit || !amount;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:rounded-xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="bg-[#f8fafc] p-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-900">Deposit Funds</DialogTitle>
          <DialogDescription className="text-xs text-gray-500 mt-0.5">
            Fund your wallet to boost tasks or access other premium features.
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

            {/* Payment Method */}
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-900 font-semibold">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                    method === "card" ? "border-[#0f8538] bg-[#ade5bb]/10 text-[#0f8538]" : "border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-bold">Card Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("bank")}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                    method === "bank" ? "border-[#0f8538] bg-[#ade5bb]/10 text-[#0f8538]" : "border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span className="text-xs font-bold">Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Conditional Form Inputs */}
            {method === "card" ? (
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-700">Card Number</Label>
                  <Input 
                    type="text" 
                    placeholder="4000 1234 5678 9010" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="h-9 rounded-lg text-xs" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">Expiry Date</Label>
                    <Input 
                      type="text" 
                      placeholder="MM/YY" 
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      className="h-9 rounded-lg text-xs" 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-700">CVV</Label>
                    <Input 
                      type="password" 
                      placeholder="123" 
                      maxLength={3}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      className="h-9 rounded-lg text-xs" 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1.5 text-xs text-gray-600 pt-2 border-t mt-2">
                <p className="font-bold text-gray-900 mb-1">Transfer to Account:</p>
                <div className="flex justify-between">
                  <span>Bank:</span>
                  <span className="font-bold text-gray-900">Providus Bank</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span className="font-bold text-gray-900">1029384756</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <span className="font-bold text-gray-900">Arvexus Limited</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 italic">
                  *Funds will credit automatically after transfer confirmation.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2 mx-0 mb-0">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-lg h-8 text-xs font-bold">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isInvalid}
              className="flex-1 bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 text-xs font-bold"
            >
              {method === "card" ? "Pay ₦" + (amount ? parseFloat(amount).toLocaleString() : "0") : "Confirm Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
