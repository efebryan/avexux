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
    <div className="max-w-5xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-500">Manage your profile, security preferences, and notifications.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${
                    isActive
                      ? "bg-[#ade5bb]/40 text-[#0f8538]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${isActive ? "text-[#0f8538]" : "text-gray-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
}
