"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "./types";
import { TaskCard } from "@/components/user-dashboard/tasks/TaskCard";
import { TaskFilters } from "@/components/user-dashboard/tasks/TaskFilters";
import { TaskDetailsModal } from "@/components/user-dashboard/tasks/TaskDetailsModal";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

const categories = ["Social Media", "Reviews", "Video Review", "Website Visit"];

export default function TaskCenterPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"available" | "active" | "history">("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // 1. Fetch all active tasks
      const { data: allTasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "Active");

      if (tasksError) {
        toast.error("Failed to load tasks");
        setIsLoading(false);
        return;
      }

      // 2. Fetch user's submissions
      const { data: submissions, error: subError } = await supabase
        .from("task_submissions")
        .select("task_id, status")
        .eq("user_id", user.id);

      const submissionMap = new Map();
      if (submissions && !subError) {
        submissions.forEach(sub => {
          submissionMap.set(sub.task_id, sub.status);
        });
      }

      // 3. Map database records to UI Task type
      const formattedTasks: Task[] = (allTasks || []).map(t => {
        const userStatus = submissionMap.get(t.id) || "Available";
        return {
          id: t.id,
          title: t.title,
          description: t.description,
          reward: Number(t.reward_amount),
          timeEstimate: t.time_estimate || "5 mins",
          category: t.category,
          status: userStatus as TaskStatus,
          advertiser: t.advertiser,
          requirements: t.requirements || []
        };
      });

      setTasks(formattedTasks);
      setIsLoading(false);
    }
    fetchTasks();
  }, []);

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    // 1. Tab Filter
    if (activeTab === "available" && task.status !== "Available") return false;
    if (activeTab === "active" && !["In Progress", "Pending Review"].includes(task.status)) return false;
    if (activeTab === "history" && !["Approved", "Rejected"].includes(task.status)) return false;

    // 2. Search Filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 3. Category Filter
    if (categoryFilter !== "All" && task.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskAction = async (taskId: string, action: "accept" | "submit") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (action === "accept") {
      const { error } = await supabase.from("task_submissions").insert({
        task_id: taskId,
        user_id: user.id,
        status: "In Progress"
      });

      if (error) {
        toast.error("Failed to accept task.");
        return;
      }
      toast.success("Task accepted! Moved to your Active tab.");
    } else if (action === "submit") {
      const { error } = await supabase.from("task_submissions")
        .update({ status: "Pending Review" })
        .eq("task_id", taskId)
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to submit proof.");
        return;
      }
      toast.success("Proof submitted successfully! It is now Pending Review.");
    }

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        if (action === "accept") {
          return { ...t, status: "In Progress" };
        } else if (action === "submit") {
          return { ...t, status: "Pending Review" };
        }
      }
      return t;
    }));
    
    setIsModalOpen(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Center</h1>
        <p className="text-gray-500">Discover new opportunities, track your progress, and submit proof.</p>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab("available")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "available" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Available Tasks
        </button>
        <button 
          onClick={() => setActiveTab("active")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "active" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Active Tasks (In Progress/Pending)
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "history" ? "border-[#0f8538] text-[#0f8538]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          History (Approved/Rejected)
        </button>
      </div>

      <TaskFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-500">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 font-medium">No tasks found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setCategoryFilter("All"); }}
              className="mt-4 text-[#0f8538] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <TaskDetailsModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleTaskAction}
      />
    </div>
  );
}
