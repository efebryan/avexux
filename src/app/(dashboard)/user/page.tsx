"use client";

import { useState, useCallback } from "react";
import { DashboardStats } from "@/components/user-dashboard/DashboardStats";
import { AvailableOpportunities } from "@/components/user-dashboard/AvailableOpportunities";
import { ActiveTasksTable } from "@/components/user-dashboard/ActiveTasksTable";
import { WeeklyGoal } from "@/components/user-dashboard/WeeklyGoal";
import { RankAchievements } from "@/components/user-dashboard/RankAchievements";
import { CongratulationsModal } from "@/components/user-dashboard/CongratulationsModal";

const CONGRATS_DISMISSED_KEY = "avexux_congrats_dismissed";

export default function UserDashboard() {
  const [isCongratsOpen, setIsCongratsOpen] = useState(() => {
    // Only show the modal if the user hasn't dismissed it this session
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(CONGRATS_DISMISSED_KEY) !== "true";
    }
    return true;
  });

  const handleCloseModal = useCallback(() => {
    setIsCongratsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CONGRATS_DISMISSED_KEY, "true");
    }
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      {/* Left/Main Column */}
      <div className="flex-1 min-w-0">
        <DashboardStats />
        <AvailableOpportunities />
        <ActiveTasksTable />
      </div>

      {/* Right Column */}
      <div className="w-full xl:w-[320px] 2xl:w-[360px] shrink-0">
        <WeeklyGoal />
        <RankAchievements />
      </div>

      {/* Global Congratulations Campaign Modal */}
      <CongratulationsModal 
        isOpen={isCongratsOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
