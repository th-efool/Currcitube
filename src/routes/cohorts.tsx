import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Flame, Users, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { useApp } from "@/lib/store";
import { members } from "@/data";

export const Route = createFileRoute("/cohorts")({
  component: MyCohortsPage,
  head: () => ({
    meta: [
      { title: "My Cohorts — Coursify" },
      { name: "description", content: "View and manage your learning cohorts." },
    ],
  }),
});

function MyCohortsPage() {
  const { joinedCohorts, getProgress, streak } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-2">
            My Cohorts
          </h1>
          <p className="text-neutral-500 font-light mb-8">Your active learning journeys</p>
        </motion.div>

        {joinedCohorts.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">🎓</div>
            <h2 className="text-lg font-medium text-neutral-900 mb-2">No cohorts yet</h2>
            <p className="text-neutral-500 text-sm font-light mb-6">Find a cohort that excites you!</p>
            <Link to="/explore" className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm">
              Explore Cohorts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {joinedCohorts.map((jc, i) => {
              const progress = getProgress(jc.cohort.id);

              return (
                <motion.div
                  key={jc.cohort.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="surface-panel rounded-[2rem] overflow-hidden card-hover"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                          {jc.cohort.thumbnailEmoji}
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900">{jc.cohort.title}</h3>
                          <span className="text-xs text-neutral-500">{jc.dailyMinutes} min/day</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-neutral-900">{streak}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-neutral-500">Progress</span>
                        <span className="font-medium text-neutral-900">{progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="h-full rounded-full bg-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {members.slice(0, 3).map((m, mi) => (
                            <div key={mi} className="w-7 h-7 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-neutral-600">
                              {m.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          3 active today
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/lesson/$lessonId"
                      params={{ lessonId: (jc.lessons.find((l) => !l.completed) || jc.lessons[0]).id }}
                      className="w-full h-11 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="w-4 h-4" />
                      Resume
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
