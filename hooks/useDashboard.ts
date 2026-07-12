"use client";

import { useEffect, useState } from "react";

import { DashboardService } from "@/services/dashboard.service";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<
    ReturnType<typeof DashboardService.getOverview> | null
  >(null);

  useEffect(() => {
    setDashboard(DashboardService.getOverview());
  }, []);

  return dashboard;
}