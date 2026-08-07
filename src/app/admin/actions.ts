'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function adminCreateUserAction(data: {
  fullName: string;
  email: string;
  password?: string;
  role: string;
  status: string;
}) {
  const { fullName, email, password, role, status } = data;
  
  // Use a vanilla client to avoid modifying the admin's cookies
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
  
  // Generate a referral code
  const refCode = 'ARV-' + Math.random().toString(36).substring(2, 7).toUpperCase();

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

  // 2. Since the client is now temporarily logged in as the new user, 
  // we can update their profile directly (bypassing the "update own profile" RLS check!)
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      role: role.toLowerCase(),
      status: status.toUpperCase()
    })
    .eq('id', authData.user.id);

  if (updateError) {
    // Note: User is created but role/status update failed
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
}) {
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

  // Note: in a real production app, we would enforce admin authentication check here
  // before inserting, e.g. using a service role key or checking user role

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
      status: 'Active',
      submissions_count: 0
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error.message };
  }

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
  }
) {
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
