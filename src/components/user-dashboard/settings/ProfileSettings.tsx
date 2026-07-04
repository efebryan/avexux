import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Profile Management</h2>
        <p className="text-xs text-gray-500">Update your personal information and profile picture.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bryan&backgroundColor=b6e3f4" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#0f8538] transition-colors">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg h-8 px-3 text-xs">Upload New</Button>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-8 px-3 text-xs">Remove</Button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs">Full Name</Label>
          <Input id="name" defaultValue="Bryan Smith" className="rounded-lg h-9 text-xs" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username" className="text-xs">Username</Label>
          <Input id="username" defaultValue="bryansmith123" className="rounded-lg h-9 text-xs" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs">Email Address</Label>
          <Input id="email" type="email" defaultValue="bryan.smith@example.com" className="rounded-lg h-9 text-xs" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone" className="text-xs">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+234 800 000 0000" className="rounded-lg h-9 text-xs" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="country" className="text-xs">Country</Label>
          <Input id="country" defaultValue="Nigeria" className="rounded-lg h-9 text-xs" />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
        <Button variant="outline" className="rounded-lg h-8 px-3 text-xs">Cancel</Button>
        <Button className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg h-8 px-3 text-xs shadow-md">Save Changes</Button>
      </div>
    </div>
  );
}
