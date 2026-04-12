import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { StreakWidget } from "@/features/dashboard/_components/StreakWidget";
import { ActivityFeed } from "@/features/dashboard/_components/ActivityFeed";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — Coursify" },
      { name: "description", content: "Track your learning progress and daily goals." },
    ],
  }),
});

function DashboardPage() {
  const { joinedCohorts, getProgress, streak } = useApp();

  const currentCohort = joinedCohorts[0];
  const currentLesson = currentCohort?.lessons.find((l) => !l.completed);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-1">
            Good morning! 👋
          </h1>
          <p className="text-neutral-500 font-light mb-8">Here's what's on your plate today</p>
        </motion.div>

        {joinedCohorts.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">📚</div>
            <h2 className="text-lg font-medium text-neutral-900 mb-2">No cohorts yet</h2>
            <p className="text-neutral-500 text-sm font-light mb-6">Join a cohort or create your own to get started!</p>
            <Link to="/explore" className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm">
              Explore Cohorts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {currentLesson && currentCohort && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="surface-panel rounded-[2rem] p-6">
                  <h2 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Today's Learning</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                      {currentCohort.cohort.thumbnailEmoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-900">{currentLesson.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{currentLesson.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />Lesson {currentLesson.order}/{currentCohort.lessons.length}</span>
                      </div>
                    </div>
                    <Link
                      to="/lesson/$lessonId"
                      params={{ lessonId: currentLesson.id }}
                      className="h-10 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                    >
                      <Play className="w-4 h-4" />
                      Start Lesson
                    </Link>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-neutral-500">{currentCohort.cohort.title}</span>
                      <span className="font-medium text-neutral-900">{getProgress(currentCohort.cohort.id)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full bg-neutral-900 transition-all" style={{ width: `${getProgress(currentCohort.cohort.id)}%` }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <h2 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Your Cohorts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {joinedCohorts.map((jc, i) => (
                    <motion.div
                      key={jc.cohort.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="surface-panel rounded-[1.5rem] p-5 card-hover"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-xl shadow-sm">
                          {jc.cohort.thumbnailEmoji}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900">{jc.cohort.title}</h3>
                          <span className="text-xs text-neutral-500">{jc.dailyMinutes} min/day</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-neutral-500">Progress</span>
                          <span className="font-medium text-neutral-900">{getProgress(jc.cohort.id)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full rounded-full bg-neutral-900 transition-all" style={{ width: `${getProgress(jc.cohort.id)}%` }} />
                        </div>
                      </div>
                      <Link
                        to="/lesson/$lessonId"
                        params={{ lessonId: (jc.lessons.find((l) => !l.completed) || jc.lessons[0]).id }}
                        className="w-full h-9 rounded-full border border-neutral-200 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Resume
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <StreakWidget streak={streak} />
              <ActivityFeed />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
