// ──────────────────────────────────────────────
// Domain Types — Lesson
// ──────────────────────────────────────────────

export interface Lesson {
  id: string;
  cohortId: string;
  title: string;
  duration: string;
  durationSeconds: number;
  order: number;
  completed: boolean;
  videoId: string;
}

export interface FeedLesson {
  id: string;
  cohortId: string;
  cohortTitle: string;
  cohortEmoji: string;
  title: string;
  duration: string;
  durationSeconds: number;
  order: number;
  totalLessons: number;
  completed: boolean;
  videoId: string;
  cohortProgress: number;
}
