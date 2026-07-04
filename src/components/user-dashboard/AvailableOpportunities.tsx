import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const filters = ["All Tasks", "Website Visit", "Survey", "AI Training", "App Testing", "Video Review"];

const opportunities = [
  {
    type: "AI TRAINING",
    typeColor: "bg-[#ade5bb]/60 text-[#0f8538]",
    reward: "₦1.50",
    title: "Categorize Image Datasets",
    desc: "Identify objects in 50 images for autonomous driving models.",
    time: "5 min",
  },
  {
    type: "WEBSITE VISIT",
    typeColor: "bg-gray-200 text-gray-700",
    reward: "₦0.45",
    title: "Browse E-commerce UI",
    desc: "Navigate through 5 pages and provide UX feedback.",
    time: "2 min",
  },
  {
    type: "SURVEY",
    typeColor: "bg-[#ade5bb]/60 text-[#0f8538]",
    reward: "₦3.20",
    title: "Tech Spending Habits 2024",
    desc: "Comprehensive survey on consumer electronic purchases.",
    time: "12 min",
  },
];

export function AvailableOpportunities() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">Available Opportunities</h2>
        <Link href="/user/tasks" className="text-[#0f8538] font-bold text-xs hover:underline">View All</Link>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 mb-3 scrollbar-hide">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              index === 0
                ? "bg-[#0f8538] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {opportunities.map((task, i) => (
          <Card key={i} className="p-3.5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between hover:border-[#0f8538]/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 uppercase rounded tracking-wider ${task.typeColor}`}>
                  {task.type}
                </span>
                <span className="font-bold text-sm text-[#0f8538]">{task.reward}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 leading-tight text-sm">{task.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{task.desc}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                <Clock className="w-3.5 h-3.5" />
                {task.time}
              </div>
              <Button variant="outline" className="rounded-lg border-[#0f8538] text-[#0f8538] hover:bg-[#0f8538] hover:text-white transition-colors font-bold px-3.5 h-8 text-xs">
                Accept Task
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
