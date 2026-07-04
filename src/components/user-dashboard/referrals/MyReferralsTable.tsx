import { CheckCircle2, Clock } from "lucide-react";

interface MyReferral {
  id: string;
  username: string;
  dateJoined: string;
  status: "Active" | "Inactive";
  earned: number;
}

export function MyReferralsTable({ referrals }: { referrals: MyReferral[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-3.5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">My Network</h3>
        <p className="text-xs text-gray-500 mt-0.5">Users who signed up using your link.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-4 py-2.5">User</th>
              <th className="px-4 py-2.5">Date Joined</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 text-right">Commissions Earned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {referrals.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">You haven't invited anyone yet. Share your link!</td>
              </tr>
            ) : (
              referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-gray-900">{ref.username}</td>
                  <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{ref.dateJoined}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    {ref.status === "Active" ? (
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px] font-bold w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-[9px] font-bold w-fit">
                        <Clock className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold text-[#0f8538]">
                    ₦{ref.earned.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
