"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Send, Globe, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface InviteCardProps {
  referralCode: string;
}

export function InviteCard({ referralCode }: InviteCardProps) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = `${baseUrl}/register?ref=${referralCode}`;

  const shareText = `Join Avexux and earn high-yield digital opportunities with me! Use my referral code: ${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + referralLink)}`, "_blank");
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Avexux",
          text: shareText,
          url: referralLink,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`, "_blank");
    }
  };

  return (
    <Card className="p-4 md:p-5 rounded-xl border-0 shadow-lg bg-[#0f8538] text-white relative overflow-hidden mb-6">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex-1 space-y-3 text-center md:text-left w-full">
          <div>
            <h2 className="text-lg font-bold mb-1">Invite Friends & Earn 5% for Life!</h2>
            <p className="text-green-100 max-w-md mx-auto md:mx-0 text-xs leading-normal">
              Share your unique referral link with friends. When they sign up and complete tasks, you automatically earn 5% of their task rewards forever.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-1 w-full max-w-md">
            <div className="relative flex-1">
              <Input 
                readOnly 
                value={referralLink} 
                className="pr-10 h-9 bg-white/10 border-white/20 text-white rounded-lg focus-visible:ring-white/30 text-xs truncate"
              />
              <button 
                onClick={handleCopy}
                className="absolute right-1 top-1.5 p-1 hover:bg-white/20 rounded transition-colors"
                title="Copy link"
              >
                <Copy className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg px-3 flex items-center justify-center shrink-0 h-9">
              <span className="font-mono text-xs font-bold">Code: {referralCode}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 space-y-2 w-full md:w-auto">
          <p className="text-xs font-bold text-green-100 text-center md:text-left flex items-center justify-center md:justify-start gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Quick Share
          </p>
          <div className="flex justify-center md:justify-start gap-2">
            <Button onClick={handleNativeShare} variant="outline" className="w-9 h-9 rounded-full p-0 border-white/20 bg-white/10 hover:bg-white/20 text-white border-0 transition-transform hover:scale-105">
              <Globe className="w-4 h-4" />
            </Button>
            <Button onClick={handleShareTelegram} variant="outline" className="w-9 h-9 rounded-full p-0 border-white/20 bg-[#0088cc]/80 hover:bg-[#0088cc] text-white border-0 transition-transform hover:scale-105">
              <Send className="w-4 h-4" />
            </Button>
            <Button onClick={handleShareWhatsApp} variant="outline" className="w-9 h-9 rounded-full p-0 border-white/20 bg-[#25D366]/80 hover:bg-[#25D366] text-white border-0 transition-transform hover:scale-105">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
