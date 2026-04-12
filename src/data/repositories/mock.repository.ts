// ──────────────────────────────────────────────
// Data Repository — Mock Data (Cohorts, Lessons, Community)
// In production this would be replaced by API/DB calls.
// ──────────────────────────────────────────────

import type { Cohort } from "@/domain/cohort/cohort.types";
import type { Lesson } from "@/domain/lesson/lesson.types";
import type { ActivityItem, Member, QuizQuestion } from "@/domain/community/community.types";

// ── Helpers ──

function seededDuration(seed: number, min: number, range: number): number {
  return min + ((seed * 7 + 3) % range);
}

// ── Cohorts ──

export const cohorts: Cohort[] = [
  {
    id: "1",
    title: "Learn German from Scratch",
    description: "A comprehensive German course covering basics to intermediate conversation. Perfect for absolute beginners.",
    source: "playlist",
    totalDuration: "12 hours",
    dailyCommitment: "20 min/day",
    members: 34,
    avgProgress: 42,
    totalLessons: 24,
    estimatedDays: 36,
    thumbnailEmoji: "🇩🇪",
    category: "Language",
    tags: ["german", "beginner", "conversation"],
    views: 2840,
  },
  {
    id: "2",
    title: "React & TypeScript Mastery",
    description: "Deep dive into React with TypeScript. Build real-world apps with hooks, context, and advanced patterns.",
    source: "playlist",
    totalDuration: "18 hours",
    dailyCommitment: "30 min/day",
    members: 89,
    avgProgress: 31,
    totalLessons: 32,
    estimatedDays: 36,
    thumbnailEmoji: "⚛️",
    category: "Programming",
    tags: ["react", "typescript", "frontend", "hooks"],
    views: 12400,
    featured: true,
  },
  {
    id: "3",
    title: "AI & Machine Learning Basics",
    description: "Understand the fundamentals of AI, neural networks, and machine learning algorithms with practical examples.",
    source: "playlist",
    totalDuration: "8 hours",
    dailyCommitment: "15 min/day",
    members: 156,
    avgProgress: 58,
    totalLessons: 16,
    estimatedDays: 32,
    thumbnailEmoji: "🤖",
    category: "AI",
    tags: ["artificial-intelligence", "neural-networks", "python"],
    views: 18900,
    featured: true,
  },
  {
    id: "4",
    title: "Digital Illustration for Beginners",
    description: "Learn digital art from zero. Covers tools, techniques, color theory, and creating your first illustrations.",
    source: "video",
    totalDuration: "6 hours",
    dailyCommitment: "20 min/day",
    members: 23,
    avgProgress: 67,
    totalLessons: 12,
    estimatedDays: 18,
    thumbnailEmoji: "🎨",
    category: "Creative",
    tags: ["illustration", "digital-art", "color-theory"],
    views: 4100,
  },
  {
    id: "5",
    title: "Meditation & Mindfulness",
    description: "Daily guided meditation practices to reduce stress and improve focus. Start your mindfulness journey.",
    source: "playlist",
    totalDuration: "5 hours",
    dailyCommitment: "10 min/day",
    members: 212,
    avgProgress: 73,
    totalLessons: 30,
    estimatedDays: 30,
    thumbnailEmoji: "🧘",
    category: "Wellness",
    tags: ["meditation", "stress-relief", "focus"],
    views: 9200,
  },
  {
    id: "6",
    title: "Finance & Investing 101",
    description: "Learn personal finance, budgeting, and beginner investing strategies to build wealth over time.",
    source: "playlist",
    totalDuration: "10 hours",
    dailyCommitment: "20 min/day",
    members: 67,
    avgProgress: 39,
    totalLessons: 20,
    estimatedDays: 30,
    thumbnailEmoji: "💰",
    category: "Finance",
    tags: ["investing", "budgeting", "personal-finance"],
    views: 7600,
  },
  {
    id: "7",
    title: "Conversational Spanish",
    description: "Skip the grammar rules. Learn the 500 most common phrases to speak confidently in everyday situations.",
    source: "playlist",
    totalDuration: "10 hours",
    dailyCommitment: "20 min/day",
    members: 840,
    avgProgress: 40,
    totalLessons: 30,
    estimatedDays: 30,
    thumbnailEmoji: "🇪🇸",
    category: "Language",
    tags: ["spanish", "phrases", "travel"],
    views: 21500,
    featured: true,
  },
  {
    id: "8",
    title: "UI Design Fundamentals",
    description: "Learn typography, spacing, and color theory through daily practical exercises and real-world projects.",
    source: "playlist",
    totalDuration: "7 hours",
    dailyCommitment: "30 min/day",
    members: 312,
    avgProgress: 22,
    totalLessons: 14,
    estimatedDays: 14,
    thumbnailEmoji: "🎯",
    category: "Creative",
    tags: ["ui-design", "typography", "color-theory", "figma"],
    views: 15300,
  },
  {
    id: "9",
    title: "Deep Work Habits",
    description: "Reclaim your focus. A week-long sprint to build a distraction-free work environment and peak productivity.",
    source: "video",
    totalDuration: "3.5 hours",
    dailyCommitment: "30 min/day",
    members: 1200,
    avgProgress: 85,
    totalLessons: 7,
    estimatedDays: 7,
    thumbnailEmoji: "🧠",
    category: "Wellness",
    tags: ["productivity", "focus", "habits"],
    views: 31200,
  },
  {
    id: "10",
    title: "Python for Data Science",
    description: "From zero to pandas. Learn Python fundamentals, data wrangling, and visualization for real-world datasets.",
    source: "playlist",
    totalDuration: "14 hours",
    dailyCommitment: "25 min/day",
    members: 445,
    avgProgress: 35,
    totalLessons: 28,
    estimatedDays: 34,
    thumbnailEmoji: "🐍",
    category: "Programming",
    tags: ["python", "pandas", "data-science", "visualization"],
    views: 19800,
  },
  {
    id: "11",
    title: "Public Speaking Confidence",
    description: "Overcome stage fright and deliver compelling presentations with daily practice exercises.",
    source: "playlist",
    totalDuration: "4 hours",
    dailyCommitment: "15 min/day",
    members: 178,
    avgProgress: 51,
    totalLessons: 16,
    estimatedDays: 16,
    thumbnailEmoji: "🎤",
    category: "Business",
    tags: ["speaking", "presentations", "confidence"],
    views: 8400,
  },
  {
    id: "12",
    title: "Photography Essentials",
    description: "Master composition, lighting, and editing. Go from auto mode to full manual control in 21 days.",
    source: "playlist",
    totalDuration: "9 hours",
    dailyCommitment: "25 min/day",
    members: 93,
    avgProgress: 44,
    totalLessons: 21,
    estimatedDays: 21,
    thumbnailEmoji: "📸",
    category: "Creative",
    tags: ["photography", "composition", "editing", "lightroom"],
    views: 5600,
  },
];

// ── Lessons ──

const lessonNames1 = ["Basic Greetings", "Numbers 1-20", "Colors & Shapes", "Family Members", "Food & Drinks", "Days & Months", "Common Verbs", "Sentence Structure", "Questions", "At the Restaurant", "Directions", "Shopping", "Weather", "Hobbies", "Travel", "At the Doctor", "At Work", "Phone Calls", "Writing Emails", "Past Tense", "Future Tense", "Conditionals", "Idioms", "Final Review"];
const lessonNames2 = ["JSX Basics", "Components", "Props", "State", "Effects", "Hooks", "Context", "TypeScript Intro", "TS with React", "Custom Hooks", "Forms", "Routing", "API Calls", "Error Handling", "Testing", "Performance", "Memoization", "Suspense", "Server Components", "Auth Patterns", "State Management", "Zustand", "React Query", "Animations", "Accessibility", "i18n", "PWA", "Deployment", "CI/CD", "Monorepos", "Design Systems", "Final Project"];

function buildLessons(cohortId: string, count: number, names?: string[]): Lesson[] {
  return Array.from({ length: count }, (_, i) => {
    const dur = seededDuration(i + (cohortId === "1" ? 0 : cohortId === "2" ? 0 : Number(cohortId) * 100), cohortId === "2" ? 8 : cohortId === "1" ? 6 : 5, cohortId === "2" ? 12 : cohortId === "1" ? 10 : 12);
    return {
      id: `${cohortId}-${i + 1}`,
      cohortId,
      title: names?.[i] ? `Lesson ${i + 1}: ${names[i]}` : `Lesson ${i + 1}`,
      duration: `${dur} min`,
      durationSeconds: dur * 60,
      order: i + 1,
      completed: cohortId === "1" && i < 3,
      videoId: "dQw4w9WgXcQ",
    };
  });
}

export const lessons: Record<string, Lesson[]> = {
  "1": buildLessons("1", 24, lessonNames1),
  "2": buildLessons("2", 32, lessonNames2),
};

// Generate remaining cohort lessons
for (const c of cohorts) {
  if (!lessons[c.id]) {
    lessons[c.id] = buildLessons(c.id, c.totalLessons);
  }
}

// ── Community ──

export const activity: ActivityItem[] = [
  { id: "a1", user: "Aman", avatar: "A", action: "completed Lesson 4", time: "2 min ago" },
  { id: "a2", user: "Riya", avatar: "R", action: "is on a 5 day streak 🔥", time: "5 min ago" },
  { id: "a3", user: "You", avatar: "Y", action: "missed yesterday 😬", time: "1 hour ago" },
  { id: "a4", user: "Priya", avatar: "P", action: "joined the cohort", time: "3 hours ago" },
  { id: "a5", user: "Alex", avatar: "A", action: "completed Lesson 7", time: "5 hours ago" },
  { id: "a6", user: "Sarah", avatar: "S", action: "started a new streak!", time: "6 hours ago" },
];

export const members: Member[] = [
  { name: "Aman S.", avatar: "A", streak: 7, progress: 45 },
  { name: "Riya K.", avatar: "R", streak: 5, progress: 62 },
  { name: "Priya M.", avatar: "P", streak: 3, progress: 28 },
  { name: "Alex J.", avatar: "A", streak: 12, progress: 71 },
  { name: "Sarah L.", avatar: "S", streak: 1, progress: 15 },
  { name: "David C.", avatar: "D", streak: 8, progress: 55 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the German word for 'Good morning'?",
    options: ["Guten Morgen", "Guten Tag", "Gute Nacht", "Auf Wiedersehen"],
    correctIndex: 0,
  },
  {
    id: "q2",
    question: "How do you say 'Thank you' in German?",
    options: ["Bitte", "Danke", "Entschuldigung", "Tschüss"],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "What does 'Wie heißen Sie?' mean?",
    options: ["How are you?", "Where are you from?", "What is your name?", "How old are you?"],
    correctIndex: 2,
  },
];

// ── Query Functions (future: replace with real API calls) ──

export function getCohortById(id: string): Cohort | undefined {
  return cohorts.find((c) => c.id === id);
}

export function getLessonsByCohortId(cohortId: string): Lesson[] {
  return lessons[cohortId] ?? [];
}

export function searchCohorts(query: string): Cohort[] {
  if (!query) return cohorts;
  const q = query.toLowerCase();
  return cohorts.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getFeaturedCohorts(): Cohort[] {
  return cohorts.filter((c) => c.featured);
}

export function getCohortsByCategory(category: string): Cohort[] {
  if (!category || category === "All Topics") return cohorts;
  return cohorts.filter((c) => c.category === category);
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k views`;
  return `${views} views`;
}
