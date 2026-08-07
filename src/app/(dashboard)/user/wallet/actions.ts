"use server";

import { createClient } from "@/utils/supabase/server";

export async function requestWithdrawalAction(amount: number, method: string, accountName: string = "Unknown") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Fetch user's saved bank details
  const { data: profile } = await supabase
    .from("profiles")
    .select("bank_name, account_number, account_name")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.bank_name || !profile.account_number) {
    return { success: false, error: "Please set up your Bank Details in settings first." };
  }

  const bankName = profile.bank_name;
  const accountNumber = profile.account_number;
  const actualAccountName = profile.account_name || accountName;

  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "request_withdrawal",
    {
      p_user_id: user.id,
      p_amount: amount,
      p_bank_name: bankName,
      p_account_number: accountNumber,
      p_account_name: actualAccountName,
    }
  );

  if (rpcError) {
    console.error("RPC Withdrawal Error:", rpcError);
    return {
      success: false,
      error: rpcError.message || "Failed to process withdrawal request.",
    };
  }

  if (rpcResult && rpcResult.success === false) {
    return {
      success: false,
      error: rpcResult.error || "Failed to process withdrawal request.",
    };
  }

  return { success: true };
}
