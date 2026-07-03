import { Card } from "@/components/ui/card";

export function SystemUpdates() {
  return (
    <Card className="p-6 bg-[#1f2328] border-none shadow-md rounded-2xl text-white">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">System Updates</h3>
      
      <div className="space-y-6">
        <div className="relative pl-5">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#0f8538]"></div>
          <h4 className="font-bold text-[15px] mb-1">Wallet Sync Successful</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your last withdrawal of ₦50.00 was processed.
          </p>
        </div>

        <div className="relative pl-5">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#0f8538]"></div>
          <h4 className="font-bold text-[15px] mb-1">New High-Yield Task</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            A ₦50 research study just opened for Pro members.
          </p>
        </div>
      </div>
    </Card>
  );
}
