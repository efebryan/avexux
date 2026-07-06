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
  Network,
  KeyRound,
  History,
  Activity,
  Mail,
  Smartphone
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enforce2FA, setEnforce2FA] = useState(true);

  // Helper to render active tab styling
  const getTabClass = (tabId: string) => {
    return activeTab === tabId 
      ? "flex items-center gap-2 text-[13px] font-bold text-slate-900 border-b-2 border-slate-900 pb-3 -mb-[13.5px] transition-colors"
      : "flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-700 pb-3 -mb-[13.5px] transition-colors";
  };

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
        <button onClick={() => setActiveTab('general')} className={getTabClass('general')}>
          <Settings2 className="w-4 h-4" /> General
        </button>
        <button onClick={() => setActiveTab('security')} className={getTabClass('security')}>
          <ShieldCheck className="w-4 h-4" /> Security
        </button>
        <button onClick={() => setActiveTab('notifications')} className={getTabClass('notifications')}>
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button onClick={() => setActiveTab('roles')} className={getTabClass('roles')}>
          <Users className="w-4 h-4" /> Roles & Permissions
        </button>
        <button onClick={() => setActiveTab('logs')} className={getTabClass('logs')}>
          <FileText className="w-4 h-4" /> System Logs
        </button>
      </div>

      <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* ================= GENERAL TAB ================= */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
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
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                      <option>30 Minutes</option>
                      <option>1 Hour</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">MAX LOGIN ATTEMPTS</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white pr-10">
                      <option>5 Attempts</option>
                      <option>3 Attempts</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-[11px] pointer-events-none" />
                  </div>
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
                <p className="text-[11px] text-slate-500 mt-2">Only allow admin access from these specific IP addresses or subnets. Leave blank to allow all.</p>
              </div>
            </Card>

          </div>
        )}

        {/* ================= SECURITY TAB ================= */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <KeyRound className="w-[18px] h-[18px] text-slate-700" /> Password Policies
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Minimum Password Length</label>
                  <input type="number" defaultValue={12} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white" />
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">Require special characters</span>
                    <span className="text-[11px] text-slate-500">Force users to include at least one symbol (!@#$%)</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">Password Expiration</span>
                    <span className="text-[11px] text-slate-500">Require password change every 90 days</span>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <Activity className="w-[18px] h-[18px] text-slate-700" /> Session Management
              </h2>
              <div className="space-y-5">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">Prevent Concurrent Logins</span>
                    <span className="text-[11px] text-slate-500">Don't allow the same user to log in from multiple devices</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
                <div>
                  <Button variant="outline" className="w-full text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 font-bold">
                    Terminate All Active Sessions
                  </Button>
                  <p className="text-[11px] text-slate-500 mt-2 text-center">This will immediately log out all active admin and standard users.</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ================= NOTIFICATIONS TAB ================= */}
        {activeTab === 'notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <Mail className="w-[18px] h-[18px] text-slate-700" /> System Email Settings
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Server</label>
                  <input type="text" defaultValue="smtp.sendgrid.net" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">SMTP Port</label>
                    <input type="text" defaultValue="587" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Security</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium appearance-none">
                      <option>TLS</option>
                      <option>SSL</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Sender Email Address</label>
                  <input type="text" defaultValue="noreply@arvexus.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium" />
                </div>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold h-10 rounded-lg">
                  Test Email Connection
                </Button>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <Smartphone className="w-[18px] h-[18px] text-slate-700" /> Admin Alerts
              </h2>
              <div className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">New User Registrations</span>
                    <span className="text-[11px] text-slate-500">Receive an email when a new user signs up</span>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">Large Withdrawals</span>
                    <span className="text-[11px] text-slate-500">Alert for withdrawals over ₦50,000</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[13px] text-slate-900 block">System Errors & Crashes</span>
                    <span className="text-[11px] text-slate-500">Immediate alerts for critical system failures</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 accent-blue-600" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ================= ROLES & PERMISSIONS TAB ================= */}
        {activeTab === 'roles' && (
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Administrative Roles</h2>
                <p className="text-[13px] text-slate-500 mt-1">Manage what different admin levels can access and modify.</p>
              </div>
              <Button className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-lg px-4 h-10 shadow-sm">
                + Create New Role
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Role Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Users Count</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 font-bold text-[11px] uppercase tracking-wider">Super Admin</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Full access to all system settings, financials, and users.</td>
                    <td className="px-6 py-4 font-bold text-slate-900">2</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-bold text-[11px] uppercase tracking-wider">Manager</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Can view and modify users, tasks, and payouts. No settings access.</td>
                    <td className="px-6 py-4 font-bold text-slate-900">5</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider">Support</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Read-only access to user data and logs.</td>
                    <td className="px-6 py-4 font-bold text-slate-900">12</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ================= SYSTEM LOGS TAB ================= */}
        {activeTab === 'logs' && (
          <Card className="border border-slate-200 shadow-sm rounded-xl bg-white flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Audit Trail</h2>
                <p className="text-[13px] text-slate-500 mt-1">Review recent administrative actions and system events.</p>
              </div>
              <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 font-bold border-slate-200 rounded-lg px-4 h-10 shadow-sm">
                Download CSV
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Admin User</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-slate-500">Oct 24, 2023 - 14:32:01</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Admin User (Primary)</td>
                    <td className="px-6 py-4 text-slate-700">Updated <span className="font-bold">System Timezone</span> to (GMT-05:00)</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">192.168.1.1</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-slate-500">Oct 24, 2023 - 10:15:42</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Support (Sarah M.)</td>
                    <td className="px-6 py-4 text-slate-700">Approved withdrawal request <span className="font-bold text-green-600">#TXN-88210</span></td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">10.0.4.22</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-slate-500">Oct 23, 2023 - 09:00:11</td>
                    <td className="px-6 py-4 font-bold text-slate-900">System (Auto)</td>
                    <td className="px-6 py-4 text-slate-700">Generated daily financial report.</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">localhost</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

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
