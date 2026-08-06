"use client";

import { useEffect, useState } from "react";
import { useGymStore } from "@/stores/gym.store";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GymExercise } from "@/types/gym";
import { Dumbbell, Flame, Trophy, TrendingUp, Plus, Trash2 } from "lucide-react";

export default function GymPage() {
  const {
    stats,
    exercises,
    workouts,
    isLoading,
    error,
    init,
    logWorkout,
    deleteWorkout,
  } = useGymStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [newWorkout, setNewWorkout] = useState({
    exerciseId: "",
    weight: 100,
    reps: 10,
    sets: 3,
  });

  useEffect(() => {
    init();
  }, [init]);

  const selectedExercise = exercises.find((e) => e.id === newWorkout.exerciseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newWorkout.exerciseId) {
      setSubmitError("Please select an exercise");
      return;
    }

    if (!selectedExercise) {
      setSubmitError("Invalid exercise selected");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      logWorkout({
        name: selectedExercise.name,
        sets: newWorkout.sets,
        reps: newWorkout.reps,
        weight: newWorkout.weight,
        exerciseId: newWorkout.exerciseId,
      });
      setNewWorkout({ exerciseId: "", weight: 100, reps: 10, sets: 3 });
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to log workout");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        <DashboardPanel>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500"></div>
            <p className="mt-4 text-zinc-400">Loading gym data...</p>
          </div>
        </DashboardPanel>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8 space-y-8">
      <SectionHeader
        title="Gym Routine & Workout Log"
        subtitle="Track your daily workouts, personal records, and volume progress."
      />

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {submitError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {submitError}
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Avg Reps / Set</p>
            <p className="text-2xl font-bold text-white">{stats.avgReps}</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Max PR Weight</p>
            <p className="text-2xl font-bold text-white">{stats.personalRecord} kg</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Weekly Volume</p>
            <p className="text-2xl font-bold text-white">{stats.weeklyVolume} kg</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-rose-500/10 p-3 text-rose-400">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Workout Streak</p>
            <p className="text-2xl font-bold text-white">{stats.streak} days</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Log Workout Form */}
        <div className="lg:col-span-1">
          <GlassCard>
            <div className="flex items-center space-x-2 mb-6">
              <Plus className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Log Workout</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Exercise
                </label>
                <select
                  value={newWorkout.exerciseId}
                  onChange={(e) =>
                    setNewWorkout((prev) => ({ ...prev, exerciseId: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select Exercise...</option>
                  {exercises.map((exercise: GymExercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name} ({exercise.muscleGroup})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-300">
                    Sets
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newWorkout.sets}
                    onChange={(e) =>
                      setNewWorkout((prev) => ({
                        ...prev,
                        sets: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-300">
                    Reps
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newWorkout.reps}
                    onChange={(e) =>
                      setNewWorkout((prev) => ({
                        ...prev,
                        reps: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-300">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="2.5"
                    value={newWorkout.weight}
                    onChange={(e) =>
                      setNewWorkout((prev) => ({
                        ...prev,
                        weight: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newWorkout.exerciseId}
                className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging..." : "Log Workout"}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Recent Workouts Log */}
        <div className="lg:col-span-2">
          <GlassCard>
            <h3 className="mb-6 text-xl font-bold text-white">Recent Workouts</h3>

            {workouts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
                <Dumbbell className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
                <p className="text-zinc-400 font-medium">No workouts logged yet.</p>
                <p className="text-sm text-zinc-500 mt-1">Select an exercise and log your first set above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900/60 p-4 transition hover:border-emerald-500/30"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-white">{workout.name}</h4>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          {workout.sets} × {workout.reps} @ {workout.weight} kg
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Logged on {new Date(workout.date).toLocaleDateString()} at{" "}
                        {new Date(workout.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteWorkout(workout.id)}
                      className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                      title="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </main>
  );
}