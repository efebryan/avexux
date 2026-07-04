import { Activity, ShieldCheck, MonitorPlay } from "lucide-react";
import { Card } from "@/components/ui/card";

const activeTasks = [
  {
    icon: <Activity className="w-4 h-4 text-[#0f8538]" />,
    iconBg: "bg-[#ade5bb]/40",
    name: "NLP Text Labeling",
    reward: "₦12.00",
    status: "IN PROGRESS",
    statusColor: "bg-[#ade5bb]/60 text-[#0f8538]",
    progress: 65,
    progressColor: "bg-[#0f8538]"
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-gray-600" />,
    iconBg: "bg-gray-100",
    name: "Bank App Beta Test",
    reward: "₦25.00",
    status: "APPROVED",
    statusColor: "bg-[#0f8538] text-white",
    progress: 100,
    progressColor: "bg-[#0f8538]"
  },
  {
    icon: <MonitorPlay className="w-4 h-4 text-[#0f8538]" />,
    iconBg: "bg-[#ade5bb]/40",
    name: "Ad Feedback Study",
    reward: "₦5.50",
    status: "ACTION REQ.",
    statusColor: "bg-red-100 text-red-700",
    progress: 40,
    progressColor: "bg-red-500"
  }
];

export function ActiveTasksTable() {
  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mb-8">
      <div className="p-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">My Active Tasks</h2>
        <span className="text-xs font-medium text-gray-500">3 In Progress</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#f8fafc] text-gray-500 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              <th className="px-4 py-2.5 rounded-tl-lg">TASK NAME</th>
              <th className="px-4 py-2.5">REWARD</th>
              <th className="px-4 py-2.5">STATUS</th>
              <th className="px-4 py-2.5 rounded-tr-lg w-40">PROGRESS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activeTasks.map((task, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 font-medium text-gray-900 flex items-center gap-2 whitespace-nowrap">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${task.iconBg}`}>
                    {task.icon}
                  </div>
                  {task.name}
                </td>
                <td className="px-4 py-2.5 font-bold text-gray-900">
                  {task.reward}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded tracking-wider whitespace-nowrap ${task.statusColor}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                      <div className={`h-1 rounded-full ${task.progressColor}`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 w-6">{task.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
