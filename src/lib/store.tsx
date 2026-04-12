// ──────────────────────────────────────────────
// App State Provider
// ──────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Cohort, JoinedCohort, Lesson } from "@/domain";
import { lessons as lessonRepo } from "@/data";
import { calculateProgress } from "@/domain/cohort/cohort.services";

interface AppState {
  joinedCohorts: JoinedCohort[];
  joinCohort: (cohort: Cohort, dailyMinutes: number) => void;
  isJoined: (cohortId: string) => boolean;
  getJoinedCohort: (cohortId: string) => JoinedCohort | undefined;
  completeLesson: (cohortId: string, lessonId: string) => void;
  getProgress: (cohortId: string) => number;
  streak: number;
  incrementStreak: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [joinedCohorts, setJoinedCohorts] = useState<JoinedCohort[]>([]);
  const [streak, setStreak] = useState(3);

  const joinCohort = useCallback((cohort: Cohort, dailyMinutes: number) => {
    setJoinedCohorts((prev) => {
      if (prev.find((j) => j.cohort.id === cohort.id)) return prev;
      const lessons = (lessonRepo[cohort.id] || []).map((l) => ({ ...l }));
      return [...prev, { cohort, dailyMinutes, joinedAt: new Date(), streak: 0, lessons }];
    });
  }, []);

  const isJoined = useCallback(
    (cohortId: string) => joinedCohorts.some((j) => j.cohort.id === cohortId),
    [joinedCohorts]
  );

  const getJoinedCohort = useCallback(
    (cohortId: string) => joinedCohorts.find((j) => j.cohort.id === cohortId),
    [joinedCohorts]
  );

  const completeLesson = useCallback((cohortId: string, lessonId: string) => {
    setJoinedCohorts((prev) =>
      prev.map((j) =>
        j.cohort.id === cohortId
          ? { ...j, lessons: j.lessons.map((l) => (l.id === lessonId ? { ...l, completed: true } : l)) }
          : j
      )
    );
  }, []);

  const getProgress = useCallback(
    (cohortId: string) => {
      const joined = joinedCohorts.find((j) => j.cohort.id === cohortId);
      if (!joined) return 0;
      return calculateProgress(joined);
    },
    [joinedCohorts]
  );

  const incrementStreak = useCallback(() => setStreak((s) => s + 1), []);

  return (
    <AppContext.Provider
      value={{ joinedCohorts, joinCohort, isJoined, getJoinedCohort, completeLesson, getProgress, streak, incrementStreak }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
