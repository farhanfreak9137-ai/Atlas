import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { StudySubject, StudySession, StudyGrade } from "@/types/study";

export const studySubjectRepository = new BaseRepository<StudySubject>(
  STORAGE_KEYS.STUDY_SUBJECTS
);

export const studySessionRepository = new BaseRepository<StudySession>(
  STORAGE_KEYS.STUDY_SESSIONS
);

export const studyGradeRepository = new BaseRepository<StudyGrade>(
  STORAGE_KEYS.STUDY_GRADES
);
