require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixReferrals() {
  console.log("Fetching profiles...");
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
  
  if (pError) {
    console.error("Error fetching profiles:", pError);
    return;
  }

  const { data: existingReferrals, error: rError } = await supabase.from('referrals').select('*');
  
  if (rError) {
    console.error("Error fetching referrals:", rError);
    return;
  }

  for (const profile of profiles) {
    if (profile.referred_by_code) {
      // Check if it already exists
      const exists = existingReferrals.find(r => r.referred_id === profile.id);
      if (!exists) {
        console.log(`Fixing missing referral for ${profile.full_name}...`);
        
        // Find referrer
        const referrer = profiles.find(p => p.referral_code === profile.referred_by_code);
        if (referrer) {
          // I don't have service role key, so I can't insert into referrals via JS if RLS blocks it.
          // Let's check if RLS allows anon/user to insert into referrals.
          // Probably not, unless it's authenticated. But this script uses ANON_KEY.
          // Let's see what happens.
          console.log(`Need to insert referral: referrer=${referrer.full_name}, referred=${profile.full_name}`);
        } else {
          console.log(`Referrer not found for code ${profile.referred_by_code}`);
        }
      }
    }
  }
}

fixReferrals();
