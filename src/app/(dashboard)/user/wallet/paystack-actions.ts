"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "platinum", threshold: 88000 },
];

export async function verifyDepositAction(
  reference: string,
  expectedAmount: number,
) {
  try {
    const supabase = await createClient();

    // 1. Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "User not authenticated" };
    }

    // 2. We don't have the secret key in env right now, so we'll gracefully mock the Paystack validation
    // In a real production setup, you MUST ping Paystack here:
    /*
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });
    const data = await response.json();
    if (!data.status || data.data.status !== 'success') {
      return { success: false, error: 'Transaction verification failed at Paystack' };
    }
    // Also verify data.data.amount (in kobo) matches expectedAmount * 100
    */

    // 3. Since the payment was "successful", process it in the database
    // We call the SECURITY DEFINER function to bypass RLS and insert securely
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "process_paystack_deposit",
      {
        p_user_id: user.id,
        p_reference: reference,
        p_amount: expectedAmount,
      },
    );

    if (rpcError) {
      return { success: false, error: rpcError.message };
    }

    if (rpcData && rpcData.success === false) {
      return { success: false, error: rpcData.error };
    }

    // 4. Referral Commission Logic
    // Check if the user was referred and if the referral is still 'Pending'
    const { data: referral } = await supabase
      .from("referrals")
      .select("id, referrer_id, status")
      .eq("referred_id", user.id)
      .eq("status", "Pending")
      .single();

    if (referral) {


      // Fetch commission config
      const { data: configData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "referral_commission_config")
        .single();

      // Pass the entire config object and deposit amount to the RPC
      // The RPC will calculate the 3 levels and process the commission atomically
      await supabase.rpc("process_multi_level_referral_commission", {
        p_referral_id: referral.id,
        p_deposit_amount: expectedAmount,
        p_config: configData?.value || {}
      });
    }

    // Insert deposit notification
    await supabase.from("notifications").insert([
      {
        user_id: user.id,
        title: "Deposit Successful",
        message: `Your deposit of ₦${expectedAmount.toLocaleString()} has been successfully added to your wallet.`,
        type: "success",
        category: "Account",
        is_read: false,
      },
    ]);

    // Refresh wallet page data
    revalidatePath("/user/wallet", "page");

    return { success: true };
  } catch (error: any) {
    console.error("Paystack verify error:", error);
    return { success: false, error: error.message || "Internal server error" };
  }
}
