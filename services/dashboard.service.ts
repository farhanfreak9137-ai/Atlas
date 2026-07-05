import { dashboardData } from "@/lib/mock-data";
import { DashboardData } from "@/types/dashboard";

export function getDashboardData(): DashboardData {
  return {
    ...dashboardData,
    greeting: dashboardData.greeting || "Welcome back!",
  };
}