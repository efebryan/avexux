import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, ClipboardList, Clock, Info } from "lucide-react";
import { toast } from "sonner";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreate: (task: any) => void;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreate }: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("App Testing");
  const [reward, setReward] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reward || !timeEstimate || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newTask = {
      id: `task_${Date.now()}`,
      title,
      category,
      advertiser: "Platform Admin",
      reward: Number(reward),
      submissions: 0,
      status: "Active",
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onTaskCreate(newTask);
    toast.success("New task created successfully!");
    
    // Reset form
    setTitle("");
    setCategory("App Testing");
    setReward("");
    setTimeEstimate("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl sm:rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-white">
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex justify-between items-center">
           <div>
             <DialogTitle className="text-xl font-bold flex items-center gap-2">
               <ClipboardList className="w-5 h-5 text-blue-400" />
               Create New Task
             </DialogTitle>
             <DialogDescription className="text-slate-300 text-sm mt-1">
               Fill out the details below to publish a new earning opportunity.
             </DialogDescription>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Task Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Download and review our new app"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50 appearance-none"
              >
                <option value="App Testing">App Testing</option>
                <option value="Social Media">Social Media</option>
                <option value="Surveys">Surveys</option>
                <option value="Reviews">Reviews</option>
                <option value="Video Review">Video Review</option>
                <option value="Website Visit">Website Visit</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Time Estimate *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={timeEstimate}
                  onChange={(e) => setTimeEstimate(e.target.value)}
                  placeholder="e.g., 5 mins"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Reward Amount (₦) *</label>
            <input 
              type="number" 
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="e.g., 1500"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
              Task Description & Instructions *
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail exactly what the user needs to do and what proof they must submit..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all bg-gray-50/50"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5">
              <Save className="w-4 h-4 mr-2" /> Publish Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
