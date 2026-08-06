"use client";

import { useEffect } from "react";
import { useStudyStore } from "@/stores/study.store";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  BookOpen,
  Clock,
  Flame,
  GraduationCap,
  Star,
  TrendingUp,
} from "lucide-react";

export default function StudyOverviewPage() {
  const { stats, sessions, grades, subjects, init, isLoading } = useStudyStore();

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
      </div>
    );
  }

  const recentSessions = sessions.slice(0, 5);
  const recentGrades = grades.slice(0, 5);

  // Hours per subject
  const hoursPerSubject: Record<string, number> = {};
  for (const s of sessions) {
    hoursPerSubject[s.subjectName] =
      (hoursPerSubject[s.subjectName] || 0) + s.durationMinutes;
  }
  const topSubject = Object.entries(hoursPerSubject).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Hours This Week</p>
            <p className="text-2xl font-bold text-white">{stats.totalHoursThisWeek}h</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Study Streak</p>
            <p className="text-2xl font-bold text-white">{stats.studyStreak} days</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Avg Grade</p>
            <p className="text-2xl font-bold text-white">{stats.averageGrade}%</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center space-x-4">
          <div className="rounded-2xl bg-purple-500/10 p-3 text-purple-400">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Focus Rating</p>
            <p className="text-2xl font-bold text-white">{stats.averageFocusRating} / 10</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Subject breakdown */}
        <GlassCard>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white">Subject Breakdown</h3>
            <TrendingUp className="h-5 w-5 text-zinc-500" />
          </div>
          {subjects.length === 0 ? (
            <p className="text-sm text-zinc-500 italic">No subjects added yet. Go to Subjects to add one.</p>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject) => {
                const minutes = hoursPerSubject[subject.name] || 0;
                const maxMinutes = Math.max(...Object.values(hoursPerSubject), 1);
                const pct = Math.round((minutes / maxMinutes) * 100);
                return (
                  <div key={subject.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-white">{subject.name}</span>
                      <span className="text-zinc-400">{(minutes / 60).toFixed(1)}h</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: subject.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard>
          <h3 className="text-lg font-bold text-white mb-5">Recent Sessions</h3>
          {recentSessions.length === 0 ? (
            <p className="text-sm text-zinc-500 italic">No sessions logged yet.</p>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-3"
                >
                  <div>
                    <p className="font-medium text-white text-sm">{s.subjectName}</p>
                    <p className="text-xs text-zinc-500">{s.type} · {s.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{s.durationMinutes}m</p>
                    <p className="text-xs text-zinc-500">Focus {s.focusRating}/10</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Recent Grades */}
      <GlassCard>
        <h3 className="text-lg font-bold text-white mb-5">Recent Grades</h3>
        {recentGrades.length === 0 ? (
          <p className="text-sm text-zinc-500 italic">No grades logged yet.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentGrades.map((g) => {
              const pct = Math.round((g.scored / g.total) * 100);
              return (
                <div key={g.id} className="rounded-xl border border-white/5 bg-zinc-900/50 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white text-sm">{g.assessmentName}</p>
                      <p className="text-xs text-zinc-500">{g.subjectName} · {g.gradeType}</p>
                    </div>
                    <span
                      className={`text-lg font-bold ${
                        pct >= 80
                          ? "text-emerald-400"
                          : pct >= 60
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{g.scored} / {g.total}</p>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
