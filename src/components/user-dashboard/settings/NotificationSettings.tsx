import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Notifications</h2>
        <p className="text-xs text-gray-500">Choose what you want to be notified about.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">New Opportunities</Label>
            <p className="text-xs text-gray-500">Get notified when new high-paying tasks are available.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">Withdrawal Updates</Label>
            <p className="text-xs text-gray-500">Alert me when a payout is processed or completed.</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">Marketing & Promos</Label>
            <p className="text-xs text-gray-500">Receive weekly newsletters with tips to earn more.</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">System Updates</Label>
            <p className="text-xs text-gray-500">Important notices about platform maintenance.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Button className="bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg h-8 px-3 text-xs shadow-md">Save Preferences</Button>
      </div>
    </div>
  );
}
