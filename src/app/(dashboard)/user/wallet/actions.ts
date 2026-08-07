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

  // Define placeholders based on method
  let bankName = method;
  let accountNumber = "N/A";

  if (method === "Bank Transfer") {
    bankName = "Local Bank";
    accountNumber = "1234567890"; // We can prompt user for this later, for now we use a placeholder or they will submit it.
  }

  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "request_withdrawal",
    {
      p_user_id: user.id,
      p_amount: amount,
      p_bank_name: bankName,
      p_account_number: accountNumber,
      p_account_name: accountName,
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
