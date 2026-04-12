// ──────────────────────────────────────────────
// Domain Services — Cohort
// ──────────────────────────────────────────────

import type { JoinedCohort } from "./cohort.types";

export function calculateProgress(joined: JoinedCohort): number {
  if (!joined.lessons.length) return 0;
  const completed = joined.lessons.filter((l) => l.completed).length;
  return Math.round((completed / joined.lessons.length) * 100);
}

export function getNextLesson(joined: JoinedCohort) {
  return joined.lessons.find((l) => !l.completed) ?? null;
}
