"use client";

import { useState, useEffect } from "react";
import { Activity, ShieldCheck, MonitorPlay, AlertCircle, Clock, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

interface TaskDisplay {
  id: string;
  name: string;
  reward: string;
  status: string;
  statusColor: string;
  progress: number;
  progressColor: string;
  icon: React.ReactNode;
  iconBg: string;
}

export function ActiveTasksTable() {
  const [tasks, setTasks] = useState<TaskDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyTasks() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // 1. Fetch user's submissions (History, Active, Expired)
      const { data: submissions } = await supabase
        .from("task_submissions")
        .select("task_id, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!submissions || submissions.length === 0) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      const taskIds = submissions.map(sub => sub.task_id);

      // 2. Fetch the corresponding tasks
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("id, title, reward_amount, timer_seconds, category")
        .in("id", taskIds);

      if (tasksData) {
        const taskMap = new Map(tasksData.map(t => [t.id, t]));

        const formatted: TaskDisplay[] = submissions.map(sub => {
          const taskDetails = taskMap.get(sub.task_id);
          if (!taskDetails) return null;

          let currentStatus = sub.status;
          
          // Auto-expire check logic
          if (currentStatus === "In Progress" && sub.created_at && taskDetails.timer_seconds) {
            const expiresAt = new Date(sub.created_at).getTime() + (taskDetails.timer_seconds * 1000);
            if (Date.now() > expiresAt) {
              currentStatus = "Expired";
            }
          }

          // Map status to UI
          let statusColor = "bg-gray-100 text-gray-700";
          let progress = 0;
          let progressColor = "bg-gray-400";
          let icon = <Activity className="w-4 h-4 text-gray-600" />;
          let iconBg = "bg-gray-100";

          if (currentStatus === "In Progress") {
            statusColor = "bg-[#ade5bb]/60 text-[#0f8538]";
            progress = 50;
            progressColor = "bg-[#0f8538]";
            icon = <Clock className="w-4 h-4 text-[#0f8538]" />;
            iconBg = "bg-[#ade5bb]/40";
          } else if (currentStatus === "Pending Review") {
            statusColor = "bg-yellow-100 text-yellow-700";
            progress = 75;
            progressColor = "bg-yellow-500";
            icon = <MonitorPlay className="w-4 h-4 text-yellow-600" />;
            iconBg = "bg-yellow-50";
          } else if (currentStatus === "Approved") {
            statusColor = "bg-[#0f8538] text-white";
            progress = 100;
            progressColor = "bg-[#0f8538]";
            icon = <ShieldCheck className="w-4 h-4 text-white" />;
            iconBg = "bg-[#0f8538]";
          } else if (currentStatus === "Rejected") {
            statusColor = "bg-red-100 text-red-700";
            progress = 100;
            progressColor = "bg-red-500";
            icon = <AlertCircle className="w-4 h-4 text-red-600" />;
            iconBg = "bg-red-50";
          } else if (currentStatus === "Expired") {
            statusColor = "bg-gray-200 text-gray-500";
            progress = 0;
            progressColor = "bg-gray-400";
            icon = <Clock className="w-4 h-4 text-gray-400" />;
            iconBg = "bg-gray-100";
          }

          return {
            id: taskDetails.id,
            name: taskDetails.title,
            reward: `₦${Number(taskDetails.reward_amount).toFixed(2)}`,
            status: currentStatus.toUpperCase(),
            statusColor,
            progress,
            progressColor,
            icon,
            iconBg
          };
        }).filter(Boolean) as TaskDisplay[];

        setTasks(formatted);
      }
      
      setIsLoading(false);
    }
    fetchMyTasks();
  }, []);

  const activeCount = tasks.filter(t => t.status === "IN PROGRESS" || t.status === "PENDING REVIEW").length;

  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mb-8">
      <div className="p-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">My Tasks</h2>
        {!isLoading && (
          <span className="text-xs font-medium text-gray-500">{activeCount} Active</span>
        )}
      </div>
      
      <div className="overflow-x-auto overflow-y-auto max-h-[300px] min-h-[200px] scrollbar-thin scrollbar-thumb-gray-200">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-[#0f8538]" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <Activity className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No tasks in your history yet.</p>
          </div>
        ) : (
          <table className="w-full text-xs text-left relative">
            <thead className="bg-[#f8fafc] text-gray-500 text-[10px] uppercase font-bold tracking-wider sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-2.5 rounded-tl-lg">TASK NAME</th>
                <th className="px-4 py-2.5">REWARD</th>
                <th className="px-4 py-2.5">STATUS</th>
                <th className="px-4 py-2.5 rounded-tr-lg w-40">PROGRESS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {tasks.map((task, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-900 flex items-center gap-2 whitespace-nowrap">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${task.iconBg}`}>
                      {task.icon}
                    </div>
                    {task.name}
                  </td>
                  <td className="px-4 py-2.5 font-bold text-gray-900">
                    {task.reward}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded tracking-wider whitespace-nowrap ${task.statusColor}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                        <div className={`h-1 rounded-full ${task.progressColor}`} style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 w-6">{task.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}
