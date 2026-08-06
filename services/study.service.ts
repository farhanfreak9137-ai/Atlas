import {
  studySubjectRepository,
  studySessionRepository,
  studyGradeRepository,
} from "@/repositories/study.repository";
import {
  StudyGrade,
  StudySession,
  StudyStats,
  StudySubject,
} from "@/types/study";

export class StudyService {
  // ── Subjects ──────────────────────────────────────────────
  static getSubjects(): StudySubject[] {
    return studySubjectRepository.getAll();
  }

  static addSubject(data: Omit<StudySubject, "id" | "createdAt">): StudySubject {
    const subjects = studySubjectRepository.getAll();
    const newSubject: StudySubject = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    subjects.push(newSubject);
    studySubjectRepository.save(subjects);
    return newSubject;
  }

  static deleteSubject(id: string): void {
    const subjects = studySubjectRepository.getAll().filter((s) => s.id !== id);
    studySubjectRepository.save(subjects);
    // Also remove related sessions and grades
    const sessions = studySessionRepository.getAll().filter((s) => s.subjectId !== id);
    studySessionRepository.save(sessions);
    const grades = studyGradeRepository.getAll().filter((g) => g.subjectId !== id);
    studyGradeRepository.save(grades);
  }

  // ── Sessions ──────────────────────────────────────────────
  static getSessions(): StudySession[] {
    return studySessionRepository.getAll();
  }

  static logSession(data: Omit<StudySession, "id">): StudySession {
    const sessions = studySessionRepository.getAll();
    const newSession: StudySession = { ...data, id: crypto.randomUUID() };
    sessions.unshift(newSession);
    studySessionRepository.save(sessions);
    return newSession;
  }

  static deleteSession(id: string): void {
    const sessions = studySessionRepository.getAll().filter((s) => s.id !== id);
    studySessionRepository.save(sessions);
  }

  // ── Grades ────────────────────────────────────────────────
  static getGrades(): StudyGrade[] {
    return studyGradeRepository.getAll();
  }

  static logGrade(data: Omit<StudyGrade, "id">): StudyGrade {
    const grades = studyGradeRepository.getAll();
    const newGrade: StudyGrade = { ...data, id: crypto.randomUUID() };
    grades.unshift(newGrade);
    studyGradeRepository.save(grades);
    return newGrade;
  }

  static deleteGrade(id: string): void {
    const grades = studyGradeRepository.getAll().filter((g) => g.id !== id);
    studyGradeRepository.save(grades);
  }

  // ── Stats ─────────────────────────────────────────────────
  static getStats(): StudyStats {
    const sessions = studySessionRepository.getAll();
    const grades = studyGradeRepository.getAll();
    const subjects = studySubjectRepository.getAll();

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sessionsThisWeek = sessions.filter(
      (s) => new Date(s.date) >= oneWeekAgo
    );
    const totalSessionsThisWeek = sessionsThisWeek.length;
    const totalMinutesThisWeek = sessionsThisWeek.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );
    const totalHoursThisWeek = Number((totalMinutesThisWeek / 60).toFixed(1));

    const totalMinutesAllTime = sessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );
    const totalHoursAllTime = Number((totalMinutesAllTime / 60).toFixed(1));

    // Study streak
    const sessionDates = Array.from(
      new Set(sessions.map((s) => s.date.split("T")[0]))
    )
      .sort()
      .reverse();

    let studyStreak = 0;
    if (sessionDates.length > 0) {
      const todayStr = now.toISOString().split("T")[0];
      const yesterdayStr = new Date(now.getTime() - 86400000)
        .toISOString()
        .split("T")[0];
      const startStr =
        sessionDates[0] === todayStr
          ? todayStr
          : sessionDates[0] === yesterdayStr
          ? yesterdayStr
          : null;
      if (startStr) {
        let curr = new Date(startStr);
        while (true) {
          const d = curr.toISOString().split("T")[0];
          if (sessionDates.includes(d)) {
            studyStreak++;
            curr.setDate(curr.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    // Average grade
    const averageGrade =
      grades.length > 0
        ? Number(
            (
              grades.reduce((sum, g) => sum + (g.scored / g.total) * 100, 0) /
              grades.length
            ).toFixed(1)
          )
        : 0;

    // Average focus rating
    const averageFocusRating =
      sessions.length > 0
        ? Number(
            (
              sessions.reduce((sum, s) => sum + s.focusRating, 0) /
              sessions.length
            ).toFixed(1)
          )
        : 0;

    return {
      totalSubjects: subjects.length,
      totalSessionsThisWeek,
      totalHoursThisWeek,
      totalHoursAllTime,
      studyStreak,
      averageGrade,
      averageFocusRating,
    };
  }
}
