"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Clock, ExternalLink, Star, Info, UploadCloud, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { TaskStatus } from "../types";

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const supabase = useMemo(() => createClient(), []);

  const [task, setTask] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Submission Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", taskId)
        .single();

      if (taskError || !taskData) {
        toast.error("Task not found");
        router.push("/user/tasks");
        return;
      }

      const { data: subData } = await supabase
        .from("task_submissions")
        .select("*")
        .eq("task_id", taskId)
        .eq("user_id", user.id)
        .single();

      setTask(taskData);
      setSubmission(subData);
      setIsLoading(false);
    }
    fetchData();
  }, [taskId]);

  useEffect(() => {
    if (!task || !submission || submission.status !== "In Progress") return;

    const acceptedAt = new Date(submission.created_at).getTime();
    const expiresAt = acceptedAt + (task.timer_seconds * 1000);

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = expiresAt - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("00:00");
        setIsExpired(true);
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task, submission]);

  const handleAcceptTask = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Check for existing submission before inserting to handle gracefully
    const { data: existingSub } = await supabase
      .from("task_submissions")
      .select("id, status")
      .eq("task_id", taskId)
      .eq("user_id", user.id)
      .single();

    if (existingSub) {
      toast.error("You have already accepted this task.");
      setSubmission(existingSub);
      return;
    }

    const { error } = await supabase.from("task_submissions").insert({
      task_id: taskId,
      user_id: user.id,
      status: "In Progress"
    });

    if (error) {
      // Parse unique constraint violation (Postgres error code 23505)
      if (error.code === "23505") {
        toast.error("You have already accepted this task.");
      } else {
        toast.error("Failed to accept task. Please try again.");
      }
      return;
    }
    
    // Refresh submission state
    const { data: subData } = await supabase
      .from("task_submissions")
      .select("*")
      .eq("task_id", taskId)
      .eq("user_id", user.id)
      .single();
      
    setSubmission(subData);
    toast.success("Task accepted! The timer has started.");
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a rating before submitting.");
      return;
    }

    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const { error } = await supabase.from("task_submissions")
      .update({ 
        status: "Pending Review",
        rating: rating,
        comment: comment
      })
      .eq("task_id", taskId)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to submit proof.");
      setIsSubmitting(false);
      return;
    }

    toast.success("Proof submitted successfully! It is now Pending Review.");
    
    // Refresh submission state
    const { data: subData } = await supabase
      .from("task_submissions")
      .select("*")
      .eq("task_id", taskId)
      .eq("user_id", user.id)
      .single();
      
    setSubmission(subData);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0f8538]" />
      </div>
    );
  }

  const currentStatus = isExpired ? "Expired" : submission?.status || "Available";

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Back Button */}
      <Link href="/user/tasks" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Tasks
      </Link>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {task.category}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                currentStatus === 'Available' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                currentStatus === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                currentStatus === 'Pending Review' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                currentStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                'bg-red-50 text-red-600 border-red-200'
              }`}>
                {currentStatus}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
              {task.title}
            </h1>
            <p className="text-gray-500 text-sm">Posted by <span className="font-semibold text-gray-700">{task.advertiser}</span></p>
          </div>
          
          <div className="bg-green-50/50 border border-green-100 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[120px]">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Reward</span>
            <span className="text-2xl font-extrabold text-[#0f8538]">₦ {Number(task.reward_amount).toLocaleString()}</span>
          </div>
        </div>

        {/* Task Details */}
        <div className="prose prose-sm md:prose-base max-w-none text-gray-600 mb-8">
          <h3 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" /> Task Instructions
          </h3>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 whitespace-pre-wrap leading-relaxed text-sm">
            {task.description}
          </div>
        </div>

        {/* Task Link */}
        {task.task_link && (
          <div className="mb-8">
            <a 
              href={task.task_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-3 rounded-xl font-bold transition-colors border border-blue-100 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Open Task Link
            </a>
          </div>
        )}

        {/* Task Images */}
        {task.images && task.images.length > 0 && (
          <div className="mb-10">
            <h3 className="text-gray-900 font-bold mb-4">Reference Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {task.images.map((img: string, idx: number) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={img} alt={`Task image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="border-gray-100 mb-8" />

        {/* Actions Area */}
        {currentStatus === "Available" && (
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Time Limit: {task.timer_seconds} seconds
              </h4>
              <p className="text-sm text-gray-500 max-w-md">Once you accept this task, you will have exactly {task.timer_seconds} seconds to complete it and submit your proof.</p>
            </div>
            <Button onClick={handleAcceptTask} className="w-full md:w-auto h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
              Accept Task Now
            </Button>
          </div>
        )}

        {currentStatus === "In Progress" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-5 rounded-2xl">
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Task In Progress</h4>
                <p className="text-xs text-amber-700 font-medium">Please complete the task and submit your proof before time runs out.</p>
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Time Remaining</span>
                <span className="text-3xl font-black text-amber-600 font-mono tracking-tight">{timeLeft}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitProof} className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-gray-900 text-lg border-b border-gray-200 pb-4">Submit Your Proof</h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Rate this Task *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating) 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-gray-400">
                    {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Optional Comment</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Any feedback for the advertiser about this task?"
                  className="w-full p-4 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#0f8538]/20 focus:border-[#0f8538] transition-all bg-white min-h-[80px] resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-xl bg-[#0f8538] hover:bg-[#0c702e] text-white font-bold text-base shadow-lg shadow-green-600/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Proof"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {["Pending Review", "Approved", "Rejected"].includes(currentStatus) && (
          <div className={`p-6 rounded-2xl border ${
            currentStatus === "Pending Review" ? "bg-purple-50 border-purple-100" :
            currentStatus === "Approved" ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
          }`}>
            <h4 className={`font-bold mb-2 flex items-center gap-2 ${
              currentStatus === "Pending Review" ? "text-purple-900" :
              currentStatus === "Approved" ? "text-emerald-900" : "text-red-900"
            }`}>
              {currentStatus === "Pending Review" && <Clock className="w-5 h-5" />}
              {currentStatus === "Approved" && <CheckCircle className="w-5 h-5" />}
              {currentStatus === "Rejected" && <AlertCircle className="w-5 h-5" />}
              Submission Status: {currentStatus}
            </h4>
            <p className={`text-sm ${
              currentStatus === "Pending Review" ? "text-purple-700" :
              currentStatus === "Approved" ? "text-emerald-700" : "text-red-700"
            }`}>
              {currentStatus === "Pending Review" ? "Your proof has been submitted and is awaiting advertiser review. You will be credited once approved." :
               currentStatus === "Approved" ? "Your submission was approved! The reward has been credited to your wallet." :
               "Your submission was rejected. Reason: " + (submission?.rejection_reason || "Did not meet requirements.")}
            </p>

            {submission?.rating > 0 && (
              <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-gray-500">You Rated:</span>
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-4 h-4 ${star <= submission.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStatus === "Expired" && (
          <div className="p-6 rounded-2xl border bg-gray-50 border-gray-200 text-center">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" /> Time Expired
            </h4>
            <p className="text-sm text-gray-500">You did not submit proof within the allotted time. This task is no longer available to you.</p>
          </div>
        )}

      </div>
    </div>
  );
}
