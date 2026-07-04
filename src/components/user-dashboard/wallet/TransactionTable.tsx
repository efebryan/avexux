import { Transaction } from "@/app/(dashboard)/user/wallet/types";
import { CheckCircle2, Clock } from "lucide-react";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-4 py-2.5">Date</th>
              <th className="px-4 py-2.5">Description</th>
              <th className="px-4 py-2.5">Type</th>
              <th className="px-4 py-2.5">Amount</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No transactions found.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 whitespace-nowrap text-gray-500">{tx.date}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-900">{tx.description}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap font-bold text-[#0f8538]">
                    +₦{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    {tx.status === "Completed" ? (
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px] font-bold w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded text-[9px] font-bold w-fit">
                        <Clock className="w-3 h-3" /> Pending
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
