"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "./types";
import { TaskCard } from "@/components/user-dashboard/tasks/TaskCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

const ranksConfig = [
  { id: "bronze", threshold: 0 },
  { id: "silver", threshold: 18000 },
  { id: "gold", threshold: 42000 },
  { id: "platinum", threshold: 88000 },
];

export default function TaskCenterPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasDeposited, setHasDeposited] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "available" | "active" | "history"
  >("available");
  const router = useRouter();
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[new Date().getDay()];
  const isWeekend = currentDayName === "Saturday" || currentDayName === "Sunday";

  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // 1. Determine user rank
      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id);

      let highestDeposit = 0;
      if (txData) {
        highestDeposit = txData
          .filter(
            (tx: any) =>
              tx.type?.toLowerCase() === "deposit" ||
              (tx.metadata?.description || "")
                .toLowerCase()
                .includes("deposit"),
          )
          .reduce(
            (max: number, tx: any) => Math.max(max, Number(tx.amount)),
            0,
          );
      }

      setHasDeposited(highestDeposit > 0);

      const currentRankIndex = Math.max(
        0,
        ranksConfig.findLastIndex((r) => highestDeposit >= r.threshold),
      );
      const userRank = ranksConfig[currentRankIndex].id;

      // 2. Fetch all active tasks matching their plan
      const { data: allTasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "Active")
        .in("target_plan", ["All", userRank, "all"]); // 'all' lowercase fallback

      if (tasksError) {
        toast.error("Failed to load tasks");
        setIsLoading(false);
        return;
      }

      // 2. Fetch user's submissions
      const { data: submissions, error: subError } = await supabase
        .from("task_submissions")
        .select("task_id, status, created_at")
        .eq("user_id", user.id);

      const submissionMap = new Map();
      if (submissions && !subError) {
        submissions.forEach((sub) => {
          submissionMap.set(sub.task_id, {
            status: sub.status,
            createdAt: sub.created_at,
          });
        });
      }

      // 3. Map database records to UI Task type
      const formattedTasks: Task[] = (allTasks || []).map((t) => {
        const userSub = submissionMap.get(t.id);
        let currentStatus = userSub ? userSub.status : "Available";
        const acceptedAt = userSub ? userSub.createdAt : undefined;

        // Auto-expire check
        if (currentStatus === "In Progress" && acceptedAt && t.timer_seconds) {
          const expiresAt =
            new Date(acceptedAt).getTime() + t.timer_seconds * 1000;
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
          dayOfWeek: t.day_of_week || 'Friday',
          status: currentStatus as TaskStatus,
          advertiser: t.advertiser,
          requirements: t.requirements || [],
        };
      });

      setTasks(formattedTasks);
      setIsLoading(false);
    }
    fetchTasks();
  }, []);

  // Filter Logic
  const filteredTasks = tasks.filter((task) => {
    // Tab Filter
    if (activeTab === "available") {
      if (task.status !== "Available") return false;
      if (task.dayOfWeek !== currentDayName) return false;
    }
    if (
      activeTab === "active" &&
      !["In Progress", "Pending Review"].includes(task.status)
    )
      return false;
    if (
      activeTab === "history" &&
      !["Approved", "Rejected", "Expired"].includes(task.status)
    )
      return false;

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Center</h1>
        <p className="text-gray-500">
          Discover new opportunities, track your progress, and submit proof.
        </p>
      </div>

      {!hasDeposited ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-[#0f8538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f8538]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tasks Locked</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            You need to deposit and join a plan to access the task center and start earning rewards.
          </p>
          <button 
            onClick={() => router.push("/user/wallet")} 
            className="bg-[#0f8538] hover:bg-[#0f8538]/90 text-white font-semibold py-2.5 px-8 rounded-lg shadow-md transition-all"
          >
            Go to Wallet & Join a Plan
          </button>
        </div>
      ) : (
        <>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-500">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 font-medium">
              {activeTab === "available" && isWeekend 
                ? "No available task for the weekend."
                : "No tasks found for this tab."}
            </p>
          </div>
        )}
      </div>
    </>
  )}
    </div>
  );
}
