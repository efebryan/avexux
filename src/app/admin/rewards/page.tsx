"use client";

import { useState, useEffect } from "react";
import { Settings, Save, ToggleLeft, ToggleRight, Edit2, Trash2, Plus, Target, Search } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { DeleteModal } from "@/components/ui/delete-modal";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const daysOfWeek = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tue" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thu" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 0, label: "Sun" },
];

const planLabels: Record<string, string> = {
  bronze: "Bronze Starter",
  silver: "Silver Earner",
  platinum: "Platinum Pro",
  diamond: "Diamond Elite"
};

// Mock Sectors (Fallback)
const mockSectors = [
  { id: "1", label: "₦1,000 Cash", type: "cash", value: 1000, color: "#10b981", isWin: true },
  { id: "2", label: "Try Again 😢", type: "none", value: 0, color: "#64748b", isWin: false },
  { id: "3", label: "Premium Pro", type: "premium", value: 0, color: "#3b82f6", isWin: true },
  { id: "4", label: "Better Luck 🍀", type: "none", value: 0, color: "#475569", isWin: false },
];

export default function AdminRewardsPage() {
  const [sectors, setSectors] = useState<any[]>(mockSectors);
  const [showCongratsModal, setShowCongratsModal] = useState(true);
  const [spinCost, setSpinCost] = useState(500);
  const [isLoading, setIsLoading] = useState(true);

  // Plan Spin Days Config State
  const [spinsPerPlanConfig, setSpinsPerPlanConfig] = useState<Record<string, number[]>>({
    bronze: [5],
    silver: [1, 5],
    platinum: [1, 2, 3, 4, 5],
    diamond: [1, 2, 3, 4, 5]
  });

  // Congrats Modal Config State
  const [congratsTitle, setCongratsTitle] = useState("Dear users, congratulations! 🥳");
  const [congratsAmount, setCongratsAmount] = useState("₦204,000");

  const [sectorToDelete, setSectorToDelete] = useState<{id: string, label: string} | null>(null);
  
  // Sector Edit/Add State
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [sectorForm, setSectorForm] = useState<any>({ id: "", label: "", type: "cash", value: 0, color: "#000000", isWin: false });

  // Rig Spins State
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedRigSector, setSelectedRigSector] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      
      // Load Wheel Settings
      const { data: wheelData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "spin_wheel_config")
        .single();
        
      if (wheelData?.value) {
        setSectors(wheelData.value.sectors);
        setSpinCost(wheelData.value.cost);
      }

      // Load Congrats Modal Settings
      const { data: modalData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "congrats_modal_config")
        .single();

      if (modalData?.value) {
        setShowCongratsModal(modalData.value.active);
        setCongratsTitle(modalData.value.title);
        setCongratsAmount(modalData.value.amount);
      }

      // Load Plan Spin Days Settings
      const { data: planData } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "spins_per_plan_config")
        .single();
      
      if (planData?.value) {
        setSpinsPerPlanConfig(planData.value);
      }

      // Load Users for Rigging
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, email");
      
      if (profiles) setUsers(profiles);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSaveWheelConfig = async () => {
    const supabase = createClient();
    const payload = { cost: spinCost, sectors };
    
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: "spin_wheel_config", value: payload });

    if (error) {
      const errDetails = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        keys: Object.keys(error),
        stringified: JSON.stringify(error, Object.getOwnPropertyNames(error))
      };
      console.error("Save Wheel Error Details:", errDetails);
      toast.error(`Debug Error: ${errDetails.stringified}`);
    } else {
      toast.success("Spin wheel configuration saved successfully!");
    }
  };

  const handleSaveModalConfig = async () => {
    const supabase = createClient();
    const payload = { active: showCongratsModal, title: congratsTitle, amount: congratsAmount };

    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: "congrats_modal_config", value: payload });

    if (error) {
      console.error("Save Popup Error:", error);
      toast.error(`Failed to save popup configuration: ${error.message || JSON.stringify(error)}`);
    } else {
      toast.success("Congratulations popup configuration saved!");
    }
  };

  const handleSavePlanConfig = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: "spins_per_plan_config", value: spinsPerPlanConfig });

    if (error) {
      toast.error(`Failed to save plan config: ${error.message}`);
    } else {
      toast.success("Plan spin days configuration saved!");
    }
  };

  const confirmDeleteSector = () => {
    if (!sectorToDelete) return;
    setSectors(sectors.filter(s => s.id !== sectorToDelete.id));
    setSectorToDelete(null);
    toast.success("Sector removed. Remember to save your wheel config!");
  };

  const handleOpenSectorModal = (sector?: any) => {
    if (sector) {
      setSectorForm(sector);
    } else {
      setSectorForm({ id: Date.now().toString(), label: "", type: "cash", value: 0, color: "#10b981", isWin: true });
    }
    setIsSectorModalOpen(true);
  };

  const handleSaveSector = (e: React.FormEvent) => {
    e.preventDefault();
    const exists = sectors.find(s => s.id === sectorForm.id);
    if (exists) {
      setSectors(sectors.map(s => s.id === sectorForm.id ? sectorForm : s));
    } else {
      setSectors([...sectors, sectorForm]);
    }
    setIsSectorModalOpen(false);
  };

  const handleRigSpin = async () => {
    if (!selectedUser || !selectedRigSector) {
      toast.error("Please select a user and a prize");
      return;
    }
    
    const supabase = createClient();
    const { error } = await supabase.from("spin_overrides").insert({
      user_id: selectedUser.id,
      reward_label: selectedRigSector
    });

    if (error) {
      toast.error("Failed to assign rigged spin");
    } else {
      toast.success(`Spin successfully rigged for ${selectedUser.full_name || selectedUser.email}!`);
      setSelectedUser(null);
      setSelectedRigSector("");
      setSearchQuery("");
    }
  };

  const filteredUsers = users.filter(u => 
    (u.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
    (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl pb-10">
      
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
                        <Button onClick={() => handleOpenSectorModal(sector)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setSectorToDelete({ id: sector.id, label: sector.label })} variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg">
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
             <Button onClick={() => handleOpenSectorModal()} variant="outline" className="w-full border-dashed border-gray-300 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl h-12 transition-all">
               <Plus className="w-4 h-4 mr-2" /> Add New Sector
             </Button>
          </div>
        </Card>

        {/* Rigged Spins Configuration */}
        <Card className="p-6 md:p-8 border border-purple-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 flex items-center justify-center shadow-inner border border-purple-200">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-xl tracking-tight">Rig Spins</h2>
                <p className="text-sm text-gray-500">Guarantee a specific prize for a user's next spin.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 bg-purple-50/50 p-6 rounded-xl border border-purple-100">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Select User</label>
               <div className="relative mb-2">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => {
                     setSearchQuery(e.target.value);
                     if (selectedUser) setSelectedUser(null);
                   }}
                   placeholder="Search by name or email..."
                   className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white"
                 />
               </div>
               
               {/* Search Results Dropdown-like area */}
               {!selectedUser && searchQuery && (
                 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm max-h-40 overflow-y-auto">
                   {filteredUsers.length > 0 ? filteredUsers.map(u => (
                     <button
                       key={u.id}
                       onClick={() => {
                         setSelectedUser(u);
                         setSearchQuery(u.full_name || u.email);
                       }}
                       className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm font-medium border-b border-gray-50 last:border-0"
                     >
                       {u.full_name} <span className="text-xs text-gray-400 block">{u.email}</span>
                     </button>
                   )) : (
                     <div className="px-4 py-3 text-sm text-gray-500 text-center">No users found</div>
                   )}
                 </div>
               )}
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Guaranteed Prize (Sector)</label>
               <select 
                 value={selectedRigSector}
                 onChange={(e) => setSelectedRigSector(e.target.value)}
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white"
               >
                 <option value="">-- Select a Sector --</option>
                 {sectors.map((s, idx) => (
                   <option key={idx} value={s.label}>{s.label}</option>
                 ))}
               </select>

               <div className="mt-4 flex justify-end">
                 <Button onClick={handleRigSpin} disabled={!selectedUser || !selectedRigSector} className="bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-2 rounded-xl shadow-md transition-all w-full md:w-auto">
                   <Target className="w-4 h-4" /> Force Win
                 </Button>
               </div>
            </div>
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
          </div>
        </Card>

        {/* Plan Spin Days Configuration */}
        <Card className="p-6 md:p-8 border border-gray-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 relative z-10">
            <div>
              <h2 className="font-bold text-gray-900 text-xl tracking-tight">Plan Spin Days</h2>
              <p className="text-sm text-gray-500 mt-1">Configure which days of the week each membership plan can spin.</p>
            </div>
            <Button onClick={handleSavePlanConfig} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2 h-10 rounded-xl shadow-md">
              <Save className="w-4 h-4" /> Save Schedule
            </Button>
          </div>

          <div className="space-y-4 relative z-10">
            {Object.keys(spinsPerPlanConfig).map((plan) => (
              <div key={plan} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <div className="font-bold text-gray-800 w-48 mb-3 md:mb-0">
                  {planLabels[plan] || plan}
                </div>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => {
                    const isChecked = spinsPerPlanConfig[plan]?.includes(day.id) || false;
                    return (
                      <label key={day.id} className="flex items-center gap-2 bg-white px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Checkbox 
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            setSpinsPerPlanConfig(prev => {
                              const newPlanDays = checked 
                                ? [...(prev[plan] || []), day.id]
                                : (prev[plan] || []).filter(d => d !== day.id);
                              return { ...prev, [plan]: newPlanDays };
                            });
                          }}
                        />
                        <span className="text-sm font-medium text-gray-600">{day.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      <DeleteModal 
        isOpen={!!sectorToDelete}
        onClose={() => setSectorToDelete(null)}
        onConfirm={confirmDeleteSector}
        itemName={sectorToDelete?.label || ""}
      />

      {/* Sector Edit/Add Modal */}
      <Dialog open={isSectorModalOpen} onOpenChange={setIsSectorModalOpen}>
        <DialogContent className="max-w-md sm:rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-white">
          <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
             <DialogTitle className="text-xl font-bold flex items-center gap-2">
               Sector Details
             </DialogTitle>
             <DialogDescription className="text-slate-300 text-sm mt-1">
               Modify the wheel slice configuration.
             </DialogDescription>
          </div>
          <form onSubmit={handleSaveSector} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Label (Text on Wheel)</label>
              <input type="text" required value={sectorForm.label} onChange={e => setSectorForm({...sectorForm, label: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 bg-gray-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                <select value={sectorForm.type} onChange={e => setSectorForm({...sectorForm, type: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl text-sm bg-gray-50">
                  <option value="cash">Cash</option>
                  <option value="premium">Premium</option>
                  <option value="gift">Gift</option>
                  <option value="none">None (Lose)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Color (Hex)</label>
                <div className="flex gap-2">
                  <input type="color" value={sectorForm.color} onChange={e => setSectorForm({...sectorForm, color: e.target.value})} className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0" />
                  <input type="text" value={sectorForm.color} onChange={e => setSectorForm({...sectorForm, color: e.target.value})} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 uppercase" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Value (₦ Amount)</label>
                <input type="number" value={sectorForm.value} onChange={e => setSectorForm({...sectorForm, value: Number(e.target.value)})} className="w-full px-4 py-2.5 border rounded-xl text-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Is Win?</label>
                <select value={sectorForm.isWin ? "true" : "false"} onChange={e => setSectorForm({...sectorForm, isWin: e.target.value === "true"})} className="w-full px-4 py-2.5 border rounded-xl text-sm bg-gray-50">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t mt-6">
              <Button type="button" variant="ghost" onClick={() => setIsSectorModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-slate-900 text-white rounded-xl">Save Sector</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
