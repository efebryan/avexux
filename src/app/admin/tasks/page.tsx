"use client";

import { useState } from "react";
import { Plus, Search, CheckCircle, XCircle, Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateTaskModal } from "@/components/admin/CreateTaskModal";

// Mock Data
const mockTasks = [
  { id: "1", title: "Test our new Banking App UI", category: "App Testing", advertiser: "FinTech Corp", reward: 1500, submissions: 45, status: "Active", created: "Oct 20, 2023" },
  { id: "2", title: "Follow & Retweet Crypto Campaign", category: "Social Media", advertiser: "CryptoLaunch", reward: 200, submissions: 120, status: "Active", created: "Oct 21, 2023" },
  { id: "3", title: "Complete Survey on E-commerce", category: "Surveys", advertiser: "MarketResearch Inc.", reward: 500, submissions: 8, status: "Paused", created: "Oct 22, 2023" },
];

const mockSubmissions = [
  { id: "s1", taskId: "1", taskTitle: "Test our new Banking App UI", user: "john_doe99", date: "2 hours ago", status: "Pending" },
  { id: "s2", taskId: "2", taskTitle: "Follow & Retweet Crypto Campaign", user: "sarah_tasks", date: "5 hours ago", status: "Pending" },
  { id: "s3", taskId: "2", taskTitle: "Follow & Retweet Crypto Campaign", user: "mike_hustle", date: "1 day ago", status: "Approved" },
];

export default function AdminTasksPage() {
  const [activeTab, setActiveTab] = useState<"manage" | "review">("manage");
  const [tasks, setTasks] = useState(mockTasks);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newStatus = t.status === "Active" ? "Paused" : "Active";
        toast.success(`Task status changed to ${newStatus}`);
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const handleSubmissionAction = (id: string, action: "Approved" | "Rejected") => {
    setSubmissions(submissions.map(s => {
      if (s.id === id) {
        toast.success(`Submission ${action.toLowerCase()}`);
        return { ...s, status: action };
      }
      return s;
    }));
  };

  const handleCreateTask = (newTask: any) => {
    setTasks([newTask, ...tasks]);
  };

  const handleDeleteTask = (id: string, title: string) => {
    if (confirm(`Delete task "${title}"? This cannot be undone.`)) {
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success("Task deleted successfully.");
    }
  };

  const handleEditTask = (id: string) => {
    toast.info("Task editor coming soon — for now use the Create modal.");
  };

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
            {submissions.filter(s => s.status === "Pending").length}
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
                  <th className="px-6 py-4 font-bold tracking-wider">Reward</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Submissions</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tasks.map((task) => (
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
                    <td className="px-6 py-4 font-extrabold text-emerald-600">
                      ₦{task.reward.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      <span className="text-primary font-bold">{task.submissions}</span> completed
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider transition-colors border ${
                          task.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {task.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" onClick={() => handleEditTask(task.id)} className="h-8 w-8 p-0 text-primary hover:bg-primary/10 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id, task.title)} className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{sub.user}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{sub.taskTitle}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-medium">{sub.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                        sub.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        sub.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {sub.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
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
                ))}
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
    </div>
  );
}
