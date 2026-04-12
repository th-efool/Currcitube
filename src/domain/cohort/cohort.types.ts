// ──────────────────────────────────────────────
// Domain Types — Cohort
import type { Lesson } from "../lesson/lesson.types";
// ──────────────────────────────────────────────

export interface Cohort {
  id: string;
  title: string;
  description: string;
  source: "playlist" | "video";
  totalDuration: string;
  dailyCommitment: string;
  members: number;
  avgProgress: number;
  totalLessons: number;
  estimatedDays: number;
  thumbnailEmoji: string;
  category: CohortCategory;
  tags: string[];
  views: number;
  featured?: boolean;
}

export interface JoinedCohort {
  cohort: Cohort;
  dailyMinutes: number;
  joinedAt: Date;
  streak: number;
  lessons: Lesson[];
}

export type CohortCategory = "Language" | "Programming" | "AI" | "Creative" | "Wellness" | "Finance" | "Business";

export const COHORT_CATEGORIES: CohortCategory[] = [
  "Language", "Programming", "AI", "Creative", "Wellness", "Finance", "Business",
];
