"use server";

import { createClient } from "@/utils/supabase/server";

export interface Sector {
  label: string;
  color: string;
  isWin: boolean;
  value?: number;
  type?: "cash" | "premium" | "gift";
}

// These must match the client-side sectors exactly
const sectors: Sector[] = [
  { label: "₦1,000 Cash", color: "#10b981", isWin: true, value: 1000, type: "cash" },
  { label: "Try Again 😢", color: "#64748b", isWin: false },
  { label: "Premium Pro", color: "#3b82f6", isWin: true, type: "premium" },
  { label: "Better Luck 🍀", color: "#475569", isWin: false },
  { label: "₦5,000 Gift", color: "#8b5cf6", isWin: true, value: 5000, type: "gift" },
  { label: "Try Again 😢", color: "#64748b", isWin: false },
  { label: "₦10,000 Cash", color: "#eab308", isWin: true, value: 10000, type: "cash" },
  { label: "Better Luck 🍀", color: "#475569", isWin: false },
];

const SPIN_COST = 500;

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

  // 2. Check for Admin Overrides
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
    
    // Find matching sector by label, or default to lose
    targetIdx = sectors.findIndex((s) => s.label === override.reward_label);
    if (targetIdx !== -1) {
      targetSector = sectors[targetIdx];
    }
  }

  // 3. Fallback to Randomness (if no override)
  if (targetIdx === -1) {
    // Simple Probability logic
    // 50% Lose (indices 1, 3, 5, 7)
    // 30% 1,000 Cash (index 0)
    // 15% Premium (index 2) or 5,000 Gift (index 4)
    // 5% 10,000 Cash (index 6)
    
    const rand = Math.random() * 100;
    
    if (rand < 50) {
      // Lose
      const loseIndices = [1, 3, 5, 7];
      targetIdx = loseIndices[Math.floor(Math.random() * loseIndices.length)];
    } else if (rand < 80) {
      targetIdx = 0; // 1k
    } else if (rand < 95) {
      targetIdx = Math.random() > 0.5 ? 2 : 4; // Premium or 5k
    } else {
      targetIdx = 6; // 10k
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
    // Re-fetch to ensure atomicity, or just increment
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
