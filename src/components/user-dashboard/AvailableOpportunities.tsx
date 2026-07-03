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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Available Opportunities</h2>
        <Link href="/user/tasks" className="text-[#0f8538] font-bold text-sm hover:underline">View All</Link>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {opportunities.map((task, i) => (
          <Card key={i} className="p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-between hover:border-[#0f8538]/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 uppercase rounded-md tracking-wider ${task.typeColor}`}>
                  {task.type}
                </span>
                <span className="font-bold text-[#0f8538]">{task.reward}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 leading-tight text-[17px]">{task.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{task.desc}</p>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                <Clock className="w-4 h-4" />
                {task.time}
              </div>
              <Button variant="outline" className="rounded-xl border-[#0f8538] text-[#0f8538] hover:bg-[#0f8538] hover:text-white transition-colors font-bold px-5 h-9">
                Accept Task
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
