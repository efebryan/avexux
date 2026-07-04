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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Platform Settings</h1>
          <p className="text-gray-500 text-sm">Configure global rules and financial limits.</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Financial Limits */}
        <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Financial Limits</h2>
              <p className="text-xs text-gray-500">Set minimum constraints for users.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Minimum Withdrawal (₦)</label>
               <input 
                 type="number" 
                 value={minWithdrawal}
                 onChange={(e) => setMinWithdrawal(Number(e.target.value))}
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               />
               <p className="text-[10px] text-gray-500 mt-1">Users cannot request payouts below this amount.</p>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Minimum Deposit (₦)</label>
               <input 
                 type="number" 
                 value={minDeposit}
                 onChange={(e) => setMinDeposit(Number(e.target.value))}
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               />
            </div>
          </div>
        </Card>

        {/* Affiliate System */}
        <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Affiliate System</h2>
              <p className="text-xs text-gray-500">Global referral settings.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
                 Commission Rate <Percent className="w-3 h-3" />
               </label>
               <div className="flex items-center gap-2">
                 <input 
                   type="number" 
                   value={commission}
                   onChange={(e) => setCommission(Number(e.target.value))}
                   className="w-24 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                 />
                 <span className="font-bold text-gray-700">%</span>
               </div>
               <p className="text-[10px] text-gray-500 mt-1">Percentage earned from referred users' tasks.</p>
            </div>
          </div>
        </Card>

        {/* Security & System */}
        <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">System Security</h2>
              <p className="text-xs text-gray-500">Critical platform controls.</p>
            </div>
          </div>
          
          <div className="border border-red-100 rounded-lg p-4 bg-red-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div>
               <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 Maintenance Mode
               </h3>
               <p className="text-sm text-gray-600 max-w-lg mt-1">
                 When active, all standard users will be unable to log in and will see a maintenance screen. Admin access remains active.
               </p>
             </div>
             <Button 
               onClick={() => setMaintenanceMode(!maintenanceMode)}
               variant="outline" 
               className={`shrink-0 font-bold ${maintenanceMode ? 'bg-red-600 text-white hover:bg-red-700 border-red-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
