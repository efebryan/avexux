import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications</h2>
        <p className="text-sm text-gray-500">Choose what you want to be notified about.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">New Opportunities</Label>
            <p className="text-sm text-gray-500">Get notified when new high-paying tasks are available.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">Withdrawal Updates</Label>
            <p className="text-sm text-gray-500">Alert me when a payout is processed or completed.</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">Marketing & Promos</Label>
            <p className="text-sm text-gray-500">Receive weekly newsletters with tips to earn more.</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">System Updates</Label>
            <p className="text-sm text-gray-500">Important notices about platform maintenance.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <Button className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-xl shadow-md">Save Preferences</Button>
      </div>
    </div>
  );
}
