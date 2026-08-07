import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const initialConfig = {
  bronze: [5], // Friday only
  silver: [1, 5], // Monday and Friday
  gold: [1, 3, 5], // Monday, Wednesday, Friday
  platinum: [1, 2, 3, 4, 5], // Monday to Friday
  diamond: [1, 2, 3, 4, 5], // Monday to Friday
  apex: [1, 2, 3, 4, 5], // Monday to Friday
};

async function run() {
  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ key: 'spins_per_plan_config', value: initialConfig });

  if (error) {
    console.error("Error setting initial config:", error);
  } else {
    console.log("Successfully initialized spins_per_plan_config.");
  }
}

run();
