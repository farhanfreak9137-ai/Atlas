"use client";

import { useEffect, useState } from "react";
import { useStudyStore } from "@/stores/study.store";
import { GlassCard } from "@/components/ui/GlassCard";
import { StudyGrade } from "@/types/study";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const GRADE_TYPES: StudyGrade["gradeType"][] = [
  "Exam",
  "Assignment",
  "Quiz",
  "Project",
  "Presentation",
];

export default function GradesPage() {
  const { subjects, grades, logGrade, deleteGrade, init, isLoading } =
    useStudyStore();

  const [form, setForm] = useState<Omit<StudyGrade, "id">>({
    subjectId: "",
    subjectName: "",
    assessmentName: "",
    gradeType: "Exam",
    scored: 0,
    total: 100,
    date: new Date().toISOString().split("T")[0],
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
    if (!form.subjectId || !form.assessmentName.trim()) return;
    logGrade({
      ...form,
      scored: Number(form.scored),
      total: Number(form.total),
    });
    setForm({
      ...form,
      subjectId: "",
      subjectName: "",
      assessmentName: "",
      scored: 0,
      total: 100,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-500" />
      </div>
    );
  }

  // Group grades by subject
  const gradesBySubject: Record<string, StudyGrade[]> = {};
  for (const grade of grades) {
    if (!gradesBySubject[grade.subjectName]) {
      gradesBySubject[grade.subjectName] = [];
    }
    gradesBySubject[grade.subjectName].push(grade);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Log Grade Form */}
      <div className="lg:col-span-1">
        <GlassCard>
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Log Grade</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Subject</label>
              <select
                value={form.subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                required
              >
                <option value="">Select a subject...</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {subjects.length === 0 && (
                <p className="text-xs text-amber-400 mt-1">
                  Add a subject first in the Subjects tab.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Assessment Name</label>
              <input
                type="text"
                placeholder="e.g. Chapter 3 Quiz"
                value={form.assessmentName}
                onChange={(e) => setForm({ ...form, assessmentName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Type</label>
              <select
                value={form.gradeType}
                onChange={(e) => setForm({ ...form, gradeType: e.target.value as any })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              >
                {GRADE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Score</label>
                <input
                  type="number"
                  min="0"
                  value={form.scored}
                  onChange={(e) => setForm({ ...form, scored: e.target.value as any })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Out Of</label>
                <input
                  type="number"
                  min="1"
                  value={form.total}
                  onChange={(e) => setForm({ ...form, total: e.target.value as any })}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/90 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            {form.total > 0 && (
              <div className="rounded-xl bg-zinc-900/50 p-3 text-center">
                <p className="text-xs text-zinc-500">Preview</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    (form.scored / form.total) * 100 >= 80
                      ? "text-emerald-400"
                      : (form.scored / form.total) * 100 >= 60
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {Math.round((Number(form.scored) / Number(form.total)) * 100)}%
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!form.subjectId}
              className="w-full rounded-xl bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Grade
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Grades List grouped by subject */}
      <div className="lg:col-span-2 space-y-6">
        {grades.length === 0 ? (
          <GlassCard>
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-zinc-700 mb-3" />
              <p className="font-medium text-zinc-400">No grades logged yet</p>
              <p className="text-sm text-zinc-600 mt-1">Log your first grade using the form.</p>
            </div>
          </GlassCard>
        ) : (
          Object.entries(gradesBySubject).map(([subjectName, subjectGrades]) => {
            const avgPct = Math.round(
              subjectGrades.reduce((sum, g) => sum + (g.scored / g.total) * 100, 0) /
              subjectGrades.length
            );
            const subject = subjects.find((s) => s.name === subjectName);

            return (
              <GlassCard key={subjectName}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {subject && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                    )}
                    <h4 className="font-bold text-white">{subjectName}</h4>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      avgPct >= 80
                        ? "text-emerald-400"
                        : avgPct >= 60
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    Avg: {avgPct}%
                    {subject && avgPct >= subject.targetGrade && " ✅"}
                  </span>
                </div>

                <div className="space-y-2">
                  {subjectGrades.map((grade) => {
                    const pct = Math.round((grade.scored / grade.total) * 100);
                    return (
                      <div
                        key={grade.id}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/40 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{grade.assessmentName}</p>
                          <p className="text-xs text-zinc-500">{grade.gradeType} · {grade.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p
                              className={`font-bold ${
                                pct >= 80
                                  ? "text-emerald-400"
                                  : pct >= 60
                                  ? "text-amber-400"
                                  : "text-red-400"
                              }`}
                            >
                              {pct}%
                            </p>
                            <p className="text-xs text-zinc-500">
                              {grade.scored}/{grade.total}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteGrade(grade.id)}
                            className="rounded-lg p-1.5 text-zinc-600 hover:bg-red-500/10 hover:text-red-400 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
