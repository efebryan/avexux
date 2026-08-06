import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const payload = { cost: 500, sectors: [] };
  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ key: 'spin_wheel_config', value: payload });

  console.log("Error:", error);
  if (error) {
    console.log("Error keys:", Object.keys(error));
    console.log("Error stringify:", JSON.stringify(error));
  }
}

run();
