// ──────────────────────────────────────────────
// App Constants
// ──────────────────────────────────────────────

export const APP_NAME = "Coursify";
export const APP_TAGLINE = "Learn Together, Finish Together";

export const DAILY_LESSON_TARGET = 5;

export const TIME_OPTIONS = [
  { value: 10, label: "10 min", desc: "Light pace" },
  { value: 20, label: "20 min", desc: "Recommended" },
  { value: 30, label: "30 min", desc: "Intensive" },
] as const;

export const DEFAULT_DAILY_MINUTES = 20;

export const COHORT_TABS = [
  "overview",
  "lessons",
  "notes",
  "community",
  "members",
  "leaderboard",
] as const;

export type CohortTabId = (typeof COHORT_TABS)[number];
