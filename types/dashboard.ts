export interface QuickStat {
  title: string;
  value: string;
  icon: string;
}

export interface DashboardData {
  greeting: string;

  user: {
    name: string;
  };

  quickStats: QuickStat[];
}