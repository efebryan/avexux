"use client";

import { useState } from "react";
import { Settings, Save, ToggleLeft, ToggleRight, Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Mock Sectors
const mockSectors = [
  { id: "1", label: "₦1,000 Cash", type: "cash", value: 1000, color: "#10b981", isWin: true },
  { id: "2", label: "Try Again 😢", type: "none", value: 0, color: "#64748b", isWin: false },
  { id: "3", label: "Premium Pro", type: "premium", value: 0, color: "#3b82f6", isWin: true },
  { id: "4", label: "Better Luck 🍀", type: "none", value: 0, color: "#475569", isWin: false },
];

export default function AdminRewardsPage() {
  const [sectors, setSectors] = useState(mockSectors);
  const [showCongratsModal, setShowCongratsModal] = useState(true);
  const [spinCost, setSpinCost] = useState(500);

  // Congrats Modal Config State
  const [congratsTitle, setCongratsTitle] = useState("Dear users, congratulations! 🥳");
  const [congratsAmount, setCongratsAmount] = useState("₦204,000");

  const handleSaveWheelConfig = () => {
    toast.success("Spin wheel configuration saved successfully!");
  };

  const handleSaveModalConfig = () => {
    toast.success("Congratulations popup configuration saved!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Rewards Configuration</h1>
          <p className="text-gray-500 text-sm">Manage the Spin Wheel and Dashboard Popup.</p>
        </div>
      </div>

      <div className="grid gap-8">
        
        {/* Spin Wheel Configuration */}
        <Card className="p-6 md:p-8 border border-gray-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 flex items-center justify-center shadow-inner border border-blue-200">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-xl tracking-tight">Spin Wheel Sectors</h2>
                <p className="text-sm text-gray-500">Configure what users can win.</p>
              </div>
            </div>
            <Button onClick={handleSaveWheelConfig} className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 rounded-xl shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
              <Save className="w-4 h-4" /> Save Wheel Config
            </Button>
          </div>

          <div className="mb-6 flex items-center gap-4 relative z-10">
            <div className="w-full sm:w-1/2 md:w-1/3">
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Cost per Spin (₦)</label>
               <input 
                 type="number" 
                 value={spinCost}
                 onChange={(e) => setSpinCost(Number(e.target.value))}
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
               />
            </div>
          </div>

          <div className="border border-gray-200/60 rounded-xl overflow-hidden relative z-10 shadow-sm">
            <table className="w-full text-sm text-left bg-white">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-200/60">
                <tr>
                  <th className="px-5 py-4 font-bold tracking-wider">Label</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Type</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Value</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Color</th>
                  <th className="px-5 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sectors.map((sector) => (
                  <tr key={sector.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-5 py-4 font-bold text-gray-900">{sector.label}</td>
                    <td className="px-5 py-4">
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-100/80 border border-gray-200/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {sector.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-700">{sector.value > 0 ? <span className="text-green-600 font-extrabold">₦{sector.value}</span> : '-'}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md shadow-sm border border-black/10" style={{ backgroundColor: sector.color }}></div>
                        <span className="text-xs text-gray-500 font-medium">{sector.color}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 relative z-10">
             <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl h-12 transition-all">
               <Plus className="w-4 h-4 mr-2" /> Add New Sector
             </Button>
          </div>
        </Card>

        {/* Congratulations Modal Config */}
        <Card className="p-6 md:p-8 border border-gray-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 relative z-10">
            <div>
              <h2 className="font-bold text-gray-900 text-xl tracking-tight">Congratulations Popup</h2>
              <p className="text-sm text-gray-500 mt-1">Manage the modal shown on user dashboard load.</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCongratsModal(!showCongratsModal)}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${showCongratsModal ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showCongratsModal ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                {showCongratsModal ? 'Active' : 'Disabled'}
              </button>
              <Button onClick={handleSaveModalConfig} className="bg-slate-900 hover:bg-slate-800 text-white font-medium flex items-center gap-2 h-10 rounded-xl shadow-md">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>

          <div className="space-y-5 relative z-10">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Popup Title</label>
               <input 
                 type="text" 
                 value={congratsTitle}
                 onChange={(e) => setCongratsTitle(e.target.value)}
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
               />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Highlighted Bonus Amount</label>
               <input 
                 type="text" 
                 value={congratsAmount}
                 onChange={(e) => setCongratsAmount(e.target.value)}
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
               />
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
               <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live Preview
               </p>
               <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-sm mx-auto">
                  <h3 className="font-extrabold text-xl mb-3 text-slate-800">{congratsTitle}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you for trusting us! We are giving you the chance to win up to 
                    <strong className="text-emerald-600 mx-1 font-extrabold text-base bg-emerald-50 px-1.5 py-0.5 rounded">{congratsAmount}</strong> 
                    in bonuses!
                  </p>
               </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
