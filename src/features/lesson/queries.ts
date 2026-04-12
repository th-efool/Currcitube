// ──────────────────────────────────────────────
// Feature: Lesson — Query Options
// ──────────────────────────────────────────────

import { queryOptions } from "@tanstack/react-query";
import { lessons as lessonRepo, getCohortById, members, activity } from "@/data";
import { findLessonById } from "@/domain/lesson/lesson.services";
import type { Lesson, JoinedCohort, Cohort } from "@/domain";

export interface LessonContext {
  lesson: Lesson;
  cohort: Cohort | null;
  allLessons: Lesson[];
  isJoined: boolean;
}

export function resolveLessonContext(
  lessonId: string,
  joinedCohorts: JoinedCohort[]
): LessonContext | null {
  // Check joined cohorts first
  for (const jc of joinedCohorts) {
    const lesson = jc.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return {
        lesson,
        cohort: jc.cohort,
        allLessons: jc.lessons,
        isJoined: true,
      };
    }
  }

  // Fallback to mock data
  const result = findLessonById(lessonRepo, lessonId);
  if (result) {
    return {
      lesson: result.lesson,
      cohort: getCohortById(result.cohortId) ?? null,
      allLessons: result.allLessons,
      isJoined: false,
    };
  }

  return null;
}

export const lessonMembersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: () => members,
  });

export const lessonActivityQueryOptions = () =>
  queryOptions({
    queryKey: ["activity"],
    queryFn: () => activity,
  });
