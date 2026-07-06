"use client";

import { useState } from "react";
import { Save, Wallet, Percent, Shield, Link as LinkIcon, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [minWithdrawal, setMinWithdrawal] = useState(5000);
  const [minDeposit, setMinDeposit] = useState(1000);
  const [commission, setCommission] = useState(5);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveSettings = () => {
    toast.success("Global platform settings updated successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">Platform Settings</h1>
          <p className="text-slate-500 text-sm">Configure global rules and financial limits.</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/95 text-white font-medium flex items-center gap-2 rounded-xl shadow-md hover:-translate-y-0.5 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Financial Limits */}
        <Card className="p-6 md:p-8 border border-slate-200 shadow-sm rounded-2xl bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100 text-primary flex items-center justify-center shadow-inner border border-primary/20 transition-transform group-hover:scale-110">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-xl tracking-tight">Financial Limits</h2>
              <p className="text-sm text-slate-500">Set minimum constraints for users.</p>
            </div>
          </div>
          
          <div className="space-y-5 relative z-10">
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5">Minimum Withdrawal (₦)</label>
               <input 
                 type="number" 
                 value={minWithdrawal}
                 onChange={(e) => setMinWithdrawal(Number(e.target.value))}
                 className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50 focus:bg-white transition-all"
               />
               <p className="text-[10px] text-slate-400 mt-1.5 font-medium tracking-wide uppercase">Users cannot request payouts below this amount.</p>
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5">Minimum Deposit (₦)</label>
               <input 
                 type="number" 
                 value={minDeposit}
                 onChange={(e) => setMinDeposit(Number(e.target.value))}
                 className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50 focus:bg-white transition-all"
               />
            </div>
          </div>
        </Card>

        {/* Affiliate System */}
        <Card className="p-6 md:p-8 border border-slate-200 shadow-sm rounded-2xl bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 flex items-center justify-center shadow-inner border border-orange-200 transition-transform group-hover:scale-110">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-xl tracking-tight">Affiliate System</h2>
              <p className="text-sm text-slate-500">Global referral settings.</p>
            </div>
          </div>
          
          <div className="space-y-5 relative z-10">
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                 Commission Rate <Percent className="w-3.5 h-3.5" />
               </label>
               <div className="flex items-center gap-3">
                 <input 
                   type="number" 
                   value={commission}
                   onChange={(e) => setCommission(Number(e.target.value))}
                   className="w-24 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50 focus:bg-white transition-all text-center font-bold text-lg"
                 />
                 <span className="font-extrabold text-slate-700 text-xl">%</span>
               </div>
               <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide uppercase">Percentage earned from referred users' tasks.</p>
            </div>
          </div>
        </Card>

        {/* Security & System */}
        <Card className="p-6 md:p-8 border border-slate-200 shadow-sm rounded-2xl bg-white md:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 text-red-700 flex items-center justify-center shadow-inner border border-red-200 transition-transform group-hover:scale-110">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-xl tracking-tight">System Security</h2>
              <p className="text-sm text-slate-500">Critical platform controls.</p>
            </div>
          </div>
          
          <div className="border border-red-200 rounded-xl p-6 bg-red-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 shadow-sm">
             <div>
               <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                 Maintenance Mode
               </h3>
               <p className="text-sm text-slate-600 max-w-xl mt-1.5 leading-relaxed">
                 When active, all standard users will be unable to log in and will see a maintenance screen. Admin access remains active.
               </p>
             </div>
             <Button 
               onClick={() => setMaintenanceMode(!maintenanceMode)}
               variant="outline" 
               className={`shrink-0 font-bold rounded-xl h-11 px-6 shadow-sm transition-all ${maintenanceMode ? 'bg-red-600 text-white hover:bg-red-700 border-red-600 shadow-red-500/20' : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-slate-200 hover:border-slate-300'}`}
             >
               <Power className="w-4 h-4 mr-2" /> 
               {maintenanceMode ? "Disable Maintenance" : "Enable Maintenance"}
             </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
