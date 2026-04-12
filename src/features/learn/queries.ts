// ──────────────────────────────────────────────
// Feature: Learn (Microlearning Feed) — Query Options
// ──────────────────────────────────────────────

import { queryOptions } from "@tanstack/react-query";
import { members, activity } from "@/data";

export const feedMembersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: () => members,
  });

export const feedActivityQueryOptions = () =>
  queryOptions({
    queryKey: ["activity"],
    queryFn: () => activity,
  });
