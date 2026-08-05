"use client";

import { useState, useEffect } from "react";
import { NotificationDropdown } from "@/components/user-dashboard/NotificationDropdown";
import { ProfileDropdown } from "@/components/user-dashboard/ProfileDropdown";
import { createClient } from "@/utils/supabase/client";

export function Header() {
  const [fullName, setFullName] = useState<string>("User");
  
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle();
        if (profile?.full_name) {
          setFullName(profile.full_name);
        }
      }
    };
    fetchUser();
  }, []);

  const firstName = fullName.split(' ')[0];

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Greeting */}
      <h1 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 flex items-center gap-1 md:gap-2 min-w-0">
        <span className="truncate">Good Morning, {firstName}</span> <span className="text-base md:text-xl shrink-0">👋</span>
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        <div className="flex items-center gap-3 text-gray-600 z-50">
          <NotificationDropdown />
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* User Profile Dropdown */}
        <ProfileDropdown fullName={fullName} />
      </div>
    </div>
  );
}
