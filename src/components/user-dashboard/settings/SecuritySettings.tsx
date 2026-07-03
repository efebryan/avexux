import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export function SecuritySettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Security</h2>
        <p className="text-sm text-gray-500">Manage your password and secure your account.</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" placeholder="••••••••" className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input id="new" type="password" placeholder="••••••••" className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" className="rounded-xl h-11" />
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl mt-2">Update Password</Button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Two-Factor Auth */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication (2FA)</h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-5 border border-gray-100 rounded-2xl bg-[#f8fafc]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#ade5bb]/40 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-[#0f8538]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Authenticator App</h4>
              <p className="text-sm text-gray-500 mt-1">
                Use an app like Google Authenticator to generate verification codes.
              </p>
            </div>
          </div>
          <Button variant="outline" className="rounded-xl border-[#0f8538] text-[#0f8538] hover:bg-[#0f8538] hover:text-white shrink-0">
            Enable
          </Button>
        </div>
      </div>
    </div>
  );
}
