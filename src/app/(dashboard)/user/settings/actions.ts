"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateBankDetailsAction(bankName: string, accountNumber: string, accountName: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      bank_name: bankName,
      account_number: accountNumber,
      account_name: accountName,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating bank details:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
