import { z } from "zod";

export const joinCohortSchema = z.object({
  cohortId: z.string().min(1, "Cohort ID is required"),
  dailyMinutes: z.number().min(5).max(120),
});

export const createCourseSchema = z.object({
  url: z.string().url("Please enter a valid YouTube URL"),
  dailyMinutes: z.number().min(5).max(120),
  quizEnabled: z.boolean(),
});

export type JoinCohortInput = z.infer<typeof joinCohortSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
