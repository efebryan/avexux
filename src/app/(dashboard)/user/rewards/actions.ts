"use server";

import { createClient } from "@/utils/supabase/server";

export interface Sector {
  label: string;
  color: string;
  isWin: boolean;
  value?: number;
  type?: "cash" | "premium" | "gift" | "none";
}

// Fallback if DB not configured
const defaultSectors: Sector[] = [
  { label: "₦1,000 Cash", color: "#10b981", isWin: true, value: 1000, type: "cash" },
  { label: "Try Again 😢", color: "#64748b", isWin: false, type: "none" },
  { label: "Premium Pro", color: "#3b82f6", isWin: true, type: "premium" },
  { label: "Better Luck 🍀", color: "#475569", isWin: false, type: "none" },
];

export async function executeSpinAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Check if today is Tuesday (2) or Friday (5)
  const today = new Date().getDay();
  if (today !== 2 && today !== 5) {
    return { success: false, error: "Spins are only available on Tuesdays and Fridays!" };
  }

  // 0. Fetch Dynamic Config
  let sectors = defaultSectors;
  let SPIN_COST = 500;
  
  const { data: wheelData } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "spin_wheel_config")
    .single();
    
  if (wheelData?.value) {
    sectors = wheelData.value.sectors;
    SPIN_COST = wheelData.value.cost || 500;
  }

  // 1. Check Wallet Balance & Free Spins
  const { data: wallet, error: walletError } = await supabase
    .from("wallets")
    .select("balance, free_spins")
    .eq("user_id", user.id)
    .single();

  if (walletError || !wallet) {
    return { success: false, error: "Could not retrieve wallet" };
  }

  let costToDeduct = 0;
  let isFreeSpin = false;

  if (wallet.free_spins > 0) {
    isFreeSpin = true;
  } else if (wallet.balance >= SPIN_COST) {
    costToDeduct = SPIN_COST;
  } else {
    return { success: false, error: "Insufficient balance for a spin" };
  }

  // 2. Check for Admin Overrides (Rigged Spins)
  let targetSector: Sector | null = null;
  let targetIdx = -1;

  const { data: override } = await supabase
    .from("spin_overrides")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_used", false)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (override) {
    // Mark override as used
    await supabase.from("spin_overrides").update({ is_used: true }).eq("id", override.id);
    
    // Find matching sector by label
    targetIdx = sectors.findIndex((s) => s.label === override.reward_label);
    if (targetIdx !== -1) {
      targetSector = sectors[targetIdx];
    }
  }

  // 3. Fallback to Randomness (if no override)
  if (targetIdx === -1) {
    const rand = Math.random() * 100;
    
    // Split dynamic sectors into wins and losses
    const winSectors: number[] = [];
    const loseSectors: number[] = [];
    sectors.forEach((s, i) => {
      if (s.isWin) winSectors.push(i);
      else loseSectors.push(i);
    });

    if (rand < 50 && loseSectors.length > 0) {
      // 50% chance to lose
      targetIdx = loseSectors[Math.floor(Math.random() * loseSectors.length)];
    } else if (winSectors.length > 0) {
      // 50% chance to win something
      targetIdx = winSectors[Math.floor(Math.random() * winSectors.length)];
    } else {
      // Absolute fallback
      targetIdx = Math.floor(Math.random() * sectors.length);
    }

    targetSector = sectors[targetIdx];
  }

  // 4. Perform the Transaction
  if (isFreeSpin) {
    await supabase
      .from("wallets")
      .update({ free_spins: wallet.free_spins - 1 })
      .eq("user_id", user.id);
  } else if (costToDeduct > 0) {
    await supabase
      .from("wallets")
      .update({ balance: wallet.balance - costToDeduct })
      .eq("user_id", user.id);
      
    // Record spin transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      reference_id: `SPIN_COST_${Date.now()}`,
      type: "SPIN_COST",
      amount: costToDeduct,
      status: "Completed",
      metadata: { note: "Paid for wheel spin" }
    });
  }

  // 5. Apply the Reward if Win
  if (targetSector?.isWin && targetSector.value && targetSector.type === "cash") {
    // Re-fetch to ensure atomicity
    const { data: updatedWallet } = await supabase
      .from("wallets")
      .select("balance, total_earned")
      .eq("user_id", user.id)
      .single();

    if (updatedWallet) {
      await supabase
        .from("wallets")
        .update({ 
          balance: updatedWallet.balance + targetSector.value,
          total_earned: updatedWallet.total_earned + targetSector.value
        })
        .eq("user_id", user.id);
        
      await supabase.from("transactions").insert({
        user_id: user.id,
        reference_id: `SPIN_WIN_${Date.now()}`,
        type: "SPIN_REWARD",
        amount: targetSector.value,
        status: "Completed"
      });
    }
  }

  // 6. Log the Reward Spin
  await supabase.from("rewards_spins").insert({
    user_id: user.id,
    reward_label: targetSector?.label || "Unknown",
    reward_type: targetSector?.type || "none",
    reward_value: targetSector?.value || 0,
    cost_paid: costToDeduct
  });

  return { success: true, targetIdx, wonItem: targetSector };
}
