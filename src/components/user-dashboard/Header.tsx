import Image from "next/image";
import { NotificationDropdown } from "@/components/user-dashboard/NotificationDropdown";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Greeting */}
      <h1 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 flex items-center gap-1 md:gap-2 min-w-0">
        <span className="truncate">Good Morning, Bryan</span> <span className="text-base md:text-xl shrink-0">👋</span>
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        <div className="flex items-center gap-3 text-gray-600 z-50">
          <NotificationDropdown />
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900 leading-tight">Bryan Smith</span>
            <span className="text-xs text-gray-500 font-medium">Pro Member</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border-2 border-white shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bryan&backgroundColor=b6e3f4" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
