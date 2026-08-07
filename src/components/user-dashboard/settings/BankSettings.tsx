"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { updateBankDetailsAction } from "@/app/(dashboard)/user/settings/actions";

export function BankSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    async function fetchBankDetails() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("bank_name, account_number, account_name")
          .eq("id", user.id)
          .single();
        
        if (data) {
          setBankName(data.bank_name || "");
          setAccountNumber(data.account_number || "");
          setAccountName(data.account_name || "");
        }
      }
      setIsLoading(false);
    }
    fetchBankDetails();
  }, []);

  const handleSave = async () => {
    if (!bankName || !accountNumber || !accountName) {
      toast.error("Please fill in all bank details.");
      return;
    }

    setIsSaving(true);
    toast.loading("Saving bank details...", { id: "save-bank" });

    const res = await updateBankDetailsAction(bankName, accountNumber, accountName);

    if (res.success) {
      toast.success("Bank details saved successfully!", { id: "save-bank" });
    } else {
      toast.error(res.error || "Failed to save bank details.", { id: "save-bank" });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Bank Details</h3>
        <p className="text-sm text-gray-500">
          This account will be used to process all your withdrawal requests. Ensure the details are accurate.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold">Important Notice</p>
          <p>
            Please make sure the Account Name matches your real name. Withdrawals sent to incorrect or mismatched accounts may fail or experience significant delays.
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="bankName" className="text-xs font-semibold text-gray-700">Bank Name</Label>
          <div className="relative">
            <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="bankName"
              placeholder="e.g. GTBank"
              className="pl-9 h-10 bg-gray-50 border-gray-200 focus:bg-white"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-xs font-semibold text-gray-700">Account Number</Label>
          <Input
            id="accountNumber"
            placeholder="0123456789"
            className="h-10 bg-gray-50 border-gray-200 focus:bg-white"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountName" className="text-xs font-semibold text-gray-700">Account Name</Label>
          <Input
            id="accountName"
            placeholder="John Doe"
            className="h-10 bg-gray-50 border-gray-200 focus:bg-white"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white font-bold h-9 px-6 rounded-lg"
        >
          {isSaving ? "Saving..." : "Save Bank Details"}
        </Button>
      </div>
    </div>
  );
}
