"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  ShieldCheck, 
  Bell, 
  Users, 
  FileText,
  CheckCircle2,
  ChevronDown,
  Settings2,
  Network
} from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enforce2FA, setEnforce2FA] = useState(true);

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1">System Settings</h1>
          <p className="text-slate-500 text-sm">Manage global configurations, security policies, and administrative roles.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-lg px-5 h-10 shadow-sm">
            Discard Changes
          </Button>
          <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-lg px-5 h-10 shadow-sm">
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 pb-3 overflow-x-auto whitespace-nowrap">
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-900 border-b-2 border-slate-900 pb-3 -mb-[13.5px]">
          <Settings2 className="w-4 h-4" /> General
        </button>
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-700 pb-3 -mb-[13.5px]">
          <ShieldCheck className="w-4 h-4" /> Security
        </button>
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-700 pb-3 -mb-[13.5px]">
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-700 pb-3 -mb-[13.5px]">
          <Users className="w-4 h-4" /> Roles & Permissions
        </button>
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-700 pb-3 -mb-[13.5px]">
          <FileText className="w-4 h-4" /> System Logs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Platform Branding */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-xl bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Platform Branding</h2>
            <span className="text-[11px] text-slate-400 font-medium">Updated 2h ago</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-shrink-0 w-[140px]">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Platform Logo</label>
              <div className="w-full aspect-square bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-slate-500 transition-colors mb-2">
                <Upload className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Replace</span>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex flex-col pt-6 sm:flex-row gap-4 mb-2">
                 <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  Upload a square SVG or PNG.<br/>Max size 2MB.<br/>Recommendation:<br/>512x512px.
                 </p>
              </div>
              <button className="text-slate-900 font-bold text-[13px] hover:underline mb-2 block">Remove current logo</button>

              <div className="space-y-5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-1 w-full relative -mt-32 md:-mt-36 ml-0 md:ml-40 lg:ml-48">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Site Title</label>
                    <input 
                      type="text" 
                      defaultValue="Arvexus Corporate Suite" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-1 w-full relative ml-0 md:ml-40 lg:ml-48">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Copyright Text</label>
                    <input 
                      type="text" 
                      defaultValue="© 2024 Arvexus Intelligence Systems" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className="lg:col-span-1 border border-slate-200 shadow-sm rounded-xl bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">System Status</h2>
            <div 
              className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${maintenanceMode ? 'bg-primary' : 'bg-slate-200'}`}
              onClick={() => setMaintenanceMode(!maintenanceMode)}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${maintenanceMode ? 'translate-x-5.5' : 'translate-x-0.5'}`}></div>
            </div>
          </div>

          <div className="bg-green-50/50 border border-green-100/60 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-bold text-[13px] text-slate-900">Systems Operational</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maintenance mode is currently <span className="font-bold text-slate-700">DISABLED</span>. Users can access all services normally.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Maintenance Message</label>
            <textarea 
              rows={3}
              placeholder="Enter message to display to users during downtime..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white resize-none"
            ></textarea>
          </div>
        </Card>

        {/* Regional & Localization */}
        <Card className="lg:col-span-3 border border-slate-200 shadow-sm rounded-xl bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">Regional & Localization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">System Timezone</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                  <option>(GMT-05:00) Eastern Time</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Primary Language</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                  <option>English (US)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Base Currency</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                  <option>USD - United States Dollar</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Date Format</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                  <option>MM/DD/YYYY</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
              </div>
            </div>
          </div>
        </Card>

        {/* Authentication Policies */}
        <Card className="lg:col-span-1 border border-slate-200 shadow-sm rounded-xl bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
            <ShieldCheck className="w-[18px] h-[18px] text-slate-700" /> Authentication Policies
          </h2>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center mb-6">
            <span className="font-bold text-[13px] text-slate-900">Enforce 2FA</span>
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={enforce2FA}
                onChange={() => setEnforce2FA(!enforce2FA)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600" 
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">SESSION TIMEOUT</label>
               {/* Empty to match the screenshot cropped area */}
            </div>
            <div className="flex-1">
               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">MAX LOGIN ATTEMPTS</label>
               {/* Empty to match the screenshot cropped area */}
            </div>
          </div>
        </Card>

        {/* Access Control */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-xl bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
            <Network className="w-[18px] h-[18px] text-slate-700" /> Access Control
          </h2>
          
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">IP WHITELISTING (IPV4/IPV6)</label>
            <input 
              type="text" 
              placeholder="e.g. 192.168.1.1, 10.0.0.0/24" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white"
            />
          </div>
        </Card>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 xl:left-72 bg-white border-t border-slate-200 p-4 px-6 lg:px-8 flex justify-end items-center gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-40">
        <button className="text-[13px] font-bold text-slate-600 hover:text-slate-900">
          Cancel
        </button>
        <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-lg px-6 h-10 shadow-sm">
          Update Global Settings
        </Button>
      </div>

    </div>
  );
}
