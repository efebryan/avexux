import { WelcomeBanner } from "@/components/user-dashboard/WelcomeBanner";
import { DashboardStats } from "@/components/user-dashboard/DashboardStats";
import { QuickActions } from "@/components/user-dashboard/QuickActions";
import { AvailableOpportunities } from "@/components/user-dashboard/AvailableOpportunities";
import { ActiveTasksTable } from "@/components/user-dashboard/ActiveTasksTable";
import { WeeklyGoal } from "@/components/user-dashboard/WeeklyGoal";
import { RecentAchievements } from "@/components/user-dashboard/RecentAchievements";

export default function UserDashboard() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Left/Main Column */}
      <div className="flex-1 min-w-0">
        <WelcomeBanner />
        <DashboardStats />
        <QuickActions />
        <AvailableOpportunities />
        <ActiveTasksTable />
      </div>

      {/* Right Column */}
      <div className="w-full xl:w-[320px] 2xl:w-[360px] shrink-0">
        <WeeklyGoal />
        <RecentAchievements />
      </div>
    </div>
  );
}
