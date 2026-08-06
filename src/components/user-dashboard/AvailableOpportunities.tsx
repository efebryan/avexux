"use client";

import { Clock, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function AvailableOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOpportunities() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "Active")
        .order("created_at", { ascending: false });

      if (!tasks || error) {
        setIsLoading(false);
        return;
      }

      const { data: submissions } = await supabase
        .from("task_submissions")
        .select("task_id, status, created_at")
        .eq("user_id", user.id);

      const submissionMap = new Map();
      if (submissions) {
        submissions.forEach(sub => {
          submissionMap.set(sub.task_id, { status: sub.status, createdAt: sub.created_at });
        });
      }

      const availableAndActive: any[] = [];

      for (const t of tasks) {
        const userSub = submissionMap.get(t.id);
        let currentStatus = userSub ? userSub.status : "Available";
        const acceptedAt = userSub ? userSub.createdAt : undefined;

        if (currentStatus === "In Progress" && acceptedAt && t.timer_seconds) {
          const expiresAt = new Date(acceptedAt).getTime() + (t.timer_seconds * 1000);
          if (Date.now() > expiresAt) {
            currentStatus = "Expired";
          }
        }

        if (currentStatus === "Available" || currentStatus === "In Progress") {
          availableAndActive.push(t);
        }

        if (availableAndActive.length >= 3) break;
      }

      setOpportunities(availableAndActive);
      setIsLoading(false);
    }
    
    fetchOpportunities();
  }, []);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">Available Opportunities</h2>
        <Link href="/user/tasks" className="text-[#0f8538] font-bold text-xs hover:underline">View All</Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-6">
          <Loader2 className="w-6 h-6 animate-spin text-[#0f8538]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {opportunities.length > 0 ? (
            opportunities.map((task, i) => (
              <Card key={task.id || i} className="p-3.5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between hover:border-[#0f8538]/30 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 uppercase rounded tracking-wider bg-[#ade5bb]/60 text-[#0f8538]">
                      {task.category}
                    </span>
                    <span className="font-bold text-sm text-[#0f8538]">₦{Number(task.reward_amount).toFixed(2)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 leading-tight text-sm">{task.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {task.timer_seconds}s
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push(`/user/tasks/${task.id}`)}
                    className="rounded-lg border-[#0f8538] text-[#0f8538] hover:bg-[#0f8538] hover:text-white transition-colors font-bold px-3.5 h-8 text-xs"
                  >
                    View Task
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-8 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
              <p className="text-gray-500 font-medium text-sm">No new tasks available at the moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
