import { Task } from "@/app/(dashboard)/user/tasks/types";
import { Card } from "@/components/ui/card";
import { Clock, Tag, Building2, ChevronRight } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Available": return "bg-gray-100 text-gray-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Pending Review": return "bg-yellow-100 text-yellow-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card 
      onClick={() => onClick(task)}
      className="p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0f8538]/30 transition-all cursor-pointer group flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className="font-bold text-[#0f8538] bg-[#ade5bb]/20 px-3 py-1 rounded-lg">
          ₦{task.reward.toLocaleString()}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#0f8538] transition-colors line-clamp-2">
        {task.title}
      </h3>
      
      <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
        {task.description}
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {task.timeEstimate}
        </div>
        <div className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          {task.category}
        </div>
      </div>
    </Card>
  );
}
