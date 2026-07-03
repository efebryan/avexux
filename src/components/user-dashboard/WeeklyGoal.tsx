import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WeeklyGoal() {
  return (
    <Card className="p-6 border border-gray-100 shadow-sm rounded-2xl mb-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Weekly Goal</h3>
      
      {/* Circular Progress (Mocked) */}
      <div className="relative flex justify-center mb-8">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="56" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
          <circle 
            cx="64" cy="64" r="56" fill="transparent" stroke="#0f8538" strokeWidth="12" 
            strokeDasharray="351.85" strokeDashoffset="52.77" strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0f8538]">85%</span>
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1">Goal</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Target:</span>
          <span className="font-bold text-gray-900">₦500.00</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Achieved:</span>
          <span className="font-bold text-[#0f8538]">₦425.20</span>
        </div>
      </div>

      <Button className="w-full bg-[#f1f5f9] hover:bg-gray-200 text-[#0f8538] font-bold rounded-xl py-5 shadow-none border border-transparent transition-colors">
        Adjust Goal
      </Button>
    </Card>
  );
}
