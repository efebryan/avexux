import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          type="text" 
          placeholder="Search tasks or activities.." 
          className="pl-10 py-5 bg-white border-none rounded-full shadow-sm text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-200 w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        {/* Balance Chip */}
        <div className="hidden sm:flex items-center bg-[#ade5bb]/40 text-[#0f8538] font-bold px-4 py-2 rounded-full gap-2 border border-[#ade5bb]">
          <WalletIcon className="w-4 h-4" />
          <span>₦2,450.00</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 text-gray-600">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#f8fafc]"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
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

function WalletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}
