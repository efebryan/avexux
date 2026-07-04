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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rewards Configuration</h1>
          <p className="text-gray-500 text-sm">Manage the Spin Wheel and Dashboard Popup.</p>
        </div>
      </div>

      <div className="grid gap-8">
        
        {/* Spin Wheel Configuration */}
        <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Spin Wheel Sectors</h2>
                <p className="text-xs text-gray-500">Configure what users can win.</p>
              </div>
            </div>
            <Button onClick={handleSaveWheelConfig} className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Wheel
            </Button>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="w-full sm:w-1/2">
               <label className="block text-sm font-bold text-gray-700 mb-1">Cost per Spin (₦)</label>
               <input 
                 type="number" 
                 value={spinCost}
                 onChange={(e) => setSpinCost(Number(e.target.value))}
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               />
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Label</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Value</th>
                  <th className="px-4 py-3 font-semibold">Color</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sectors.map((sector) => (
                  <tr key={sector.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-900">{sector.label}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded capitalize">
                        {sector.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{sector.value > 0 ? `₦${sector.value}` : '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color }}></div>
                        <span className="text-xs text-gray-500">{sector.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
             <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400">
               <Plus className="w-4 h-4 mr-2" /> Add New Sector
             </Button>
          </div>
        </Card>

        {/* Congratulations Modal Config */}
        <Card className="p-6 border border-gray-100 shadow-sm rounded-xl bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Congratulations Popup</h2>
              <p className="text-xs text-gray-500">Manage the modal shown on user dashboard load.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowCongratsModal(!showCongratsModal)}
                className={`flex items-center gap-2 text-sm font-bold ${showCongratsModal ? 'text-green-600' : 'text-gray-500'}`}
              >
                {showCongratsModal ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                {showCongratsModal ? 'Active' : 'Disabled'}
              </button>
              <Button onClick={handleSaveModalConfig} className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 h-9">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Popup Title</label>
               <input 
                 type="text" 
                 value={congratsTitle}
                 onChange={(e) => setCongratsTitle(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               />
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Highlighted Bonus Amount</label>
               <input 
                 type="text" 
                 value={congratsAmount}
                 onChange={(e) => setCongratsAmount(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
               />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
               <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Live Preview</p>
               <div className="text-center p-4 bg-white rounded shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2">{congratsTitle}</h3>
                  <p className="text-sm text-gray-600">
                    Thank you for trusting us! We are giving you the chance to win up to 
                    <strong className="text-gray-900 mx-1">{congratsAmount}</strong> 
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
