import { create } from "zustand";
import {
  StudyGrade,
  StudySession,
  StudyStats,
  StudySubject,
} from "@/types/study";
import { StudyService } from "@/services/study.service";

interface StudyStore {
  subjects: StudySubject[];
  sessions: StudySession[];
  grades: StudyGrade[];
  stats: StudyStats;
  isLoading: boolean;
  error: string | null;

  init: () => void;

  addSubject: (data: Omit<StudySubject, "id" | "createdAt">) => void;
  deleteSubject: (id: string) => void;

  logSession: (data: Omit<StudySession, "id">) => void;
  deleteSession: (id: string) => void;

  logGrade: (data: Omit<StudyGrade, "id">) => void;
  deleteGrade: (id: string) => void;
}

const emptyStats: StudyStats = {
  totalSubjects: 0,
  totalSessionsThisWeek: 0,
  totalHoursThisWeek: 0,
  totalHoursAllTime: 0,
  studyStreak: 0,
  averageGrade: 0,
  averageFocusRating: 0,
};

export const useStudyStore = create<StudyStore>((set) => ({
  subjects: [],
  sessions: [],
  grades: [],
  stats: emptyStats,
  isLoading: false,
  error: null,

  init: () => {
    set({ isLoading: true, error: null });
    try {
      const subjects = StudyService.getSubjects();
      const sessions = StudyService.getSessions();
      const grades = StudyService.getGrades();
      const stats = StudyService.getStats();
      set({ subjects, sessions, grades, stats, isLoading: false });
    } catch (err: any) {
      set({ error: err?.message || "Failed to load study data", isLoading: false });
    }
  },

  addSubject: (data) => {
    try {
      StudyService.addSubject(data);
      set({
        subjects: StudyService.getSubjects(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to add subject" });
    }
  },

  deleteSubject: (id) => {
    try {
      StudyService.deleteSubject(id);
      set({
        subjects: StudyService.getSubjects(),
        sessions: StudyService.getSessions(),
        grades: StudyService.getGrades(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete subject" });
    }
  },

  logSession: (data) => {
    try {
      StudyService.logSession(data);
      set({
        sessions: StudyService.getSessions(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to log session" });
    }
  },

  deleteSession: (id) => {
    try {
      StudyService.deleteSession(id);
      set({
        sessions: StudyService.getSessions(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete session" });
    }
  },

  logGrade: (data) => {
    try {
      StudyService.logGrade(data);
      set({
        grades: StudyService.getGrades(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to log grade" });
    }
  },

  deleteGrade: (id) => {
    try {
      StudyService.deleteGrade(id);
      set({
        grades: StudyService.getGrades(),
        stats: StudyService.getStats(),
      });
    } catch (err: any) {
      set({ error: err?.message || "Failed to delete grade" });
    }
  },
}));
