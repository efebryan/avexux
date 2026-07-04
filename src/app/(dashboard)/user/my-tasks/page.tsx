"use client";

import { useState } from "react";
import { Task } from "@/app/(dashboard)/user/tasks/types";
import { TaskCard } from "@/components/user-dashboard/tasks/TaskCard";
import { TaskDetailsModal } from "@/components/user-dashboard/tasks/TaskDetailsModal";
import { toast } from "sonner";

// Reusing the same mock data structure for consistency
const mockTasks: Task[] = [
  {
    id: "3",
    title: "Complete Survey on E-commerce Habits",
    description: "Fill out a 10-minute survey regarding your online shopping habits, preferred payment methods, and delivery experiences.",
    reward: 500,
    timeEstimate: "10 mins",
    category: "Surveys",
    status: "In Progress",
    advertiser: "MarketResearch Inc.",
    requirements: ["Must be a frequent online shopper"]
  },
  {
    id: "4",
    title: "Leave a Review on Google Maps",
    description: "Visit our local coffee shop page on Google Maps and leave an honest 5-star review about your experience.",
    reward: 350,
    timeEstimate: "5 mins",
    category: "Reviews",
    status: "Pending Review",
    advertiser: "Daily Brew Coffee",
    requirements: ["Must be physically located in the same city", "Local Guide badge is a plus"]
  },
  {
    id: "5",
    title: "Watch & Like YouTube Video",
    description: "Watch our latest promotional video all the way through, drop a like, and leave a positive comment.",
    reward: 150,
    timeEstimate: "5 mins",
    category: "Video Review",
    status: "Approved",
    advertiser: "Tech Reviews Channel",
    requirements: ["Must watch at least 80% of the video"]
  },
  {
    id: "6",
    title: "Signup for Newsletter",
    description: "Simply navigate to our landing page and subscribe to our weekly newsletter using a valid email address.",
    reward: 100,
    timeEstimate: "2 mins",
    category: "Website Visit",
    status: "Rejected",
    advertiser: "Health & Fitness Weekly",
    requirements: ["Use a valid, active email address", "Confirm the subscription in your inbox"]
  }
];

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeTab, setActiveTab] = useState<"active" | "pending" | "completed" | "rejected">("active");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tasks based on the active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "active" && task.status !== "In Progress") return false;
    if (activeTab === "pending" && task.status !== "Pending Review") return false;
    if (activeTab === "completed" && task.status !== "Approved") return false;
    if (activeTab === "rejected" && task.status !== "Rejected") return false;
    return true;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskAction = (taskId: string, action: "accept" | "submit") => {
    if (action === "submit") {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: "Pending Review" } : t
      ));
      setIsModalOpen(false);
      toast.success("Proof submitted successfully! It is now Pending Review.");
    }
  };

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
          Rejected
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

      <TaskDetailsModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleTaskAction}
      />
    </div>
  );
}
