import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const mockSectors = [
  { id: "1", label: "₦1,000 Cash", type: "cash", value: 1000, color: "#10b981", isWin: true },
  { id: "2", label: "Try Again 😢", type: "none", value: 0, color: "#64748b", isWin: false },
  { id: "3", label: "Premium Pro", type: "premium", value: 0, color: "#3b82f6", isWin: true },
  { id: "4", label: "Better Luck 🍀", type: "none", value: 0, color: "#475569", isWin: false },
];

async function run() {
  const payload = { cost: 500, sectors: mockSectors };
  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ key: 'spin_wheel_config', value: payload });

  console.log("Error:", error);
}

run();
