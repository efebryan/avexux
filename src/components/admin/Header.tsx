import { ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Greeting */}
      <h1 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 flex items-center gap-1 md:gap-2 min-w-0">
        <ShieldAlert className="w-6 h-6 text-blue-600 hidden md:block" />
        <span className="truncate">Admin Dashboard</span>
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           System Online
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Admin Logout */}
        <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 flex gap-2">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
}
