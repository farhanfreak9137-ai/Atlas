import { create } from "zustand";
import { GymExercise, GymStats, GymWorkout } from "@/types/gym";
import { GymService } from "@/services/gym.service";

interface GymStore {
  stats: GymStats;
  exercises: GymExercise[];
  workouts: GymWorkout[];
  isLoading: boolean;
  error: string | null;

  init: () => void;
  loadExercises: () => void;
  logWorkout: (workout: Omit<GymWorkout, "id" | "date"> & { id?: string; date?: string }) => void;
  deleteWorkout: (id: string) => void;
}

export const useGymStore = create<GymStore>((set) => ({
  stats: {
    avgReps: 0,
    personalRecord: 0,
    weeklyVolume: 0,
    streak: 0,
  },
  exercises: [],
  workouts: [],
  isLoading: false,
  error: null,

  init: () => {
    set({ isLoading: true, error: null });
    try {
      const exercises = GymService.getExercises();
      const workouts = GymService.getWorkouts();
      const stats = GymService.getStats();
      set({ exercises, workouts, stats, isLoading: false });
    } catch (err: any) {
      set({ error: err?.message || "Failed to load gym data", isLoading: false });
    }
  },

  loadExercises: () => {
    try {
      const exercises = GymService.getExercises();
      set({ exercises });
    } catch (err: any) {
      set({ error: err?.message || "Failed to load exercises" });
    }
  },

  logWorkout: (workout) => {
    try {
      GymService.logWorkout(workout);
      const workouts = GymService.getWorkouts();
      const stats = GymService.getStats();
      set({ workouts, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to log workout" });
    }
  },

  deleteWorkout: (id) => {
    try {
      GymService.deleteWorkout(id);
      const workouts = GymService.getWorkouts();
      const stats = GymService.getStats();
      set({ workouts, stats, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete workout" });
    }
  },
}));