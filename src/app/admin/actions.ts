'use server'

import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Helper: Verify the current user is an admin.
 * Returns the admin's user ID on success, or an error response.
 */
async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { authorized: false as const, error: 'Unauthorized: Not logged in.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return { authorized: false as const, error: 'Forbidden: Admin access required.' };
  }

  return { authorized: true as const, userId: user.id, supabase };
}

export async function adminCreateUserAction(data: {
  fullName: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  referralCode?: string;
}) {
  // Verify admin identity first
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const { fullName, email, password, role, status, referralCode } = data;
  
  // Use a vanilla client for signUp to avoid modifying the admin's session cookies.
  // Admin identity was already verified above.
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  );

  // Generate a random password if not provided
  const userPassword = password || Math.random().toString(36).slice(-10) + 'A1!';
  
  // Generate a referral code if not provided
  const refCode = referralCode || 'ARV-' + Math.random().toString(36).substring(2, 7).toUpperCase();

  // 1. Sign up the new user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: userPassword,
    options: {
      data: {
        full_name: fullName,
        referral_code: refCode,
      }
    }
  });

  if (signUpError) {
    return { success: false, error: signUpError.message };
  }

  if (!authData.user) {
    return { success: false, error: "Failed to create user" };
  }

  // 2. Update the new user's profile via the authenticated admin client
  const { error: updateError } = await auth.supabase
    .from('profiles')
    .update({ 
      role: role.toLowerCase(),
      status: status.toUpperCase()
    })
    .eq('id', authData.user.id);

  if (updateError) {
    return { success: false, error: "User created, but failed to set role/status: " + updateError.message };
  }

  return { success: true, user: authData.user };
}

export async function adminCreateTaskAction(data: {
  title: string;
  description: string;
  category: string;
  rewardAmount: number;
  timerSeconds: number;
  taskLink?: string;
  images: string[];
  targetPlan: string;
  dayOfWeek: string;
}) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const { supabase } = auth;

  const { data: task, error } = await supabase
    .from('tasks')
    .insert([{
      title: data.title,
      description: data.description,
      category: data.category,
      advertiser: "Platform Admin",
      reward_amount: data.rewardAmount,
      timer_seconds: data.timerSeconds,
      task_link: data.taskLink || null,
      images: data.images,
      target_plan: data.targetPlan,
      day_of_week: data.dayOfWeek,
      status: 'Active',
      submissions_count: 0
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error.message };
  }

  // Insert global notification for the new task
  const targetLabel = data.targetPlan === "All" ? "all users" : `${data.targetPlan} users`;
  await supabase.from("notifications").insert([{
    user_id: null,
    title: "New Task Available!",
    message: `A new task "${data.title}" is available for ${targetLabel}. Earn ₦${data.rewardAmount}!`,
    type: "info",
    category: "Task",
    is_read: false
  }]);

  return { success: true, task };
}

export async function adminEditTaskAction(
  taskId: string,
  data: {
    title: string;
    description: string;
    category: string;
    rewardAmount: number;
    timerSeconds: number;
    taskLink?: string;
    images: string[];
    targetPlan: string;
    dayOfWeek: string;
  }
) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const { supabase } = auth;

  const { data: task, error } = await supabase
    .from('tasks')
    .update({
      title: data.title,
      description: data.description,
      category: data.category,
      reward_amount: data.rewardAmount,
      timer_seconds: data.timerSeconds,
      task_link: data.taskLink || null,
      images: data.images,
      target_plan: data.targetPlan,
      day_of_week: data.dayOfWeek,
      status: 'Active',
      updated_at: new Date().toISOString()
    })
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    console.error("Error editing task:", error);
    return { success: false, error: error.message };
  }

  return { success: true, task };
}

export async function adminNotifyUserAction(userId: string, title: string, message: string, type: string = "info", category: string = "System") {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const { supabase } = auth;

  const { error } = await supabase.from("notifications").insert([{
    user_id: userId,
    title,
    message,
    type,
    category,
    is_read: false
  }]);

  if (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function adminProcessWithdrawalAction(requestId: string, status: "Approved" | "Rejected", reason?: string) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const { supabase, userId } = auth;

  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "process_withdrawal",
    {
      p_request_id: requestId,
      p_admin_id: userId,
      p_status: status,
      p_reason: reason || null,
    }
  );

  if (rpcError) {
    console.error("RPC Process Withdrawal Error:", rpcError);
    return {
      success: false,
      error: rpcError.message || "Failed to process withdrawal.",
    };
  }

  if (rpcResult && rpcResult.success === false) {
    return {
      success: false,
      error: rpcResult.error || "Failed to process withdrawal.",
    };
  }

  return { success: true };
}
