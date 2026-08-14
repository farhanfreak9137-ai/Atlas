"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/stores/search.store";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskService } from "@/services/task.service";
import { NoteService } from "@/services/note.service";
import { GoalService } from "@/services/goal.service";
import { HabitService } from "@/services/habit.service";
import { CalendarService } from "@/services/calendar.service";

type ResultItem = {
  id: string;
  title: string;
  type: string;
  subtitle?: string;
};

export function SearchPanel() {
  const router = useRouter();
  const { open, query, closePanel, setQuery, openPanel } = useSearchStore();
  const [recent, setRecent] = useLocalStorage<string[]>("atlas.recentSearches", []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Keyboard shortcut to open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPanel();
        requestAnimationFrame(() => inputRef.current?.focus());
      }

      if (e.key === "Escape") {
        closePanel();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPanel, closePanel]);

  // Autofocus when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
      setSelectedIndex(0);
    }
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    }

    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open, closePanel]);

  // gather results (memoized)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (q === "") return { groups: new Map<string, ResultItem[]>(), total: 0 };

    const tasks = TaskService.search(q).map((t) => ({
      id: t.id,
      title: t.title,
      type: "Task",
      subtitle: t.dueDate ?? undefined,
    }));

    const notes = NoteService.search(q).map((n) => ({
      id: n.id,
      title: n.title,
      type: "Note",
      subtitle: n.content ? n.content.slice(0, 80) : undefined,
    }));

    const goals = GoalService.getAll()
      .filter((g) => g.title.toLowerCase().includes(q))
      .map((g) => ({ id: g.id, title: g.title, type: "Goal", subtitle: g.deadline }));

    const habits = HabitService.getAll()
      .filter((h) => h.title.toLowerCase().includes(q))
      .map((h) => ({ id: h.id, title: h.title, type: "Habit", subtitle: undefined }));

    const events = CalendarService.getEvents()
      .filter((e) => e.title.toLowerCase().includes(q))
      .map((e) => ({ id: e.id, title: e.title, type: "Event", subtitle: e.date }));

    const groups = new Map<string, ResultItem[]>();

    if (tasks.length) groups.set("Tasks", tasks);
    if (notes.length) groups.set("Notes", notes);
    if (goals.length) groups.set("Goals", goals);
    if (habits.length) groups.set("Habits", habits);
    if (events.length) groups.set("Calendar", events);

    const total = tasks.length + notes.length + goals.length + habits.length + events.length;

    return { groups, total };
  }, [query]);

  const flatResults = useMemo(() => {
    const arr: ResultItem[] = [];
    results.groups.forEach((items) => arr.push(...items));
    return arr;
  }, [results]);

  // keyboard navigation inside panel
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((s) => Math.min(s + 1, Math.max(0, flatResults.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((s) => Math.max(0, s - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatResults[selectedIndex];
        if (item) onSelect(item);
      } else if (e.key === "Escape") {
        closePanel();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flatResults, selectedIndex, closePanel]);

  function onSelect(item: ResultItem) {
    // save to recent searches
    try {
      const v = (recent ?? []).filter(Boolean);
      if (query.trim() !== "") {
        const next = [query.trim(), ...v.filter((r) => r !== query.trim())].slice(0, 10);
        setRecent(next);
      }
    } catch (e) {
      // ignore localstorage errors
    }

    // navigate based on type
    if (item.type === "Task") {
      router.push(`/tasks`);
    } else if (item.type === "Note") {
      router.push(`/notes`);
    } else if (item.type === "Goal") {
      router.push(`/goals`);
    } else if (item.type === "Habit") {
      router.push(`/habits`);
    } else if (item.type === "Event") {
      router.push(`/calendar`);
    } else {
      router.push(`/`);
    }

    closePanel();
  }

  function onRecentClick(text: string) {
    setQuery(text);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl" ref={panelRef}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl backdrop-blur-xl">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Atlas..."
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] px-4 py-3 outline-none text-[var(--text)] placeholder:text-[var(--text-tertiary)]"
                autoFocus
              />

              <div className="mt-3 max-h-80 overflow-auto no-scrollbar">
                {query.trim() === "" ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)]">Recent searches</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(recent || []).map((r) => (
                        <button
                          key={r}
                          onClick={() => onRecentClick(r)}
                          className="rounded-full bg-[var(--surface-2)] border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
                        >
                          {r}
                        </button>
                      ))}
                      {(!recent || recent.length === 0) && (
                        <div className="text-sm text-[var(--text-tertiary)] font-medium">No recent searches</div>
                      )}
                    </div>
                  </div>
                ) : results.total === 0 ? (
                  <div className="p-6 text-center text-[var(--text-secondary)]">
                    <h3 className="text-[var(--text)] font-semibold">No results found</h3>
                    <p className="mt-1 text-sm text-[var(--text-tertiary)]">Try different keywords or check spelling.</p>
                  </div>
                ) : (
                  Array.from(results.groups.entries()).map(([group, items]) => (
                    <div key={group} className="mb-4">
                      <h5 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">{group}</h5>
                      <div className="space-y-1">
                        {items.map((it) => {
                          const globalIndex = flatResults.findIndex((f) => f.id === it.id && f.type === it.type);
                          const selected = globalIndex === selectedIndex;
                          return (
                            <button
                              key={`${it.type}-${it.id}`}
                              onClick={() => onSelect(it)}
                              className={`w-full text-left rounded-xl px-3 py-2.5 transition flex justify-between items-center ${
                                selected
                                  ? "bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] font-semibold"
                                  : "hover:bg-[var(--surface-hover)] text-[var(--text)]"
                              }`}
                            >
                              <div>
                                <div className="font-medium text-sm text-[var(--text)]">{it.title}</div>
                                {it.subtitle && (
                                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{it.subtitle}</div>
                                )}
                              </div>
                              <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--surface-3)] text-[var(--text-tertiary)] shrink-0 ml-4">{it.type}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
