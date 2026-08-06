import { create } from "zustand";
import { FootballMatch, FootballStats, FootballTraining } from "@/types/football";
import { FootballService } from "@/services/football.service";

interface FootballStore {
  stats: FootballStats;
  matches: FootballMatch[];
  trainings: FootballTraining[];
  isLoading: boolean;
  error: string | null;

  init: () => void;
  logMatch: (match: Omit<FootballMatch, "id">) => void;
  logTraining: (training: Omit<FootballTraining, "id">) => void;
  deleteMatch: (id: string) => void;
  deleteTraining: (id: string) => void;
}

export const useFootballStore = create<FootballStore>((set) => ({
  stats: {
    totalMatches: 0,
    totalGoals: 0,
    totalAssists: 0,
    averageRating: 0,
    winPercentage: 0,
    totalTrainingHours: 0,
  },
  matches: [],
  trainings: [],
  isLoading: false,
  error: null,

  init: () => {
    set({ isLoading: true, error: null });
    try {
      const matches = FootballService.getMatches();
      const trainings = FootballService.getTrainingSessions();
      const stats = FootballService.getStats();
      set({ matches, trainings, stats, isLoading: false });
    } catch (err: any) {
      set({ error: err?.message || "Failed to load football data", isLoading: false });
    }
  },

  logMatch: (match) => {
    try {
      FootballService.logMatch(match);
      const matches = FootballService.getMatches();
      const stats = FootballService.getStats();
      set({ matches, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to log match" });
    }
  },

  logTraining: (training) => {
    try {
      FootballService.logTraining(training);
      const trainings = FootballService.getTrainingSessions();
      const stats = FootballService.getStats();
      set({ trainings, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to log training" });
    }
  },

  deleteMatch: (id) => {
    try {
      FootballService.deleteMatch(id);
      const matches = FootballService.getMatches();
      const stats = FootballService.getStats();
      set({ matches, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete match" });
    }
  },

  deleteTraining: (id) => {
    try {
      FootballService.deleteTraining(id);
      const trainings = FootballService.getTrainingSessions();
      const stats = FootballService.getStats();
      set({ trainings, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete training" });
    }
  }
}));
