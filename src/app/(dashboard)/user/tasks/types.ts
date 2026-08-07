export type TaskStatus = "Available" | "In Progress" | "Pending Review" | "Approved" | "Rejected" | "Expired";

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeEstimate: string; // fallback if timerSeconds is missing
  timerSeconds?: number;
  taskLink?: string;
  acceptedAt?: string; // ISO string when user accepted task
  category: string;
  dayOfWeek: string;
  status: TaskStatus;
  advertiser: string;
  requirements: string[];
}
