'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function loginAction(data: any) {
  const { identifier, password } = data

  const supabase = await createClient()

  const isEmail = identifier.includes('@')
  const credentials = isEmail ? { email: identifier, password } : { phone: identifier, password }

  const { error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    return { success: false, error: error.message }
  }

  // Fetch user role from profiles to determine redirect route
  const { data: { user } } = await supabase.auth.getUser()
  let redirectUrl = '/user'

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.role === 'admin') {
      redirectUrl = '/admin'
    }
  }

  revalidatePath('/', 'layout')
  return { success: true, redirectUrl }
}

export async function signupAction(data: any) {
  const { identifier, password, fullName, referralCode } = data

  const supabase = await createClient()

  const isEmail = identifier.includes('@')
  const credentials = isEmail ? { email: identifier, password } : { phone: identifier, password }

  const { error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        full_name: fullName,
        referral_code: referralCode,
      }
    }
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
}
