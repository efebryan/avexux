"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("id, full_name, email, phone")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            id: data.id,
            full_name: data.full_name || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        }
      }
      setIsLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
      })
      .eq("id", profile.id);

    setIsSaving(false);
    if (error) {
      toast.error("Failed to update profile.");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-[#0f8538]" />
      </div>
    );
  }

  const firstName = profile.full_name.split(" ")[0] || "User";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Profile Management</h2>
        <p className="text-xs text-gray-500">Update your personal information and profile picture.</p>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}&backgroundColor=b6e3f4`} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="full_name" className="text-xs">Full Name</Label>
          <Input id="full_name" value={profile.full_name} onChange={handleChange} className="rounded-lg h-9 text-xs" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs">Email Address</Label>
          <Input id="email" type="email" value={profile.email} disabled className="rounded-lg h-9 text-xs bg-gray-50 text-gray-500" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone" className="text-xs">Phone Number</Label>
          <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} className="rounded-lg h-9 text-xs" />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
        <Button variant="outline" className="rounded-lg h-8 px-3 text-xs">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving} className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg h-8 px-3 text-xs shadow-md">
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
