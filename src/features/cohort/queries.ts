// ──────────────────────────────────────────────
// Feature: Cohort — Query Options
// ──────────────────────────────────────────────

import { queryOptions } from "@tanstack/react-query";
import { getCohortById, getLessonsByCohortId, members, activity } from "@/data";

export const cohortQueryOptions = (cohortId: string) =>
  queryOptions({
    queryKey: ["cohort", cohortId],
    queryFn: () => {
      const cohort = getCohortById(cohortId);
      if (!cohort) throw new Error(`Cohort ${cohortId} not found`);
      return cohort;
    },
  });

export const cohortLessonsQueryOptions = (cohortId: string) =>
  queryOptions({
    queryKey: ["cohort", cohortId, "lessons"],
    queryFn: () => getLessonsByCohortId(cohortId),
  });

export const cohortMembersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: () => members,
  });

export const cohortActivityQueryOptions = () =>
  queryOptions({
    queryKey: ["activity"],
    queryFn: () => activity,
  });
