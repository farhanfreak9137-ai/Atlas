"use client";

import { useEffect, useState } from "react";

import { DashboardService } from "@/services/dashboard.service";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<
    ReturnType<typeof DashboardService.getOverview> | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
    setDashboard(DashboardService.getOverview());
      setIsError(false);
    } catch (error) {
      console.error("Failed to fetch dashboard overview:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
}
  }, []);

  return { dashboard, isLoading, isError };
}
