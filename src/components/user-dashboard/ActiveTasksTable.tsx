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
    <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden mb-8">
      <div className="p-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">My Active Tasks</h2>
        <span className="text-sm font-medium text-gray-500">3 In Progress</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#f8fafc] text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl">TASK NAME</th>
              <th className="px-6 py-4">REWARD</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4 rounded-tr-xl w-48">PROGRESS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {activeTasks.map((task, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${task.iconBg}`}>
                    {task.icon}
                  </div>
                  {task.name}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {task.reward}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider whitespace-nowrap ${task.statusColor}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full ${task.progressColor}`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-8">{task.progress}%</span>
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
