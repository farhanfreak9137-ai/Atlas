import {
  gymWorkoutRepository,
  gymExerciseRepository,
} from "@/repositories/gym.repository";
import {
  DEFAULT_EXERCISES,
  GymExercise,
  GymStats,
  GymWorkout,
} from "@/types/gym";

export class GymService {
  static getExercises(): GymExercise[] {
    const stored = gymExerciseRepository.getAll();
    if (!stored || stored.length < DEFAULT_EXERCISES.length) {
      gymExerciseRepository.save(DEFAULT_EXERCISES);
      return DEFAULT_EXERCISES;
    }
    return stored;
  }

  static getWorkouts(): GymWorkout[] {
    return gymWorkoutRepository.getAll();
  }

  static logWorkout(
    workoutData: Omit<GymWorkout, "id" | "date"> & { id?: string; date?: string }
  ): GymWorkout {
    const workouts = gymWorkoutRepository.getAll();
    const newWorkout: GymWorkout = {
      id: workoutData.id || crypto.randomUUID(),
      name: workoutData.name,
      date: workoutData.date || new Date().toISOString(),
      sets: Number(workoutData.sets),
      reps: Number(workoutData.reps),
      weight: Number(workoutData.weight),
      exerciseId: workoutData.exerciseId,
    };

    workouts.unshift(newWorkout);
    gymWorkoutRepository.save(workouts);
    return newWorkout;
  }

  static deleteWorkout(id: string): void {
    const updated = gymWorkoutRepository.getAll().filter((w) => w.id !== id);
    gymWorkoutRepository.save(updated);
  }

  static getStats(): GymStats {
    const workouts = gymWorkoutRepository.getAll();
    if (workouts.length === 0) {
      return {
        avgReps: 0,
        personalRecord: 0,
        weeklyVolume: 0,
        streak: 0,
      };
    }

    const totalReps = workouts.reduce((sum, w) => sum + w.reps * w.sets, 0);
    const totalSets = workouts.reduce((sum, w) => sum + w.sets, 0);
    const avgReps = totalSets > 0 ? Math.round(totalReps / totalSets) : 0;
    const personalRecord = Math.max(...workouts.map((w) => w.weight), 0);

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyVolume = workouts
      .filter((w) => new Date(w.date) >= oneWeekAgo)
      .reduce((sum, w) => sum + w.sets * w.reps * w.weight, 0);

    const workoutDates = Array.from(
      new Set(workouts.map((w) => new Date(w.date).toISOString().split("T")[0]))
    ).sort().reverse();

    let streak = 0;
    if (workoutDates.length > 0) {
      const todayStr = now.toISOString().split("T")[0];
      const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split("T")[0];
      const checkDateStr =
        workoutDates[0] === todayStr
          ? todayStr
          : workoutDates[0] === yesterdayStr
          ? yesterdayStr
          : null;

      if (checkDateStr) {
        let curr = new Date(checkDateStr);
        while (true) {
          const dStr = curr.toISOString().split("T")[0];
          if (workoutDates.includes(dStr)) {
            streak++;
            curr.setDate(curr.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    return {
      avgReps,
      personalRecord,
      weeklyVolume,
      streak,
    };
  }
}