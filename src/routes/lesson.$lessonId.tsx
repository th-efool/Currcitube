import { useState, useMemo, useCallback, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, ChevronRight, ChevronLeft,
  Layers, Users, StickyNote, X, Flame,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { resolveLessonContext } from "@/features/lesson";
import { lessons as lessonRepo, cohorts as cohortRepo, members, activity } from "@/data";
import type { Lesson } from "@/domain";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: LessonPlayerPage,
  head: () => ({
    meta: [
      { title: "Lesson — Coursify" },
      { name: "description", content: "Watch your lesson and track your progress." },
    ],
  }),
});

function getSections(lessons: Lesson[]) {
  const sectionSize = Math.ceil(lessons.length / Math.ceil(lessons.length / 6));
  const sections: { title: string; lessons: typeof lessons }[] = [];
  for (let i = 0; i < lessons.length; i += sectionSize) {
    sections.push({
      title: `Module ${sections.length + 1}`,
      lessons: lessons.slice(i, i + sectionSize),
    });
  }
  return sections;
}

function LessonPlayerPage() {
  const { lessonId } = Route.useParams();
  const { joinedCohorts, completeLesson, incrementStreak } = useApp();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"structure" | "notes" | "cohort">("structure");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showCompletion, setShowCompletion] = useState(false);

  // Find the lesson across all cohorts
  let foundLesson = null as any;
  let foundCohort = null as any;
  let allLessons: Lesson[] = [];
  let cohortData = null as any;

  for (const jc of joinedCohorts) {
    const lesson = jc.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      foundLesson = lesson;
      foundCohort = jc;
      allLessons = jc.lessons;
      cohortData = jc.cohort;
      break;
    }
  }

  if (!foundLesson) {
    for (const [cId, lessons] of Object.entries(lessonRepo)) {
      const lesson = lessons.find((l) => l.id === lessonId);
      if (lesson) {
        foundLesson = lesson;
        allLessons = lessons;
        cohortData = cohortRepo.find((c) => c.id === cId) || null;
        break;
      }
    }
  }

  const sections = useMemo(() => getSections(allLessons), [allLessons]);
  const currentSection = useMemo(
    () => sections.find((s) => s.lessons.some((l) => l.id === lessonId)),
    [sections, lessonId]
  );

  const completedCount = allLessons.filter((l) => l.completed).length;
  const progressPercent = allLessons.length ? Math.round((completedCount / allLessons.length) * 100) : 0;

  const prevLesson = allLessons.find((l) => l.order === foundLesson?.order - 1);
  const nextLesson = allLessons.find((l) => l.order === foundLesson?.order + 1);

  const handleComplete = useCallback(() => {
    if (foundCohort && foundLesson && !foundLesson.completed) {
      completeLesson(foundCohort.cohort.id, foundLesson.id);
      incrementStreak();
      setShowCompletion(true);
    }
  }, [foundCohort, foundLesson, completeLesson, incrementStreak]);

  const handleNav = useCallback(
    (lesson: typeof foundLesson) => {
      if (lesson) {
        navigate({ to: "/lesson/$lessonId", params: { lessonId: lesson.id } });
        setShowCompletion(false);
      }
    },
    [navigate]
  );

  // Auto-dismiss completion toast
  useEffect(() => {
    if (showCompletion) {
      const t = setTimeout(() => setShowCompletion(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showCompletion]);

  // Close drawer on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!foundLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Lesson not found</p>
          <Link to="/" className="text-primary text-sm mt-2 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const cohortId = cohortData?.id || "1";
  const cohortTitle = cohortData?.title || "Course";

  return (
    <div className="h-screen bg-black overflow-hidden relative flex flex-col">
      {/* ── Slim Top Bar ── */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-black/60 backdrop-blur-md">
        <Link
          to="/cohort/$cohortId"
          params={{ cohortId }}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline truncate max-w-[200px]">{cohortTitle}</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] text-white/40 font-medium tracking-wide">
          <span className="hidden md:inline">{currentSection?.title}</span>
          <ChevronRight className="w-3 h-3 hidden md:block" />
          <span className="text-white/70">
            {foundLesson.order} / {allLessons.length}
          </span>
        </div>

        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* ── Video Canvas (fills remaining space) ── */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            key={lessonId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative w-full h-full max-w-[1200px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${foundLesson.videoId}?rel=0`}
              title={foundLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            {/* Bottom gradient for depth */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* ── Floating Completion Toast ── */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-500/90 backdrop-blur-md shadow-lg shadow-emerald-500/30">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-sm font-semibold text-white">Lesson Complete!</span>
                {nextLesson && (
                  <button
                    onClick={() => handleNav(nextLesson)}
                    className="ml-2 text-xs font-medium text-white/80 hover:text-white flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating Bottom HUD ── */}
      <div className="relative z-30 px-3 sm:px-6 pb-3 sm:pb-5">
        <div className="max-w-[1000px] mx-auto">
          {/* Thin progress bar above HUD */}
          <div className="h-[3px] rounded-full bg-white/10 mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.06]">
            {/* LEFT: Lesson info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{foundLesson.title}</p>
              <p className="text-[11px] text-white/40 mt-0.5">
                Lesson {foundLesson.order} of {allLessons.length} · {foundLesson.duration}
              </p>
            </div>

            {/* CENTER: Nav buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNav(prevLesson)}
                disabled={!prevLesson}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNav(nextLesson)}
                disabled={!nextLesson}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setDrawerTab("notes"); setDrawerOpen(true); }}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                title="Notes"
              >
                <StickyNote className="w-4 h-4" />
              </button>

              <button
                onClick={handleComplete}
                disabled={foundLesson.completed}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                  foundLesson.completed
                    ? "bg-emerald-500/15 text-emerald-400 cursor-default"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">{foundLesson.completed ? "Done" : "Complete"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right-Side Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[320px] sm:w-[360px] lg:w-[400px] z-50 bg-card/95 backdrop-blur-2xl border-l border-white/[0.06] shadow-2xl shadow-black/50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
                  {(["structure", "notes", "cohort"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDrawerTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        drawerTab === tab
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "structure" ? "Lessons" : tab === "cohort" ? "Cohort" : "Notes"}
                    </button>
                  ))}
                </div>
                <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto">
                {drawerTab === "structure" && (
                  <DrawerStructure
                    sections={sections}
                    currentLessonId={lessonId}
                    onSelect={(id) => {
                      navigate({ to: "/lesson/$lessonId", params: { lessonId: id } });
                    }}
                  />
                )}
                {drawerTab === "notes" && (
                  <DrawerNotes
                    lessonId={lessonId}
                    lessonTitle={foundLesson.title}
                    notes={notes}
                    onSave={(text) => setNotes((prev) => ({ ...prev, [lessonId]: text }))}
                  />
                )}
                {drawerTab === "cohort" && (
                  <DrawerCohort cohortId={cohortId} cohortTitle={cohortTitle} />
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating drawer trigger (when closed, desktop only) */}
      {!drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.06] hover:bg-white/[0.15] transition-all hidden lg:block"
          title="Open Panel"
        >
          <Layers className="w-4 h-4 text-white/50" />
        </button>
      )}
    </div>
  );
}

/* ─── Drawer: Course Structure ─── */
function DrawerStructure({
  sections,
  currentLessonId,
  onSelect,
}: {
  sections: { title: string; lessons: Lesson[] }[];
  currentLessonId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="p-4 space-y-4">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{section.title}</h4>
          <div className="space-y-0.5">
            {section.lessons.map((lesson) => {
              const isCurrent = lesson.id === currentLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelect(lesson.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-sm ${
                    isCurrent
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    lesson.completed ? "bg-emerald-500/15 text-emerald-500" : isCurrent ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {lesson.completed ? <Check className="w-3 h-3" /> : lesson.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[13px]">{lesson.title}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{lesson.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Drawer: Notes ─── */
function DrawerNotes({
  lessonId,
  lessonTitle,
  notes,
  onSave,
}: {
  lessonId: string;
  lessonTitle: string;
  notes: Record<string, string>;
  onSave: (text: string) => void;
}) {
  return (
    <div className="p-4 space-y-3">
      <div>
        <h4 className="text-sm font-semibold">Notes</h4>
        <p className="text-[11px] text-muted-foreground truncate">{lessonTitle}</p>
      </div>
      <textarea
        className="w-full h-64 bg-background rounded-xl border border-border p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
        placeholder={"Write your notes here…\n\n• Key takeaways\n• Questions\n• Ideas"}
        value={notes[lessonId] || ""}
        onChange={(e) => onSave(e.target.value)}
      />
      <p className="text-[10px] text-muted-foreground">Auto-saved per lesson</p>
    </div>
  );
}

/* ─── Drawer: Cohort Info ─── */
function DrawerCohort({ cohortId, cohortTitle }: { cohortId: string; cohortTitle: string }) {
  return (
    <div className="p-4 space-y-5">
      <div>
        <h4 className="text-sm font-semibold">{cohortTitle}</h4>
        <p className="text-[11px] text-muted-foreground">Cohort activity & members</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-background rounded-xl border border-border p-3 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-base font-bold">{members.length}</p>
          <p className="text-[10px] text-muted-foreground">Members</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-3 text-center">
          <Flame className="w-4 h-4 mx-auto mb-1 text-orange-500" />
          <p className="text-base font-bold">{Math.round(members.reduce((s, m) => s + m.streak, 0) / members.length)}</p>
          <p className="text-[10px] text-muted-foreground">Avg Streak</p>
        </div>
      </div>

      <div>
        <h5 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Members</h5>
        <div className="space-y-1.5">
          {members.slice(0, 4).map((m) => (
            <div key={m.name} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{m.avatar}</div>
              <span className="text-sm flex-1">{m.name}</span>
              <span className="text-[11px] text-muted-foreground">{m.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Activity</h5>
        <div className="space-y-1.5">
          {activity.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-start gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0">{a.avatar}</div>
              <p className="text-muted-foreground"><span className="text-foreground font-medium">{a.user}</span> {a.action}</p>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/cohort/$cohortId"
        params={{ cohortId }}
        className="block w-full text-center px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
      >
        Go to Cohort Page
      </Link>
    </div>
  );
}
