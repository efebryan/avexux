"use client";

import { useState } from "react";
import { User, Shield, Bell } from "lucide-react";
import { ProfileSettings } from "@/components/user-dashboard/settings/ProfileSettings";
import { SecuritySettings } from "@/components/user-dashboard/settings/SecuritySettings";
import { NotificationSettings } from "@/components/user-dashboard/settings/NotificationSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Management", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-500 text-sm">Manage your profile, security preferences, and notifications.</p>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-[#0f8538] text-[#0f8538]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? "text-[#0f8538]" : "text-gray-400"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
}
