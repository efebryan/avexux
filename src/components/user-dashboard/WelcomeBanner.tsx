import { Button } from "@/components/ui/button";
import { Share2, Compass } from "lucide-react";

export function WelcomeBanner() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          Good Morning, Bryan <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          You've reached <span className="font-semibold text-gray-800">85%</span> of your daily goal. Keep going!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md px-6 py-6 font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5">
          <Compass className="w-5 h-5" />
          Browse Tasks
        </Button>
        <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5">
          <Share2 className="w-5 h-5" />
          Invite Friends
        </Button>
      </div>
    </div>
  );
}
