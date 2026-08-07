"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Banknote, Tag, User, Calendar, Image as ImageIcon, ShieldCheck, Activity } from "lucide-react";

interface TaskPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any | null;
}

export function TaskPreviewModal({ isOpen, onClose, task }: TaskPreviewModalProps) {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-background">
        
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-border/40 bg-muted/20">
          <DialogHeader className="gap-2 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {task.category || "General"}
              </span>
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                task.status === "Active"
                  ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400"
                  : "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400"
              }`}>
                {task.status}
              </span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl">{task.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {task.advertiser || "Platform Admin"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {task.created || "Recently created"}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5" /> Reward
              </span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                ₦{Number(task.reward || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Time Estimate
              </span>
              <span className="text-xl font-semibold">
                {task.timeEstimate || "5 mins"}
              </span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Submissions
              </span>
              <span className="text-xl font-semibold">
                {task.submissions || 0}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              Task Description
            </h4>
            <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg leading-relaxed whitespace-pre-line border border-border/50">
              {task.description || "Complete the requested actions, take screenshot evidence, and upload your proof to claim your financial reward instantly."}
            </div>
          </div>

          {/* Attached Images */}
          {task.images && task.images.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                Reference Images ({task.images.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {task.images.map((img: string, index: number) => (
                  <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border bg-muted">
                    <img 
                      src={img} 
                      alt={`Task reference ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Rules */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/50">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h5 className="text-sm font-medium text-blue-900 dark:text-blue-300">Automated Proof Verification Active</h5>
              <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                Earners must submit valid screenshot proof matching the campaign requirements. Invalid or duplicate submissions will be rejected automatically.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/20 flex justify-end">
          <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
            Close Preview
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
