export interface FootballMatch {
  id: string;
  date: string;
  opponent: string;
  matchType: "League" | "Friendly" | "Tournament" | "5-a-side" | "11-a-side";
  goals: number;
  assists: number;
  minutesPlayed: number;
  rating: number; // 1-10
  manOfTheMatch: boolean;
  yellowCards: number;
  redCards: number;
  result: "Win" | "Draw" | "Loss";
}

export interface FootballTraining {
  id: string;
  date: string;
  type: "Team Practice" | "Individual Drill" | "Stamina/Cardio" | "Recovery";
  focusArea: string; // e.g., "Shooting", "Passing", "Agility"
  durationMinutes: number;
  distanceKm: number;
  intensity: number; // 1-10
}

export interface FootballStats {
  totalMatches: number;
  totalGoals: number;
  totalAssists: number;
  averageRating: number;
  winPercentage: number;
  totalTrainingHours: number;
}
