"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    setIsOpen(false);
    // Redirect to home/login page
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity text-left focus:outline-none"
      >
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-bold text-gray-900 leading-tight">Bryan Smith</span>
          <span className="text-xs text-gray-500 font-medium">Pro Member</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border-2 border-white shadow-sm transition-all hover:scale-105">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bryan&backgroundColor=b6e3f4" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden p-1.5 space-y-0.5">
          {/* Settings */}
          <Link
            href="/user/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            Settings
          </Link>

          {/* Change Password */}
          <Link
            href="/user/settings?tab=security"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            Change Password
          </Link>

          <hr className="border-gray-100 my-1 mx-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
