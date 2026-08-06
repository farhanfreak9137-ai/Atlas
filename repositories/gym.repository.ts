import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { GymExercise, GymWorkout } from "@/types/gym";

export const gymWorkoutRepository = new BaseRepository<GymWorkout>(
  STORAGE_KEYS.GYM_WORKOUTS
);

export const gymExerciseRepository = new BaseRepository<GymExercise>(
  STORAGE_KEYS.GYM_EXERCISES
);