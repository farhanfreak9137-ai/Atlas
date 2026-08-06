"use client";

import { useEffect, useState } from "react";
import { useFootballStore } from "@/stores/football.store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Crosshair, Activity, Clock, Trash2, Plus, Calendar as CalendarIcon } from "lucide-react";
import { FootballMatch, FootballTraining } from "@/types/football";

export default function FootballPage() {
  const {
    stats,
    matches,
    trainings,
    isLoading,
    error,
    init,
    logMatch,
    logTraining,
    deleteMatch,
    deleteTraining,
  } = useFootballStore();

  const [activeTab, setActiveTab] = useState<"match" | "training">("match");
  
  const [newMatch, setNewMatch] = useState<Omit<FootballMatch, "id">>({
    date: new Date().toISOString().split("T")[0],
    opponent: "",
    matchType: "League",
    goals: 0,
    assists: 0,
    minutesPlayed: 90,
    rating: 7,
    manOfTheMatch: false,
    yellowCards: 0,
    redCards: 0,
    result: "Win"
  });

  const [newTraining, setNewTraining] = useState<Omit<FootballTraining, "id">>({
    date: new Date().toISOString().split("T")[0],
    type: "Team Practice",
    focusArea: "",
    durationMinutes: 60,
    distanceKm: 0,
    intensity: 7
  });

  useEffect(() => {
    init();
  }, [init]);

  const handleMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logMatch({
      ...newMatch,
      goals: Number(newMatch.goals),
      assists: Number(newMatch.assists),
      minutesPlayed: Number(newMatch.minutesPlayed),
      rating: Number(newMatch.rating),
      yellowCards: Number(newMatch.yellowCards),
      redCards: Number(newMatch.redCards)
    });
    setNewMatch({
      ...newMatch,
      opponent: "",
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      manOfTheMatch: false
    });
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logTraining({
      ...newTraining,
      durationMinutes: Number(newTraining.durationMinutes),
      distanceKm: Number(newTraining.distanceKm),
      intensity: Number(newTraining.intensity)
    });
    setNewTraining({
      ...newTraining,
      focusArea: "",
      distanceKm: 0
    });
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-zinc-400">Loading football data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8 space-y-8">
      <SectionHeader
        title="Football Performance Tracker"
        subtitle="Log your matches, track training sessions, and analyze your game."
      />

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
            <Crosshair className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Total Goals</p>
            <p className="text-2xl font-bold text-white">{stats.totalGoals}</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Win Rate</p>
            <p className="text-2xl font-bold text-white">{stats.winPercentage}%</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Avg Rating</p>
            <p className="text-2xl font-bold text-white">{stats.averageRating} / 10</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Training Hours</p>
            <p className="text-2xl font-bold text-white">{stats.totalTrainingHours}h</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Logger Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex space-x-2 bg-zinc-900/50 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("match")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                activeTab === "match" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Log Match
            </button>
            <button
              onClick={() => setActiveTab("training")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                activeTab === "training" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Log Training
            </button>
          </div>

          <GlassCard>
            {activeTab === "match" ? (
              <form onSubmit={handleMatchSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">New Match</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Date</label>
                    <input type="date" value={newMatch.date} onChange={(e) => setNewMatch({...newMatch, date: e.target.value})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" required />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Opponent</label>
                    <input type="text" placeholder="e.g. Red Devils FC" value={newMatch.opponent} onChange={(e) => setNewMatch({...newMatch, opponent: e.target.value})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" required />
                  </div>
                  
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Result</label>
                    <select value={newMatch.result} onChange={(e) => setNewMatch({...newMatch, result: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white">
                      <option>Win</option><option>Draw</option><option>Loss</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Type</label>
                    <select value={newMatch.matchType} onChange={(e) => setNewMatch({...newMatch, matchType: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white">
                      <option>League</option><option>Friendly</option><option>Tournament</option><option>5-a-side</option><option>11-a-side</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Goals</label>
                    <input type="number" min="0" value={newMatch.goals} onChange={(e) => setNewMatch({...newMatch, goals: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Assists</label>
                    <input type="number" min="0" value={newMatch.assists} onChange={(e) => setNewMatch({...newMatch, assists: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Rating (1-10)</label>
                    <input type="number" min="1" max="10" step="0.1" value={newMatch.rating} onChange={(e) => setNewMatch({...newMatch, rating: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Minutes</label>
                    <input type="number" min="1" max="120" value={newMatch.minutesPlayed} onChange={(e) => setNewMatch({...newMatch, minutesPlayed: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>

                  <div className="col-span-2 flex items-center mt-2">
                    <input type="checkbox" id="motm" checked={newMatch.manOfTheMatch} onChange={(e) => setNewMatch({...newMatch, manOfTheMatch: e.target.checked})} className="mr-2" />
                    <label htmlFor="motm" className="text-sm font-medium text-zinc-300">Man of the Match 🏆</label>
                  </div>
                </div>

                <button type="submit" className="mt-4 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500">
                  Save Match
                </button>
              </form>
            ) : (
              <form onSubmit={handleTrainingSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">New Training</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Date</label>
                    <input type="date" value={newTraining.date} onChange={(e) => setNewTraining({...newTraining, date: e.target.value})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" required />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Type</label>
                    <select value={newTraining.type} onChange={(e) => setNewTraining({...newTraining, type: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white">
                      <option>Team Practice</option><option>Individual Drill</option><option>Stamina/Cardio</option><option>Recovery</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Focus Area</label>
                    <input type="text" placeholder="e.g. Shooting, Tactics" value={newTraining.focusArea} onChange={(e) => setNewTraining({...newTraining, focusArea: e.target.value})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" required />
                  </div>
                  
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Duration (mins)</label>
                    <input type="number" min="1" value={newTraining.durationMinutes} onChange={(e) => setNewTraining({...newTraining, durationMinutes: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Distance (km)</label>
                    <input type="number" min="0" step="0.1" value={newTraining.distanceKm} onChange={(e) => setNewTraining({...newTraining, distanceKm: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Intensity (1-10)</label>
                    <input type="number" min="1" max="10" value={newTraining.intensity} onChange={(e) => setNewTraining({...newTraining, intensity: e.target.value as any})} className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 text-sm text-white" />
                  </div>
                </div>

                <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500">
                  Save Training
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        {/* History Log */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="mb-4 text-xl font-bold text-white">Recent Matches</h3>
            {matches.length === 0 ? (
              <p className="text-sm text-zinc-500 italic">No matches logged yet.</p>
            ) : (
              <div className="space-y-3">
                {matches.slice(0, 5).map(match => (
                  <div key={match.id} className="flex justify-between items-center bg-zinc-900/60 p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${match.result === 'Win' ? 'bg-emerald-500/20 text-emerald-400' : match.result === 'Loss' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                          {match.result}
                        </span>
                        <h4 className="font-semibold text-white">vs {match.opponent}</h4>
                        {match.manOfTheMatch && <span title="Man of the Match">🏆</span>}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {match.date} • {match.matchType} • Rating: {match.rating}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{match.goals} ⚽</p>
                        <p className="text-sm font-bold text-white">{match.assists} 👟</p>
                      </div>
                      <button onClick={() => deleteMatch(match.id)} className="text-zinc-500 hover:text-red-400 p-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-xl font-bold text-white">Recent Training</h3>
            {trainings.length === 0 ? (
              <p className="text-sm text-zinc-500 italic">No training sessions logged yet.</p>
            ) : (
              <div className="space-y-3">
                {trainings.slice(0, 5).map(t => (
                  <div key={t.id} className="flex justify-between items-center bg-zinc-900/60 p-4 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-semibold text-white">{t.type}</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        {t.date} • Focus: {t.focusArea}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-zinc-300">{t.durationMinutes} mins</p>
                        <p className="text-xs text-zinc-500">{t.distanceKm} km</p>
                      </div>
                      <button onClick={() => deleteTraining(t.id)} className="text-zinc-500 hover:text-red-400 p-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
