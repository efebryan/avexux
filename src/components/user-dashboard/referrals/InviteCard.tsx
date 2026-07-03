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
  const referralLink = `https://arvexus.com/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <Card className="p-6 md:p-8 rounded-3xl border-0 shadow-lg bg-[#0f8538] text-white relative overflow-hidden mb-8">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold mb-2">Invite Friends & Earn 5% for Life!</h2>
            <p className="text-green-100 max-w-md mx-auto md:mx-0 text-sm leading-relaxed">
              Share your unique referral link with friends. When they sign up and complete tasks, you automatically earn 5% of their task rewards forever.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Input 
                readOnly 
                value={referralLink} 
                className="pr-12 h-12 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-white/30 truncate"
              />
              <button 
                onClick={handleCopy}
                className="absolute right-2 top-2 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Copy link"
              >
                <Copy className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 flex items-center justify-center shrink-0 h-12">
              <span className="font-mono text-sm font-bold">Code: {referralCode}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 space-y-3 w-full md:w-auto">
          <p className="text-sm font-bold text-green-100 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <Share2 className="w-4 h-4" /> Quick Share
          </p>
          <div className="flex justify-center md:justify-start gap-3">
            <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-white/20 bg-white/10 hover:bg-white/20 text-white border-0 transition-transform hover:scale-110">
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-white/20 bg-white/10 hover:bg-white/20 text-white border-0 transition-transform hover:scale-110">
              <Send className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-white/20 bg-[#25D366]/80 hover:bg-[#25D366] text-white border-0 transition-transform hover:scale-110">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
