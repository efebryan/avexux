import { Task } from "@/app/(dashboard)/user/tasks/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, Clock, CheckCircle2, Upload, Link as LinkIcon, Info } from "lucide-react";
import { Label } from "@/components/ui/label";

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (taskId: string, action: "accept" | "submit") => void;
}

export function TaskDetailsModal({ task, isOpen, onClose, onAction }: TaskDetailsModalProps) {
  if (!task) return null;

  const isAvailable = task.status === "Available";
  const isInProgress = task.status === "In Progress";
  const isHistory = ["Pending Review", "Approved", "Rejected"].includes(task.status);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden sm:rounded-2xl border-0 shadow-2xl">
        <div className="bg-[#f8fafc] p-4 md:p-5 border-b border-gray-100">
           <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                 <DialogTitle className="text-lg font-bold text-gray-900">{task.title}</DialogTitle>
                 <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {task.advertiser}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {task.timeEstimate}</span>
                 </div>
              </div>
              <div className="bg-[#0f8538] text-white px-3 py-1.5 rounded-lg font-bold text-base shrink-0">
                 ₦{task.reward.toLocaleString()}
              </div>
           </div>
        </div>

        <div className="p-4 md:p-5 max-h-[50vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 text-xs mb-1">Description</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{task.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-xs mb-1.5">Requirements</h4>
              <ul className="space-y-1.5">
                {task.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0f8538] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isInProgress && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mt-4">
                <h4 className="font-bold text-xs text-blue-900 mb-2.5 flex items-center gap-1.5">
                  <Upload className="w-4 h-4" /> Submit Proof of Completion
                </h4>
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <Label className="text-xs text-blue-900">Provide Links or Notes</Label>
                    <textarea 
                      className="w-full h-16 p-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-xs"
                      placeholder="e.g., https://twitter.com/my-post or any additional notes..."
                    ></textarea>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-blue-900">Upload Screenshots</Label>
                    <div className="border border-dashed border-blue-200 rounded-lg p-4 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-blue-50/50 transition-colors">
                      <Upload className="w-4 h-4 text-blue-400 mb-1" />
                      <span className="text-xs font-medium text-blue-600">Click to upload or drag & drop</span>
                      <span className="text-[10px] text-blue-400">SVG, PNG, JPG or GIF (max. 5MB)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isHistory && (
               <div className={`rounded-xl p-3 flex items-start gap-2.5 mt-3 ${
                 task.status === "Approved" ? "bg-green-50 border-green-100 text-green-800" :
                 task.status === "Rejected" ? "bg-red-50 border-red-100 text-red-800" :
                 "bg-yellow-50 border-yellow-100 text-yellow-800"
               }`}>
                 <Info className="w-4 h-4 shrink-0 mt-0.5" />
                 <div>
                   <p className="font-bold text-xs">Status: {task.status}</p>
                   {task.status === "Pending Review" && <p className="text-[11px] mt-0.5">Your submission is currently being reviewed by the advertiser. This usually takes 24-48 hours.</p>}
                   {task.status === "Approved" && <p className="text-[11px] mt-0.5">Great job! The reward has been added to your wallet.</p>}
                   {task.status === "Rejected" && <p className="text-[11px] mt-0.5">This submission did not meet the requirements. Please review the task details next time.</p>}
                 </div>
               </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2 sm:justify-end mx-0 mb-0">
          <Button variant="outline" onClick={onClose} className="rounded-lg h-8 px-4 text-xs font-bold">Close</Button>
          {isAvailable && (
             <Button onClick={() => onAction(task.id, "accept")} className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 px-5 text-xs font-bold">
               Accept Task
             </Button>
          )}
          {isInProgress && (
             <Button onClick={() => onAction(task.id, "submit")} className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 px-5 text-xs font-bold">
               Submit Proof
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
