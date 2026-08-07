"use server";

import { createClient } from "@/utils/supabase/server";

export interface Sector {
  label: string;
  color: string;
  isWin: boolean;
  value?: number;
  type?: "cash" | "premium" | "gift" | "none";
}

const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "platinum", threshold: 88000 },
  { id: "diamond", threshold: 124000 },
  { id: "apex", threshold: 200000 },
];

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

  // 0. Fetch Dynamic Configs (Sectors and Spins Per Plan)
  let sectors = defaultSectors;
  // Paid spin cost is strictly 1800
  let SPIN_COST = 1800;
  let planConfig: Record<string, number[]> | null = null;
  
  const { data: appSettings } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", ["spin_wheel_config", "spins_per_plan_config"]);
    
  if (appSettings) {
    const wheelConf = appSettings.find(s => s.key === "spin_wheel_config");
    if (wheelConf?.value) {
      sectors = wheelConf.value.sectors;
    }
    
    const planConf = appSettings.find(s => s.key === "spins_per_plan_config");
    if (planConf?.value) {
      planConfig = planConf.value;
    }
  }

  // 1. Determine User Plan based on highest deposit
  const { data: txData } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id);
  
  let highestDep = 0;
  if (txData) {
    highestDep = txData
      .filter((tx: any) => tx.type?.toLowerCase() === 'deposit' || (tx.metadata?.description || "").toLowerCase().includes('deposit'))
      .reduce((max: number, tx: any) => Math.max(max, Number(tx.amount)), 0);
  }
  
  const rankIndex = Math.max(0, ranksConfig.findLastIndex(r => highestDep >= r.threshold));
  const userPlanId = ranksConfig[rankIndex].id;

  // 2. Check if today is a valid spin day for this plan
  const today = new Date().getDay();
  let isValidDay = false;
  if (planConfig && planConfig[userPlanId]) {
    isValidDay = planConfig[userPlanId].includes(today);
  } else {
    // Fallback: Tue/Fri
    isValidDay = today === 2 || today === 5;
  }

  if (!isValidDay) {
    return { success: false, error: "Spins are not available today for your current plan." };
  }

  // 2.5 Pre-check for Paid Spin limit
  // Only check if they don't have free spins (we must query wallet first)
  const { data: wallet } = await supabase.from("wallets").select("free_spins").eq("user_id", user.id).single();
  if (wallet && wallet.free_spins <= 0) {
    // If no free spins, check if they already had a paid spin today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const { count: paidSpinsToday } = await supabase
      .from("rewards_spins")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gt("cost_paid", 0)
      .gte("created_at", startOfDay.toISOString());
      
    if (paidSpinsToday && paidSpinsToday > 0) {
      return { success: false, error: "You have already used your extra paid spin for today." };
    }
  }

  // 3. Check for Admin Overrides (Rigged Spins)
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

  // 4. Fallback to Randomness (if no override)
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

  // 5. Perform the Transaction via Atomic RPC
  const { data: rpcResult, error: rpcError } = await supabase.rpc("execute_spin_transaction", {
    p_user_id: user.id,
    p_cost: SPIN_COST,
    p_reward_amount: targetSector?.value || 0,
    p_reward_label: targetSector?.label || "Unknown",
    p_reward_type: targetSector?.type || "none"
  });

  if (rpcError) {
    console.error("RPC Spin Error:", rpcError);
    // Standardize error message
    if (rpcError.message.includes("Insufficient balance")) {
      return { success: false, error: "Insufficient balance for a spin" };
    }
    if (rpcError.message.includes("already used your extra paid spin")) {
      return { success: false, error: "You have already used your extra paid spin for today." };
    }
    return { success: false, error: "Failed to process spin. Please try again later." };
  }

  return { success: true, targetIdx, wonItem: targetSector };
}
