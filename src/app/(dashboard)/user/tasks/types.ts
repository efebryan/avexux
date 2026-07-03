export type TaskStatus = "Available" | "In Progress" | "Pending Review" | "Approved" | "Rejected";

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeEstimate: string; // e.g., "10 mins"
  category: string;
  status: TaskStatus;
  advertiser: string;
  requirements: string[];
}
