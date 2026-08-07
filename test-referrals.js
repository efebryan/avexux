require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log("Checking referrals...");
  const { data, error } = await supabase.from('referrals').select('*');
  console.log("Referrals Error:", error);
  console.log("Referrals Data:", data);

  console.log("Checking profiles...");
  const { data: pData, error: pError } = await supabase.from('profiles').select('id, full_name, referral_code, referred_by_code');
  console.log("Profiles Data:", pData);
}

test();
