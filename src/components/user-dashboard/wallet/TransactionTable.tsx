import { Transaction } from "@/app/(dashboard)/user/wallet/types";
import { CheckCircle2, Clock } from "lucide-react";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No transactions found.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[#0f8538]">
                    +₦{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tx.status === "Completed" ? (
                      <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md text-xs font-bold w-fit">
                        <Clock className="w-3.5 h-3.5" /> Pending
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
