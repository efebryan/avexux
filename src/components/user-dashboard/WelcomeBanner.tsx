import { Button } from "@/components/ui/button";
import { Share2, Compass } from "lucide-react";
import Link from "next/link";

export function WelcomeBanner() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <p className="text-gray-600 text-base md:text-lg">
          You've reached <span className="font-semibold text-gray-800">85%</span> of your daily goal. Keep going!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          href="/user/tasks" 
          className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md px-6 py-6 font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        >
          <Compass className="w-5 h-5" />
          Browse Tasks
        </Link>
        <Link 
          href="/user/referrals" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl px-6 py-6 font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        >
          <Share2 className="w-5 h-5" />
          Invite Friends
        </Link>
      </div>
    </div>
  );
}
