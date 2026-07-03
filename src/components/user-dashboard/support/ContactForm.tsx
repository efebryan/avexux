"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Clock } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Card className="p-6 md:p-8 rounded-3xl border border-gray-100 shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
        <div className="flex items-center gap-2 text-sm text-[#0f8538] font-medium bg-[#ade5bb]/20 w-fit px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4" />
          <span>Average response time: 2 hours</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="What do you need help with?" required className="rounded-xl h-12" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea 
            id="message" 
            placeholder="Describe your issue in detail..." 
            required
            className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          ></textarea>
        </div>

        <Button type="submit" className="w-full bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md h-12 text-[15px] flex items-center gap-2">
          <Send className="w-4 h-4" />
          Send Message
        </Button>
      </form>
    </Card>
  );
}
