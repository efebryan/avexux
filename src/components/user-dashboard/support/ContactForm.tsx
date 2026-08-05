"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState<{ id: string, name: string, email: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .eq("id", user.id)
          .single();
        
        if (data) {
          setUserProfile({
            id: data.id,
            name: data.full_name || "Unknown User",
            email: data.email || user.email || "No Email",
          });
        }
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!userProfile) {
      toast.error("You must be logged in to submit a support ticket.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from("support_tickets")
      .insert({
        user_id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        subject,
        message,
        status: "Open"
      });

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message sent successfully! We'll get back to you shortly.");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <Card className="p-3.5 md:p-4 rounded-xl border border-gray-100 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1.5">Send a Message</h2>
        <div className="flex items-center gap-1.5 text-xs text-[#0f8538] font-medium bg-[#ade5bb]/20 w-fit px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span>Average response time: 2 hours</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="subject" className="text-xs">Subject</Label>
          <Input 
            id="subject" 
            placeholder="What do you need help with?" 
            required 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg h-9 text-xs" 
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="message" className="text-xs">Message</Label>
          <textarea 
            id="message" 
            placeholder="Describe your issue in detail..." 
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[100px] p-2.5 rounded-lg border border-input bg-background text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          ></textarea>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || !userProfile}
          className="w-full bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg shadow-md h-8 text-xs font-bold flex items-center justify-center gap-1.5"
        >
          {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
