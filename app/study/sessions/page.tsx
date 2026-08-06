"use client";

import { useEffect, useState } from "react";
import { useStudyStore } from "@/stores/study.store";
import { GlassCard } from "@/components/ui/GlassCard";
import { StudySession } from "@/types/study";
import { Clock, Plus, Trash2 } from "lucide-react";

const SESSION_TYPES: StudySession["type"][] = [
  "Deep Work",
  "Review",
  "Homework",
  "Exam Prep",
  "Reading",
];

export default function SessionsPage() {
  const { subjects, sessions, logSession, deleteSession, init, isLoading } =
    useStudyStore();

  const [form, setForm] = useState<Omit<StudySession, "id">>({
    subjectId: "",
    subjectName: "",
    date: new Date().toISOString().split("T")[0],
    durationMinutes: 60,
    type: "Deep Work",
    focusRating: 7,
    notes: "",
  });

  useEffect(() => {
    init();
  }, [init]);

  const handleSubjectChange = (id: string) => {
    const subject = subjects.find((s) => s.id === id);
    setForm({ ...form, subjectId: id, subjectName: subject?.name ?? "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subjectId) return;
    logSession({
      ...form,
      durationMinutes: Number(form.durationMinutes),
      focusRating: Number(form.focusRating),
    });
    setForm({
      ...form,
      subjectId: "",
      subjectName: "",
      notes: "",
      focusRating: 7,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Log Session Form */}
      <div className="lg:col-span-1">
        <GlassCard>
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Log Session</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Subject</label>
              <select
                value={form.subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select a subject...</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {subjects.length === 0 && (
                <p className="text-xs text-amber-400 mt-1">
                  Add a subject first in the Subjects tab.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Duration (mins)</label>
                <input
                  type="number"
                  min="1"
                  value={form.durationMinutes}
                  onChange={(e) => setForm({ ...form, durationMinutes: e.target.value as any })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Focus (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.focusRating}
                  onChange={(e) => setForm({ ...form, focusRating: e.target.value as any })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Session Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                {SESSION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Notes (optional)</label>
              <textarea
                rows={2}
                placeholder="What did you cover?"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!form.subjectId}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Session
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Sessions List */}
      <div className="lg:col-span-2">
        <GlassCard>
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-5 w-5 text-zinc-400" />
            <h3 className="text-lg font-bold text-white">All Sessions ({sessions.length})</h3>
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <Clock className="mx-auto h-12 w-12 text-zinc-700 mb-3" />
              <p className="font-medium text-zinc-400">No sessions yet</p>
              <p className="text-sm text-zinc-600 mt-1">Log your first study session.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {sessions.map((session) => {
                const subject = subjects.find((s) => s.id === session.subjectId);
                return (
                  <div
                    key={session.id}
                    className="flex items-start justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4"
                  >
                    <div className="flex space-x-3">
                      {subject && (
                        <div
                          className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-white text-sm">{session.subjectName}</p>
                          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                            {session.type}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{session.date}</p>
                        {session.notes && (
                          <p className="text-xs text-zinc-400 mt-1 italic">{session.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{session.durationMinutes}m</p>
                        <p className="text-xs text-zinc-500">Focus {session.focusRating}/10</p>
                      </div>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
