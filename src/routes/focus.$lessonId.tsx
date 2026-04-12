import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { lessons as lessonRepo } from "@/data";
import type { Lesson } from "@/domain";

export const Route = createFileRoute("/focus/$lessonId")({
  component: FocusModePage,
  head: () => ({
    meta: [{ title: "Focus Mode — Coursify" }],
  }),
});

function FocusModePage() {
  const { lessonId } = Route.useParams();
  const { joinedCohorts, completeLesson, incrementStreak } = useApp();
  const navigate = useNavigate();

  let foundLesson = null;
  let foundCohort = null;
  let allLessons: Lesson[] = [];

  for (const jc of joinedCohorts) {
    const lesson = jc.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      foundLesson = lesson;
      foundCohort = jc;
      allLessons = jc.lessons;
      break;
    }
  }

  if (!foundLesson) {
    for (const [, lessons] of Object.entries(lessonRepo)) {
      const lesson = lessons.find((l) => l.id === lessonId);
      if (lesson) {
        foundLesson = lesson;
        allLessons = lessons;
        break;
      }
    }
  }

  if (!foundLesson) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-foreground flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <p>Lesson not found</p>
          <Link to="/" className="text-primary text-sm mt-2 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const nextLesson = allLessons.find((l) => l.order === foundLesson!.order + 1);
  const progress = (foundLesson.order / allLessons.length) * 100;

  const handleComplete = () => {
    if (foundCohort) {
      completeLesson(foundCohort.cohort.id, foundLesson!.id);
      incrementStreak();
    }
  };

  const handleNext = () => {
    if (nextLesson) {
      navigate({ to: "/focus/$lessonId", params: { lessonId: nextLesson.id } });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-foreground">
      {/* VIDEO LAYER — full bleed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${foundLesson.videoId}?autoplay=1`}
          title={foundLesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </motion.div>

      {/* OVERLAY LAYER — pointer-events-none container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* TOP BAR */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-foreground/80 to-transparent">
          <Link
            to="/lesson/$lessonId"
            params={{ lessonId }}
            className="pointer-events-auto p-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-primary-foreground" />
          </Link>

          <div className="text-center">
            <p className="text-[11px] text-primary-foreground/50 tracking-wide uppercase">
              {foundLesson.order} / {allLessons.length}
            </p>
            <p className="text-xs font-medium text-primary-foreground/80 max-w-[200px] truncate">
              {foundLesson.title}
            </p>
          </div>

          <Link
            to="/dashboard"
            className="pointer-events-auto p-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </Link>
        </div>

        {/* RIGHT-SIDE ACTION STACK */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-3">
          <button
            onClick={handleComplete}
            className="pointer-events-auto w-11 h-11 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 active:scale-95 transition-all"
            title="Mark complete"
          >
            <Check className="w-5 h-5 text-primary-foreground" />
          </button>
          {nextLesson && (
            <button
              onClick={handleNext}
              className="pointer-events-auto w-11 h-11 rounded-full gradient-primary backdrop-blur-md flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
              title="Next lesson"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>
          )}
        </div>

        {/* BOTTOM PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-foreground/10">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
