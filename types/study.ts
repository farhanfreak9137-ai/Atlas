export interface StudySubject {
  id: string;
  name: string;
  color: string; // hex or tailwind color name
  teacher: string;
  targetGrade: number; // e.g. 85 (%)
  createdAt: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  durationMinutes: number;
  type: "Deep Work" | "Review" | "Homework" | "Exam Prep" | "Reading";
  focusRating: number; // 1-10
  notes: string;
}

export interface StudyGrade {
  id: string;
  subjectId: string;
  subjectName: string;
  assessmentName: string;
  gradeType: "Exam" | "Assignment" | "Quiz" | "Project" | "Presentation";
  scored: number;
  total: number;
  date: string;
}

export interface StudyStats {
  totalSubjects: number;
  totalSessionsThisWeek: number;
  totalHoursThisWeek: number;
  totalHoursAllTime: number;
  studyStreak: number; // consecutive days studied
  averageGrade: number; // % across all graded items
  averageFocusRating: number;
}
