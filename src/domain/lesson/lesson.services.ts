// ──────────────────────────────────────────────
// Domain Services — Lesson
// ──────────────────────────────────────────────

import type { Lesson } from "./lesson.types";

export function getSections(lessons: Lesson[]) {
  const sectionSize = Math.ceil(lessons.length / Math.ceil(lessons.length / 6));
  const sections: { title: string; lessons: Lesson[] }[] = [];
  for (let i = 0; i < lessons.length; i += sectionSize) {
    sections.push({
      title: `Module ${sections.length + 1}`,
      lessons: lessons.slice(i, i + sectionSize),
    });
  }
  return sections;
}

export function findLessonById(lessonsMap: Record<string, Lesson[]>, lessonId: string) {
  for (const [cohortId, lessons] of Object.entries(lessonsMap)) {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, cohortId, allLessons: lessons };
  }
  return null;
}
