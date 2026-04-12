// ──────────────────────────────────────────────
// Feature: Explore — Query Options
// ──────────────────────────────────────────────

import { queryOptions } from "@tanstack/react-query";
import { cohorts, searchCohorts } from "@/data";

export const allCohortsQueryOptions = () =>
  queryOptions({
    queryKey: ["cohorts"],
    queryFn: () => cohorts,
  });

export const searchCohortsQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["cohorts", "search", query],
    queryFn: () => searchCohorts(query),
  });
