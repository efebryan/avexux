import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, ClipboardList, Clock, Info, UploadCloud, Image as ImageIcon, X, Plus } from "lucide-react";
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
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 4) {
      toast.error("You can upload a maximum of 4 images per task.");
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages((prev) => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please upload image files only.");
      }
    });

    // Reset input value to allow re-uploading same file if deleted
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
      images,
    };

    onTaskCreate(newTask);
    toast.success("New task created successfully!");
    
    // Reset form
    setTitle("");
    setCategory("App Testing");
    setReward("");
    setTimeEstimate("");
    setDescription("");
    setImages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl sm:rounded-2xl border-0 shadow-2xl p-0 overflow-hidden bg-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex justify-between items-center shrink-0">
           <div>
             <DialogTitle className="text-xl font-bold flex items-center gap-2">
               <ClipboardList className="w-5 h-5 text-primary" />
               Create New Task
             </DialogTitle>
             <DialogDescription className="text-slate-300 text-sm mt-1">
               Fill out the details below to publish a new earning opportunity.
             </DialogDescription>
           </div>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Task Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Download and review our new app"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50 appearance-none"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50/50"
            />
          </div>

          {/* Image Upload Dropzone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-primary" />
                Task Images & Attachments
              </span>
              <span className="text-xs font-normal text-gray-400">Optional (Max 4)</span>
            </label>
            
            {/* Image Preview & Upload Grid */}
            <div className="grid grid-cols-4 gap-3 mb-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xs">
                  <img src={img} alt={`Task upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity shadow-xs"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-primary bg-gray-50/50 hover:bg-primary/5 flex flex-col items-center justify-center text-gray-400 hover:text-primary transition-all group"
                >
                  <UploadCloud className="w-5 h-5 mb-1 transition-transform group-hover:-translate-y-0.5" />
                  <span className="text-[10px] font-semibold">Upload</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            
            <p className="text-xs text-gray-400">
              Upload task banners, logos, or reference screenshot guides for earners.
            </p>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all bg-gray-50/50"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/95 text-white font-medium rounded-xl px-6 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
              <Save className="w-4 h-4 mr-2" /> Publish Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
