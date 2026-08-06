export interface GymExercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

export interface GymStats {
  avgReps: number;
  personalRecord: number;
  weeklyVolume: number;
  streak: number;
}

export interface GymWorkout {
  id: string;
  name: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  exerciseId: string;
}

export const DEFAULT_EXERCISES: GymExercise[] = [
  // Chest
  { id: "1", name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "2", name: "Incline Bench Press", muscleGroup: "Chest", equipment: "Dumbbell", difficulty: "Intermediate" },
  { id: "3", name: "Push-ups", muscleGroup: "Chest", equipment: "Bodyweight", difficulty: "Beginner" },
  { id: "4", name: "Chest Flyes", muscleGroup: "Chest", equipment: "Cable", difficulty: "Intermediate" },
  // Back
  { id: "5", name: "Pull-ups", muscleGroup: "Back", equipment: "Bodyweight", difficulty: "Advanced" },
  { id: "6", name: "Lat Pulldowns", muscleGroup: "Back", equipment: "Cable", difficulty: "Beginner" },
  { id: "7", name: "Bent-Over Rows", muscleGroup: "Back", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "8", name: "Seated Cable Rows", muscleGroup: "Back", equipment: "Cable", difficulty: "Beginner" },
  // Shoulders
  { id: "9", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "10", name: "Lateral Raises", muscleGroup: "Shoulders", equipment: "Dumbbell", difficulty: "Beginner" },
  { id: "11", name: "Face Pulls", muscleGroup: "Shoulders", equipment: "Cable", difficulty: "Intermediate" },
  { id: "12", name: "Shrugs", muscleGroup: "Shoulders", equipment: "Dumbbell", difficulty: "Beginner" },
  // Legs
  { id: "13", name: "Squat", muscleGroup: "Legs", equipment: "Barbell", difficulty: "Advanced" },
  { id: "14", name: "Deadlift", muscleGroup: "Legs", equipment: "Barbell", difficulty: "Advanced" },
  { id: "15", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", difficulty: "Beginner" },
  { id: "16", name: "Lunges", muscleGroup: "Legs", equipment: "Dumbbell", difficulty: "Beginner" },
  { id: "17", name: "Calf Raises", muscleGroup: "Legs", equipment: "Machine", difficulty: "Beginner" },
  // Arms
  { id: "18", name: "Bicep Curls", muscleGroup: "Arms", equipment: "Dumbbell", difficulty: "Beginner" },
  { id: "19", name: "Hammer Curls", muscleGroup: "Arms", equipment: "Dumbbell", difficulty: "Beginner" },
  { id: "20", name: "Tricep Dips", muscleGroup: "Arms", equipment: "Bodyweight", difficulty: "Intermediate" },
  { id: "21", name: "Tricep Pushdowns", muscleGroup: "Arms", equipment: "Cable", difficulty: "Beginner" },
  // Core
  { id: "22", name: "Plank", muscleGroup: "Core", equipment: "Bodyweight", difficulty: "Beginner" },
  { id: "23", name: "Crunches", muscleGroup: "Core", equipment: "Bodyweight", difficulty: "Beginner" },
  { id: "24", name: "Russian Twists", muscleGroup: "Core", equipment: "Bodyweight", difficulty: "Intermediate" }
];