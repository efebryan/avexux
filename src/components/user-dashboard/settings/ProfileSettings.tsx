import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Profile Management</h2>
        <p className="text-sm text-gray-500">Update your personal information and profile picture.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bryan&backgroundColor=b6e3f4" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#0f8538] transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">Upload New</Button>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">Remove</Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="Bryan Smith" className="rounded-xl h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="bryansmith123" className="rounded-xl h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="bryan.smith@example.com" className="rounded-xl h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+234 800 000 0000" className="rounded-xl h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" defaultValue="Nigeria" className="rounded-xl h-11" />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl">Cancel</Button>
        <Button className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md">Save Changes</Button>
      </div>
    </div>
  );
}
