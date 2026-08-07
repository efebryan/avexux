"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, Loader2, Coins } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const planLabels: Record<string, string> = {
  bronze: "Bronze Starter",
  silver: "Silver Earner",
  gold: "Gold Master",
  platinum: "Platinum Pro",
};

export default function EarningConfigsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [commissionConfig, setCommissionConfig] = useState<
    Record<string, Record<string, number>>
  >({
    bronze: { level_1: 2, level_2: 1, level_3: 0 },
    silver: { level_1: 3, level_2: 1, level_3: 0 },
    gold: { level_1: 4, level_2: 2, level_3: 0 },
    platinum: { level_1: 5, level_2: 2, level_3: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();

      // Fetch Commission Config
      const { data: configData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "task_earning_commission_config")
        .single();

      if (configData?.value) {
        setCommissionConfig(configData.value);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleSaveCommissionConfig = async () => {
    toast.loading("Saving configuration...", { id: "save_config" });
    const supabase = createClient();
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: "task_earning_commission_config", value: commissionConfig });

    if (error) {
      toast.error(`Failed to save config: ${error.message}`, { id: "save_config" });
    } else {
      toast.success("Task earning commission configuration saved!", { id: "save_config" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-[calc(100vh-100px)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-3">
            <Coins className="w-8 h-8 text-[#0f8538]" /> Earning Configurations
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mt-2">
            Configure the percentage (%) that uplines earn when a downline completes a task and it gets approved. These percentages depend on the active plan of the upline receiving the commission. Set a level to 0% if you do not want it to yield a commission.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <Button
            onClick={handleSaveCommissionConfig}
            className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white font-semibold rounded-lg px-6 flex shadow-sm h-11"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card className="border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Settings className="w-5 h-5 text-slate-500" />
          <h2 className="font-bold text-lg text-slate-900 tracking-tight">
            Multi-Level Task Commissions
          </h2>
        </div>

        <div className="p-6 space-y-8">
          {Object.keys(planLabels).map((plan) => (
            <div key={plan} className="flex flex-col gap-4 p-5 bg-slate-50/80 rounded-xl border border-slate-100 transition-colors hover:border-slate-300">
              <div className="flex items-center justify-between">
                <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    plan === 'bronze' ? 'bg-amber-600' :
                    plan === 'silver' ? 'bg-slate-400' :
                    plan === 'gold' ? 'bg-yellow-500' : 'bg-slate-800'
                  }`} />
                  {planLabels[plan] || plan}
                </label>
                <span className="text-xs font-semibold text-slate-500 px-3 py-1 bg-white border border-slate-200 rounded-full">
                  Receiving User's Plan
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((level) => (
                  <div key={level} className="flex flex-col gap-2 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex justify-between items-center">
                      <span>Level {level} Upline</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={commissionConfig[plan]?.[`level_${level}`] ?? 0}
                        onChange={(e) =>
                          setCommissionConfig({
                            ...commissionConfig,
                            [plan]: {
                              ...(commissionConfig[plan] || {}),
                              [`level_${level}`]: Number(e.target.value),
                            }
                          })
                        }
                        className="pr-8 rounded-lg bg-slate-50 border-slate-200 focus:border-[#0f8538] focus:ring-[#0f8538] text-sm font-bold h-11"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                        %
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Percentage earned by the level {level} referrer when downline completes a task.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
