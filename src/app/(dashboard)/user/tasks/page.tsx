"use client";

import { useState } from "react";
import { Task, TaskStatus } from "./types";
import { TaskCard } from "@/components/user-dashboard/tasks/TaskCard";
import { TaskFilters } from "@/components/user-dashboard/tasks/TaskFilters";
import { TaskDetailsModal } from "@/components/user-dashboard/tasks/TaskDetailsModal";
import { toast } from "sonner";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Test our new Banking App UI",
    description: "We need users to test the newly designed transfer flow in our beta banking app. Please record your screen while completing a transfer and provide feedback on the ease of use.",
    reward: 1500,
    timeEstimate: "15 mins",
    category: "App Testing",
    status: "Available",
    advertiser: "FinTech Corp",
    requirements: ["Must have an Android device", "Screen recording software required", "Must speak clearly during recording"]
  },
  {
    id: "2",
    title: "Follow & Retweet Crypto Campaign",
    description: "Follow our official Twitter account and retweet the pinned post. Help us spread the word about our upcoming token launch!",
    reward: 200,
    timeEstimate: "2 mins",
    category: "Social Media",
    status: "Available",
    advertiser: "CryptoLaunch",
    requirements: ["Twitter account must be at least 6 months old", "Must have at least 50 followers"]
  },
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

const categories = ["App Testing", "Social Media", "Surveys", "Reviews", "Video Review", "Website Visit"];

export default function TaskCenterPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeTab, setActiveTab] = useState<"available" | "active" | "history">("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleTaskAction = (taskId: string, action: "accept" | "submit") => {
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
    
    if (action === "accept") {
      toast.success("Task accepted! Moved to your Active tab.");
    } else {
      toast.success("Proof submitted successfully! It is now Pending Review.");
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
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
