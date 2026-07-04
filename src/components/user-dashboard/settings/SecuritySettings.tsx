import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export function SecuritySettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Security</h2>
        <p className="text-xs text-gray-500">Manage your password and secure your account.</p>
      </div>

      {/* Change Password */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-gray-900">Change Password</h3>
        <div className="space-y-3 max-w-md">
          <div className="space-y-1">
            <Label htmlFor="current" className="text-xs">Current Password</Label>
            <Input id="current" type="password" placeholder="••••••••" className="rounded-lg h-9 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new" className="text-xs">New Password</Label>
            <Input id="new" type="password" placeholder="••••••••" className="rounded-lg h-9 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm" className="text-xs">Confirm New Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" className="rounded-lg h-9 text-xs" />
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-8 px-3 text-xs mt-1">Update Password</Button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Two-Factor Auth */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Two-Factor Authentication (2FA)</h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3.5 border border-gray-100 rounded-xl bg-[#f8fafc]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ade5bb]/40 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-[#0f8538]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Authenticator App</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Use an app like Google Authenticator to generate verification codes.
              </p>
            </div>
          </div>
          <Button variant="outline" className="rounded-lg border-[#0f8538] text-[#0f8538] hover:bg-[#0f8538] hover:text-white shrink-0 h-8 px-3 text-xs font-bold">
            Enable
          </Button>
        </div>
      </div>
    </div>
  );
}
