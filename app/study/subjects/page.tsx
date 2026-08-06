"use client";

import { useEffect, useState } from "react";
import { useStudyStore } from "@/stores/study.store";
import { GlassCard } from "@/components/ui/GlassCard";
import { StudySubject } from "@/types/study";
import { BookOpen, Plus, Trash2 } from "lucide-react";

const PRESET_COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
];

export default function SubjectsPage() {
  const { subjects, addSubject, deleteSubject, init, isLoading } = useStudyStore();

  const [form, setForm] = useState<Omit<StudySubject, "id" | "createdAt">>({
    name: "",
    color: PRESET_COLORS[0],
    teacher: "",
    targetGrade: 85,
  });

  useEffect(() => {
    init();
  }, [init]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addSubject(form);
    setForm({ name: "", color: PRESET_COLORS[0], teacher: "", targetGrade: 85 });
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
      {/* Add Subject Form */}
      <div className="lg:col-span-1">
        <GlassCard>
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">New Subject</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Subject Name</label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Teacher / Professor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Smith"
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Target Grade (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.targetGrade}
                onChange={(e) => setForm({ ...form, targetGrade: Number(e.target.value) })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-400">Color</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    className={`h-7 w-7 rounded-full transition-transform ${
                      form.color === color ? "scale-125 ring-2 ring-white/50" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              Add Subject
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Subjects List */}
      <div className="lg:col-span-2">
        <GlassCard>
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="h-5 w-5 text-zinc-400" />
            <h3 className="text-lg font-bold text-white">Your Subjects ({subjects.length})</h3>
          </div>

          {subjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-zinc-700 mb-3" />
              <p className="font-medium text-zinc-400">No subjects yet</p>
              <p className="text-sm text-zinc-600 mt-1">Add your first subject using the form.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-5 transition hover:border-white/10"
                >
                  {/* Color accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                    style={{ backgroundColor: subject.color }}
                  />

                  <div className="ml-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white">{subject.name}</h4>
                      {subject.teacher && (
                        <p className="text-xs text-zinc-500 mt-1">{subject.teacher}</p>
                      )}
                      <div className="mt-3 flex items-center space-x-2">
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white/80" style={{ backgroundColor: `${subject.color}33` }}>
                          Target: {subject.targetGrade}%
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteSubject(subject.id)}
                      className="rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                      title="Delete subject"
                    >
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
  );
}
