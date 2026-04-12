import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, FileText, Users, ChevronDown,
  Flame, BookOpen, ChevronUp, BarChart3, Bell,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { members, activity } from "@/data";
import { toast } from "sonner";

export const Route = createFileRoute("/learn")({
  component: MicrolearningFeed,
  head: () => ({
    meta: [
      { title: "Microlearning — Coursify" },
      { name: "description", content: "TikTok-style learning feed across all your cohorts." },
    ],
  }),
});

interface FeedLesson {
  id: string;
  cohortId: string;
  cohortTitle: string;
  cohortEmoji: string;
  title: string;
  duration: string;
  durationSeconds: number;
  order: number;
  totalLessons: number;
  completed: boolean;
  videoId: string;
  cohortProgress: number;
}

function MicrolearningFeed() {
  const { joinedCohorts, completeLesson, incrementStreak, getProgress } = useApp();
  const navigate = useNavigate();

  // Build feed from all joined cohorts
  const feedLessons = useMemo(() => {
    const lessons: FeedLesson[] = [];
    for (const jc of joinedCohorts) {
      const progress = Math.round(
        (jc.lessons.filter((l) => l.completed).length / jc.lessons.length) * 100
      );
      for (const l of jc.lessons) {
        lessons.push({
          id: l.id,
          cohortId: jc.cohort.id,
          cohortTitle: jc.cohort.title,
          cohortEmoji: jc.cohort.thumbnailEmoji,
          title: l.title,
          duration: l.duration,
          durationSeconds: l.durationSeconds,
          order: l.order,
          totalLessons: jc.lessons.length,
          completed: l.completed,
          videoId: l.videoId,
          cohortProgress: progress,
        });
      }
    }

    // Sort: incomplete first (today's / next in sequence), then completed
    const incomplete = lessons.filter((l) => !l.completed);
    const completed = lessons.filter((l) => l.completed);

    // For incomplete, interleave from different cohorts
    const cohortQueues: Record<string, FeedLesson[]> = {};
    for (const l of incomplete) {
      if (!cohortQueues[l.cohortId]) cohortQueues[l.cohortId] = [];
      cohortQueues[l.cohortId].push(l);
    }
    // Sort each queue by order
    Object.values(cohortQueues).forEach((q) => q.sort((a, b) => a.order - b.order));

    const interleaved: FeedLesson[] = [];
    const ids = Object.keys(cohortQueues);
    let round = 0;
    let added = true;
    while (added) {
      added = false;
      for (const id of ids) {
        if (round < cohortQueues[id].length) {
          interleaved.push(cohortQueues[id][round]);
          added = true;
        }
      }
      round++;
    }

    return [...interleaved, ...completed];
  }, [joinedCohorts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedInSession, setCompletedInSession] = useState(0);
  const [showCompletionAnim, setShowCompletionAnim] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showCohortPanel, setShowCohortPanel] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  const dailyTarget = 5;
  const currentLesson = feedLessons[currentIndex] as FeedLesson | undefined;

  const goNext = useCallback(() => {
    if (currentIndex < feedLessons.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, feedLessons.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleComplete = useCallback(() => {
    if (!currentLesson || currentLesson.completed) return;
    completeLesson(currentLesson.cohortId, currentLesson.id);
    incrementStreak();
    setCompletedInSession((c) => c + 1);
    setShowCompletionAnim(true);
    setTimeout(() => {
      setShowCompletionAnim(false);
      goNext();
    }, 1200);
  }, [currentLesson, completeLesson, incrementStreak, goNext]);

  // Scroll/wheel handler for vertical navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;
      lastScrollTime.current = now;
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") goNext();
      if (e.key === "ArrowUp" || e.key === "k") goPrev();
      if (e.key === "Enter") handleComplete();
      if (e.key === "Escape") navigate({ to: "/dashboard" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, handleComplete, navigate]);

  const lessonsLeft = dailyTarget - completedInSession;

  // No cohorts joined
  if (joinedCohorts.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center px-6">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-xl font-bold mb-2">No courses yet</h1>
          <p className="text-white/50 text-sm mb-6">Join some cohorts first to start your microlearning feed!</p>
          <Link to="/" className="px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm">
            Explore Cohorts
          </Link>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-xl font-bold mb-2">All caught up!</h1>
          <p className="text-white/50 text-sm mb-6">You've gone through all your lessons.</p>
          <Link to="/dashboard" className="px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-[#0a0a0f] z-50 flex flex-col overflow-hidden select-none">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 pb-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-white" />
          </Link>
          <div className="text-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentLesson.cohortEmoji}</span>
              <span className="text-white/80 text-sm font-medium truncate max-w-[200px]">{currentLesson.cohortTitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-white text-xs font-semibold">{joinedCohorts[0]?.streak || 0}</span>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLesson.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center px-4"
        >
          <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=0&rel=0`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion Animation Overlay */}
      <AnimatePresence>
        {showCompletionAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white font-bold text-lg mt-4"
              >
                Lesson Complete! 🎉
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Side Actions */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5">
        <button
          onClick={handleComplete}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentLesson.completed ? "opacity-50" : "hover:scale-110"
          }`}
          disabled={currentLesson.completed}
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
            currentLesson.completed ? "bg-green-500/30" : "bg-white/15 hover:bg-white/25"
          }`}>
            <CheckCircle2 className={`w-5 h-5 ${currentLesson.completed ? "text-green-400" : "text-white"}`} />
          </div>
          <span className="text-[10px] text-white/70">{currentLesson.completed ? "Done" : "Complete"}</span>
        </button>

        <button
          onClick={() => setShowNotesPanel(true)}
          className="flex flex-col items-center gap-1 hover:scale-110 transition-all"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] text-white/70">Notes</span>
        </button>

        <button
          onClick={() => setShowCohortPanel(true)}
          className="flex flex-col items-center gap-1 hover:scale-110 transition-all"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] text-white/70">Cohort</span>
        </button>

        <button
          onClick={goNext}
          disabled={currentIndex >= feedLessons.length - 1}
          className="flex flex-col items-center gap-1 hover:scale-110 transition-all disabled:opacity-30"
        >
          <div className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] text-white/70">Next</span>
        </button>
      </div>

      {/* Scroll indicators */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        >
          <ChevronUp className="w-6 h-6 text-white/40" />
        </button>
      )}

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-5 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        {/* Lesson Info */}
        <div className="max-w-3xl mx-auto mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/15 text-[11px] text-white/80 font-medium">
              {currentLesson.cohortEmoji} {currentLesson.cohortTitle.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          <h2 className="text-white font-bold text-lg mb-1">{currentLesson.title}</h2>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Lesson {currentLesson.order} of {currentLesson.totalLessons}
            </span>
            <span>{currentLesson.duration}</span>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span>Course progress</span>
              <span className="font-medium text-white/70">{currentLesson.cohortProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentLesson.cohortProgress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Daily Progress Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <BarChart3 className="w-4 h-4" />
              <span>Today: <span className="font-semibold text-white">{completedInSession}</span> / {dailyTarget} lessons</span>
            </div>
            {lessonsLeft > 0 && (
              <span className="text-xs text-white/50">
                {lessonsLeft} left for today
              </span>
            )}
            {lessonsLeft <= 0 && (
              <span className="text-xs text-green-400 font-medium">
                🎯 Daily goal reached!
              </span>
            )}
          </div>
        </div>

        {/* Feed position */}
        <div className="flex justify-center mt-3 gap-1">
          {feedLessons.slice(
            Math.max(0, currentIndex - 3),
            Math.min(feedLessons.length, currentIndex + 4)
          ).map((_, i) => {
            const actualIndex = Math.max(0, currentIndex - 3) + i;
            return (
              <div
                key={actualIndex}
                className={`h-1 rounded-full transition-all ${
                  actualIndex === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Notes Slide-up Panel */}
      <AnimatePresence>
        {showNotesPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotesPanel(false)}
              className="absolute inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-[#1a1a2e] rounded-t-3xl max-h-[60vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Quick Notes
                </h3>
                <button onClick={() => setShowNotesPanel(false)} className="text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <p className="text-white/40 text-xs mb-2">{currentLesson.title}</p>
                <textarea
                  value={notes[currentLesson.id] || ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [currentLesson.id]: e.target.value }))}
                  placeholder="Jot down key takeaways, questions, or ideas..."
                  rows={8}
                  className="w-full bg-white/5 rounded-xl p-4 text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cohort Slide-up Panel */}
      <AnimatePresence>
        {showCohortPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCohortPanel(false)}
              className="absolute inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-[#1a1a2e] rounded-t-3xl max-h-[65vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" /> {currentLesson.cohortTitle}
                </h3>
                <button onClick={() => setShowCohortPanel(false)} className="text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-5 overflow-y-auto space-y-5">
                {/* Members */}
                <div>
                  <p className="text-white/40 text-xs uppercase mb-3">Members</p>
                  <div className="space-y-2.5">
                    {members.slice(0, 4).map((m) => (
                      <div key={m.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-semibold text-white">
                          {m.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{m.name}</p>
                          <p className="text-white/40 text-xs">{m.progress}% • 🔥 {m.streak}</p>
                        </div>
                        <button
                          onClick={() => toast.success(`Nudge sent to ${m.name}!`)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 text-white/70 text-xs hover:bg-white/20 transition-colors flex items-center gap-1"
                        >
                          <Bell className="w-3 h-3" /> Nudge
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <p className="text-white/40 text-xs uppercase mb-3">Activity</p>
                  <div className="space-y-2">
                    {activity.slice(0, 3).map((a) => (
                      <div key={a.id} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-semibold text-white">
                          {a.avatar}
                        </div>
                        <p className="text-white/70">
                          <span className="text-white font-medium">{a.user}</span> {a.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
