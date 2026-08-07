"use client";

import { useState, useEffect } from "react";
import { Plus, Search, CheckCircle, XCircle, Eye, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateTaskModal } from "@/components/admin/CreateTaskModal";
import { EditTaskModal } from "@/components/admin/EditTaskModal";
import { TaskPreviewModal } from "@/components/admin/TaskPreviewModal";
import { createClient } from "@/utils/supabase/client";
import { DeleteModal } from "@/components/ui/delete-modal";
import { adminNotifyUserAction } from "../actions";

export default function AdminTasksPage() {
  const [activeTab, setActiveTab] = useState<"manage" | "review">("manage");
  const [tasks, setTasks] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTaskForPreview, setSelectedTaskForPreview] = useState<any | null>(null);
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<any | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<{id: string, title: string} | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // Fetch all tasks
      const { data: allTasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch all submissions with user details
      const { data: allSubmissions, error: subError } = await supabase
        .from("task_submissions")
        .select(`
          *,
          profiles:user_id ( full_name )
        `)
        .order("created_at", { ascending: false });

      if (allTasks) {
        setTasks(allTasks.map(t => {
          const actualSubmissionsCount = allSubmissions ? allSubmissions.filter(s => s.task_id === t.id).length : 0;
          return {
            ...t,
            created: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            reward: Number(t.reward_amount),
            submissions: actualSubmissionsCount,
          };
        }));
      }

      if (allSubmissions) {
        setSubmissions(allSubmissions.map(s => {
          const t = allTasks?.find(task => task.id === s.task_id);
          return {
            id: s.id,
            taskId: s.task_id,
            userId: s.user_id,
            taskTitle: t?.title || "Unknown Task",
            taskReward: t?.reward_amount || 0,
            user: s.profiles?.full_name || "Unknown User",
            date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: s.status,
          };
        }));
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Paused" : "Active";
    const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", id);
    if (!error) {
      setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
      toast.success(`Task status changed to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const handleSubmissionAction = async (id: string, action: "Approved" | "Rejected") => {
    let error;
    
    if (action === "Approved") {
      const res = await supabase.rpc('approve_task_submission', { submission_id: id });
      error = res.error;
    } else {
      const res = await supabase.from("task_submissions").update({ status: action }).eq("id", id);
      error = res.error;
    }

    if (!error) {
      setSubmissions(submissions.map(s => (s.id === id ? { ...s, status: action } : s)));
      toast.success(`Submission ${action.toLowerCase()}`);
      
      // Notify the user
      const sub = submissions.find(s => s.id === id);
      if (sub && sub.userId) {
        if (action === "Approved") {
          await adminNotifyUserAction(
            sub.userId,
            "Task Approved",
            `Your submission for "${sub.taskTitle}" was approved! You earned ₦${sub.taskReward.toLocaleString()}.`,
            "success",
            "Task"
          );
        } else if (action === "Rejected") {
          await adminNotifyUserAction(
            sub.userId,
            "Task Rejected",
            `Your submission for "${sub.taskTitle}" was rejected by the admin.`,
            "warning",
            "Task"
          );
        }
      }
    } else {
      console.error("Submission Error:", error);
      toast.error(`Error: ${error.message || "Failed to update submission"}`);
    }
  };

  const handleCreateTask = (newTask: any) => {
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    const { error } = await supabase.from("tasks").delete().eq("id", taskToDelete.id);
    if (!error) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
      toast.success("Task deleted successfully.");
    } else {
      toast.error("Failed to delete task.");
    }
    setTaskToDelete(null);
  };

  const handleEditTask = (task: any) => {
    setSelectedTaskForEdit(task);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0f8538]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">Task Management</h1>
          <p className="text-slate-500 text-sm">Create earning opportunities and review user proofs.</p>
        </div>
        {activeTab === "manage" && (
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-primary hover:bg-primary/95 text-white font-medium flex items-center gap-2 rounded-xl shadow-md hover:-translate-y-0.5 transition-all">
            <Plus className="w-4 h-4" /> Create New Task
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab("manage")}
          className={`pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === "manage" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Manage Tasks
        </button>
        <button 
          onClick={() => setActiveTab("review")}
          className={`pb-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === "review" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Review Submissions
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-extrabold">
            {submissions.filter(s => s.status === "Pending Review").length}
          </span>
        </button>
      </div>

      {/* Content based on Tab */}
      {activeTab === "manage" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Task Details</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Target Plan</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Reward</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Submissions</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tasks.length > 0 ? tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 leading-tight">{task.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{task.advertiser} • {task.created}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">
                        {task.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                        {task.target_plan === "Premium" ? "Premium" : task.target_plan === "All" ? "All Plans" : task.target_plan?.charAt(0).toUpperCase() + task.target_plan?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-emerald-600">
                      ₦{task.reward.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      <span className="text-primary font-bold">{task.submissions}</span> submitted
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleTaskStatus(task.id, task.status)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider transition-colors border ${
                          task.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {task.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedTaskForPreview(task)} 
                          title="Preview Task Details"
                          className="h-8 w-8 p-0 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditTask(task)} 
                          title="Edit Task"
                          className="h-8 w-8 p-0 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setTaskToDelete({ id: task.id, title: task.title })} 
                          title="Delete Task"
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500 font-medium">No tasks found. Create one to get started!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">User</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Task</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Submitted</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Review Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {submissions.length > 0 ? submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{sub.user}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{sub.taskTitle}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-medium">{sub.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                        sub.status === "Pending Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        sub.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {sub.status === "Pending Review" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedTaskForPreview(tasks.find(t => t.id === sub.taskId) || { title: sub.taskTitle, category: "Submission", advertiser: sub.user, reward: 0, status: sub.status, created: sub.date, description: `Proof submitted by ${sub.user}. Verification pending approval.` })}
                            className="h-8 text-xs font-bold text-primary border-primary/20 hover:bg-primary/10 flex gap-1 rounded-lg"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleSubmissionAction(sub.id, "Approved")}
                            className="h-8 text-xs font-bold bg-primary hover:bg-primary/95 text-white rounded-lg shadow-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSubmissionAction(sub.id, "Rejected")}
                            className="h-8 text-xs font-bold text-red-600 border-red-200 hover:bg-red-50 rounded-lg"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Reviewed</span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-slate-500 font-medium">No submissions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreateTaskModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreate={handleCreateTask}
      />

      <EditTaskModal 
        isOpen={!!selectedTaskForEdit}
        onClose={() => setSelectedTaskForEdit(null)}
        task={selectedTaskForEdit}
        onTaskUpdate={handleUpdateTask}
      />

      <TaskPreviewModal 
        isOpen={!!selectedTaskForPreview}
        onClose={() => setSelectedTaskForPreview(null)}
        task={selectedTaskForPreview}
      />

      <DeleteModal 
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
        itemName={taskToDelete?.title || ""}
      />
    </div>
  );
}
