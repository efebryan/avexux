export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "Task" | "Bonus" | "Referral";
  amount: number;
  status: "Completed" | "Pending";
}

export interface Withdrawal {
  id: string;
  date: string;
  method: string;
  accountDetails: string;
  amount: number;
  status: "Pending" | "Processed" | "Failed";
}
