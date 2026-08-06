import { useState, useEffect } from "react";
import { Task } from "@/app/(dashboard)/user/tasks/types";
import { Card } from "@/components/ui/card";
import { Clock, Tag, Building2, ChevronRight } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (task.status === "In Progress" && task.acceptedAt && task.timerSeconds) {
      const expiresAt = new Date(task.acceptedAt).getTime() + (task.timerSeconds * 1000);
      
      const updateTimer = () => {
        const remaining = Math.floor((expiresAt - Date.now()) / 1000);
        setTimeLeft(remaining > 0 ? remaining : 0);
      };

      updateTimer(); // Initial call
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(null);
    }
  }, [task]);

  const isExpiredLocally = timeLeft !== null && timeLeft <= 0;
  const currentStatus = isExpiredLocally ? "Expired" : task.status;

  const getStatusColor = (status: Task["status"] | "Expired") => {
    switch (status) {
      case "Available": return "bg-gray-100 text-gray-700";
      case "In Progress": return "bg-blue-100 text-blue-700 animate-pulse";
      case "Pending Review": return "bg-yellow-100 text-yellow-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      case "Expired": return "bg-gray-800 text-white";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const displayTime = timeLeft !== null 
    ? (timeLeft > 0 ? `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s left` : "0m 0s left")
    : task.timeEstimate;

  return (
    <Card 
      onClick={() => onClick({ ...task, status: currentStatus as Task["status"] })}
      className={`p-3.5 rounded-xl border shadow-sm transition-all cursor-pointer group flex flex-col ${isExpiredLocally ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-md hover:border-[#0f8538]/30'}`}
    >
      <div className="flex justify-between items-start mb-2.5">
        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getStatusColor(currentStatus)}`}>
          {currentStatus}
        </span>
        <span className="font-bold text-xs text-[#0f8538] bg-[#ade5bb]/20 px-2 py-0.5 rounded">
          ₦{task.reward.toLocaleString()}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#0f8538] transition-colors line-clamp-2">
        {task.title}
      </h3>
      
      <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
        {task.description}
      </p>
 
      <div className="flex items-center gap-3 text-[11px] font-medium mt-auto pt-3 border-t border-gray-50">
        <div className={`flex items-center gap-1 ${timeLeft !== null && timeLeft <= 10 && timeLeft > 0 ? 'text-red-500 font-bold animate-pulse' : 'text-gray-500'}`}>
          <Clock className="w-3 h-3" />
          {displayTime}
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Tag className="w-3 h-3" />
          {task.category}
        </div>
      </div>
    </Card>
  );
}
