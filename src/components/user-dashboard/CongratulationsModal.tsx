import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CongratulationsModal({ isOpen, onClose }: CongratulationsModalProps) {
  const [isActive, setIsActive] = useState(true);
  const [title, setTitle] = useState("Dear users, congratulations! 🥳");
  const [amount, setAmount] = useState("₦204,000");

  useEffect(() => {
    async function fetchConfig() {
      const supabase = createClient();
      const { data } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "congrats_modal_config")
        .single();
        
      if (data?.value) {
        setIsActive(data.value.active !== false);
        if (data.value.title) setTitle(data.value.title);
        if (data.value.amount) setAmount(data.value.amount);
      }
    }
    fetchConfig();
  }, []);

  // If disabled by admin, never open
  const showModal = isOpen && isActive;

  return (
    <Dialog open={showModal} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:rounded-2xl border-0 shadow-2xl p-6 text-center overflow-hidden bg-white">
        <div className="relative flex flex-col items-center py-4">
          {/* Confetti & Trophy Animation wrapper */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Background glowing effects */}
            <div className="absolute w-24 h-24 bg-yellow-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
            
            {/* Sparkles icons to represent confetti */}
            <Sparkles className="absolute -top-3 -left-3 w-5 h-5 text-yellow-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
            <Sparkles className="absolute -top-4 right-2 w-4 h-4 text-orange-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="absolute bottom-2 -right-4 w-5 h-5 text-yellow-500 animate-bounce" style={{ animationDelay: "0.8s" }} />
            <Sparkles className="absolute bottom-0 -left-4 w-4 h-4 text-orange-400 animate-bounce" style={{ animationDelay: "1.1s" }} />
            
            {/* Main Trophy */}
            <div className="relative w-20 h-20 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-yellow-200 transform hover:scale-110 transition-transform duration-300">
              <Trophy className="w-10 h-10 text-white drop-shadow-md" />
            </div>
          </div>

          <DialogTitle className="text-xl font-bold text-gray-900 leading-tight mb-3">
            {title}
          </DialogTitle>
          
          <DialogDescription className="space-y-3 text-gray-600 text-sm leading-relaxed max-w-sm">
            <span>
              Thank you for trusting us! We are giving you the chance to win up to{" "}
              <strong className="text-gray-900 font-extrabold text-base">{amount}</strong> in bonuses! 🔥 🔥 🔥
            </span>
            <span className="block font-medium text-[#0f8538] mt-2">
              Open the box and participate to win prizes!
            </span>
          </DialogDescription>
        </div>

        <div className="mt-4 pb-2">
          <Button 
            onClick={onClose}
            className="w-full max-w-[200px] bg-[#0f8538] hover:bg-[#0c6b2c] text-white font-bold rounded-xl shadow-md h-10 transition-all transform hover:-translate-y-0.5"
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
