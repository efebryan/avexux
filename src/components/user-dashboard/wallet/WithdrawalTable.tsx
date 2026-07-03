import { Withdrawal } from "@/app/(dashboard)/user/wallet/types";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export function WithdrawalTable({ withdrawals }: { withdrawals: Withdrawal[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Account Details</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {withdrawals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No withdrawals yet.</td>
              </tr>
            ) : (
              withdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{w.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{w.method}</td>
                  <td className="px-6 py-4 text-gray-500">{w.accountDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    ₦{w.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {w.status === "Processed" && (
                      <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Processed
                      </span>
                    )}
                    {w.status === "Pending" && (
                      <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md text-xs font-bold w-fit">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                    {w.status === "Failed" && (
                      <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-md text-xs font-bold w-fit">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
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
