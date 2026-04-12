// ──────────────────────────────────────────────
// Feature: Dashboard — Query Options
// ──────────────────────────────────────────────

import { queryOptions } from "@tanstack/react-query";
import { activity } from "@/data";

export const activityQueryOptions = () =>
  queryOptions({
    queryKey: ["activity"],
    queryFn: () => activity,
  });
