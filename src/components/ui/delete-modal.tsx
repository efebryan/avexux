import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, itemName }: DeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[400px] p-0 overflow-hidden rounded-[24px] border-0 shadow-2xl bg-white gap-0">
        <div className="px-6 pt-8 pb-6 flex flex-col items-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-3">
            Confirm Delete
          </h2>
          <p className="text-slate-500 text-sm text-center leading-relaxed max-w-[280px]">
            Are you sure you want to permanently delete <span className="font-bold text-slate-700">{itemName}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="bg-[#f8fafc] px-6 py-5 flex items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="rounded-full h-11 px-6 font-medium text-slate-700 border-emerald-200/60 hover:bg-white hover:text-slate-900 bg-white"
          >
            No, Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            className="rounded-full h-11 px-6 font-bold bg-[#e11d48] hover:bg-[#be123c] text-white"
          >
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
