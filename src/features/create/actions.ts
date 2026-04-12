// ──────────────────────────────────────────────
// Feature: Create Course — Actions
// ──────────────────────────────────────────────

import { cohorts } from "@/data";
import type { Cohort } from "@/domain";

/**
 * Simulates course creation from a YouTube URL.
 * In production, this would call a server function.
 */
export function createCourseFromUrl(_url: string): Cohort {
  // For now, return the first mock cohort
  return cohorts[0];
}
