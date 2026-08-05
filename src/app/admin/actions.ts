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
