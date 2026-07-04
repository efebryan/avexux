import { NotificationDropdown } from "@/components/user-dashboard/NotificationDropdown";
import { ProfileDropdown } from "@/components/user-dashboard/ProfileDropdown";

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

        {/* User Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </div>
  );
}
