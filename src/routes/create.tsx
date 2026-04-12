import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, Clock, ToggleLeft, ToggleRight, Sparkles, Check, Share2, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useApp } from "@/lib/store";
import { cohorts } from "@/data";

export const Route = createFileRoute("/create")({
  component: CreateCoursePage,
  head: () => ({
    meta: [
      { title: "Create Course — Coursify" },
      { name: "description", content: "Turn any YouTube video or playlist into a structured microlearning course." },
    ],
  }),
});

const processingSteps = [
  { text: "Fetching video…", icon: "📡" },
  { text: "Analyzing transcript…", icon: "📝" },
  { text: "Splitting into lessons…", icon: "✂️" },
  { text: "Creating cohort…", icon: "👥" },
];

function CreateCoursePage() {
  const [step, setStep] = useState<"input" | "processing" | "done">("input");
  const [url, setUrl] = useState("");
  const [dailyTime, setDailyTime] = useState(20);
  const [quizEnabled, setQuizEnabled] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const { joinCohort } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (step !== "processing") return;
    if (processingStep >= processingSteps.length) {
      setTimeout(() => setStep("done"), 500);
      return;
    }
    const timer = setTimeout(() => setProcessingStep((s) => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [step, processingStep]);

  const handleGenerate = () => {
    if (!url.trim()) return;
    setStep("processing");
    setProcessingStep(0);
  };

  const createdCohort = cohorts[0];

  const handleStart = () => {
    joinCohort(createdCohort, dailyTime);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-2">
                Create a Course
              </h1>
              <p className="text-neutral-500 font-light mb-8">Turn any YouTube content into a structured microlearning experience</p>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-neutral-900 mb-2 block">YouTube URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Paste YouTube video or playlist link"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-shadow shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-900 mb-2 block">Daily commitment</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[10, 20, 30].map((val) => (
                      <button
                        key={val}
                        onClick={() => setDailyTime(val)}
                        className={`rounded-xl p-3 text-center border transition-all ${
                          dailyTime === val ? "border-neutral-900 bg-neutral-50 shadow-sm" : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1 text-neutral-500" />
                        <div className="text-sm font-medium text-neutral-900">{val} min</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
                  <div>
                    <div className="text-sm font-medium text-neutral-900">Generate Quiz</div>
                    <div className="text-xs text-neutral-500">Add MCQs after each lesson</div>
                  </div>
                  <button onClick={() => setQuizEnabled(!quizEnabled)}>
                    {quizEnabled ? (
                      <ToggleRight className="w-8 h-8 text-neutral-900" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-neutral-400" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!url.trim()}
                  className="w-full h-11 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Course
                </button>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-8 animate-pulse-soft shadow-sm">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-4 max-w-xs mx-auto">
                {processingSteps.map((ps, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: i <= processingStep ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg">{ps.icon}</span>
                    <span className={`text-sm ${i < processingStep ? "text-green-600 font-medium" : i === processingStep ? "text-neutral-900 font-medium" : "text-neutral-400"}`}>
                      {ps.text}
                    </span>
                    {i < processingStep && <Check className="w-4 h-4 text-green-600 ml-auto" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-medium text-neutral-900 mb-2">Course Created! 🎉</h2>
              <p className="text-neutral-500 font-light mb-8">Your cohort is ready to go</p>

              <div className="surface-panel rounded-[2rem] p-6 text-left mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                    {createdCohort.thumbnailEmoji}
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">{createdCohort.title}</h3>
                    <span className="text-xs text-neutral-500">{createdCohort.category}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2 shadow-sm">
                    <div className="text-sm font-medium text-neutral-900">{createdCohort.totalLessons}</div>
                    <div className="text-[10px] text-neutral-400">Lessons</div>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2 shadow-sm">
                    <div className="text-sm font-medium text-neutral-900">{createdCohort.totalDuration}</div>
                    <div className="text-[10px] text-neutral-400">Duration</div>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2 shadow-sm">
                    <div className="text-sm font-medium text-neutral-900">{createdCohort.estimatedDays}d</div>
                    <div className="text-[10px] text-neutral-400">Est. Days</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleStart} className="flex-1 h-11 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Play className="w-4 h-4" />
                  Start Learning
                </button>
                <button className="px-6 h-11 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center gap-2 shadow-sm">
                  <Share2 className="w-4 h-4" />
                  Invite Friends
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
