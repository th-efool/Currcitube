// ──────────────────────────────────────────────
// Domain Types — Activity & Members
// ──────────────────────────────────────────────

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  time: string;
}

export interface Member {
  name: string;
  avatar: string;
  streak: number;
  progress: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}
