require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase
    .from('withdrawal_requests')
    .select(`
      id, amount, status, user_id,
      profiles!withdrawal_requests_user_id_fkey (full_name)
    `);
  
  console.log("Withdrawals:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
}

run();
