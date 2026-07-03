import { Bell } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Greeting */}
      <h1 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-1.5 md:gap-2">
        Good Morning, Bryan <span className="text-lg md:text-xl">👋</span>
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        {/* Icons */}
        <div className="flex items-center gap-3 text-gray-600">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#f8fafc]"></span>
          </button>
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
