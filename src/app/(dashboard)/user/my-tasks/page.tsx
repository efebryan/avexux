"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/app/(dashboard)/user/tasks/types";
import { TaskCard } from "@/components/user-dashboard/tasks/TaskCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "pending" | "completed" | "rejected">("active");
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Fetch user's submissions
      const { data: submissions, error: subError } = await supabase
        .from("task_submissions")
        .select("task_id, status, created_at")
        .eq("user_id", user.id);

      if (!submissions || submissions.length === 0) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      const taskIds = submissions.map(s => s.task_id);

      // Fetch the tasks for those submissions
      const { data: userTasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .in("id", taskIds);

      const submissionMap = new Map();
      submissions.forEach(sub => {
        submissionMap.set(sub.task_id, { status: sub.status, createdAt: sub.created_at });
      });

      const formattedTasks: Task[] = (userTasks || []).map(t => {
        const userSub = submissionMap.get(t.id);
        let currentStatus = userSub ? userSub.status : "Available";
        const acceptedAt = userSub ? userSub.createdAt : undefined;

        // Auto-expire check
        if (currentStatus === "In Progress" && acceptedAt && t.timer_seconds) {
          const expiresAt = new Date(acceptedAt).getTime() + (t.timer_seconds * 1000);
          if (Date.now() > expiresAt) {
            currentStatus = "Expired";
          }
        }

        return {
          id: t.id,
          title: t.title,
          description: t.description,
          reward: Number(t.reward_amount),
          timeEstimate: t.timer_seconds ? `${t.timer_seconds}s` : "30s",
          timerSeconds: t.timer_seconds,
          taskLink: t.task_link,
          acceptedAt,
          category: t.category,
          status: currentStatus as TaskStatus,
          advertiser: t.advertiser,
          requirements: t.requirements || []
        };
      });

      // Filter out tasks that are still "Available" (should not happen if they have submissions)
      setTasks(formattedTasks.filter(t => t.status !== "Available"));
      setIsLoading(false);
    }
    fetchTasks();
  }, []);

  // Filter tasks based on the active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "active" && task.status !== "In Progress") return false;
    if (activeTab === "pending" && task.status !== "Pending Review") return false;
    if (activeTab === "completed" && task.status !== "Approved") return false;
    if (activeTab === "rejected" && !["Rejected", "Expired"].includes(task.status)) return false;
    return true;
  });

  const handleTaskClick = (task: Task) => {
    router.push("/user/tasks/" + task.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0f8538]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-500">Track your ongoing work, submissions, and finalized tasks.</p>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 border-b border-gray-200 mb-8">
        <button 
          onClick={() => setActiveTab("active")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "active" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Active Tasks
        </button>
        <button 
          onClick={() => setActiveTab("pending")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "pending" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Pending Review
        </button>
        <button 
          onClick={() => setActiveTab("completed")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "completed" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Completed
        </button>
        <button 
          onClick={() => setActiveTab("rejected")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "rejected" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Rejected / Expired
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-500">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 font-medium">No tasks found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
