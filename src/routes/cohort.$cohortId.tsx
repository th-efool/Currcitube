import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Users, Flame, BarChart3, BookOpen, Clock,
  FileText, MessageCircle, Crown, ChevronRight,
  CheckCircle2, Circle, Send, Heart, MessageSquare,
  Bell, Trophy,
} from "lucide-react";
import { Header } from "@/components/Header";
import { useApp } from "@/lib/store";
import { JoinCohortModal } from "@/features/explore/_components/JoinCohortModal";
import type { Cohort } from "@/domain";
import { getCohortById, getLessonsByCohortId, members, activity } from "@/data";
import { toast } from "sonner";

export const Route = createFileRoute("/cohort/$cohortId")({
  component: CohortPage,
  head: () => ({
    meta: [
      { title: "Cohort — Coursify" },
      { name: "description", content: "Your cohort learning hub." },
    ],
  }),
});

type TabId = "overview" | "lessons" | "notes" | "community" | "members" | "leaderboard";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "lessons", label: "Lessons", icon: <BookOpen className="w-4 h-4" /> },
  { id: "notes", label: "Notes", icon: <FileText className="w-4 h-4" /> },
  { id: "community", label: "Community", icon: <MessageCircle className="w-4 h-4" /> },
  { id: "members", label: "Members", icon: <Users className="w-4 h-4" /> },
  { id: "leaderboard", label: "Leaderboard", icon: <Crown className="w-4 h-4" /> },
];

function CohortPage() {
  const { cohortId } = Route.useParams();
  const cohort = getCohortById(cohortId);
  const { isJoined, joinCohort, getProgress, getJoinedCohort, completeLesson, streak } = useApp();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showJoinModal, setShowJoinModal] = useState(false);

  if (!cohort) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-neutral-900 mb-2">Cohort not found</h1>
          <Link to="/explore" className="text-neutral-500 hover:text-neutral-900 text-sm transition-colors">Go back</Link>
        </div>
      </div>
    );
  }

  const joined = isJoined(cohortId);
  const progress = getProgress(cohortId);
  const joinedCohort = getJoinedCohort(cohortId);
  const lessons = joinedCohort?.lessons || getLessonsByCohortId(cohortId);
  const nextLesson = lessons.find((l) => !l.completed);

  const handleJoin = (c: Cohort, mins: number) => {
    joinCohort(c, mins);
    setShowJoinModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* Cover Banner */}
      <div className="relative h-48 sm:h-56 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">
          {cohort.thumbnailEmoji}
        </div>
      </div>

      {/* Cohort Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-panel rounded-[2rem] p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              {cohort.thumbnailEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-1">{cohort.title}</h1>
              <p className="text-sm text-neutral-500 font-light mb-4">{cohort.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <Users className="w-4 h-4" />
                  <span className="font-medium text-neutral-900">{cohort.members}</span> members
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Avg streak <span className="font-medium text-neutral-900">4.2</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <BarChart3 className="w-4 h-4" />
                  Avg progress <span className="font-medium text-neutral-900">{cohort.avgProgress}%</span>
                </span>
              </div>
            </div>
            <div className="shrink-0">
              {joined ? (
                <Link
                  to="/lesson/$lessonId"
                  params={{ lessonId: nextLesson?.id || lessons[0]?.id || "1-1" }}
                  className="h-10 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4" /> Resume Learning
                </Link>
              ) : (
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="h-10 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Users className="w-4 h-4" /> Join Cohort
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-6 border-b border-neutral-200 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-6 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewTab cohort={cohort} lessons={lessons} progress={progress} nextLesson={nextLesson} joined={joined} />}
              {activeTab === "lessons" && <LessonsTab cohortId={cohortId} lessons={lessons} joined={joined} onComplete={completeLesson} />}
              {activeTab === "notes" && <NotesTab lessons={lessons} />}
              {activeTab === "community" && <CommunityTab />}
              {activeTab === "members" && <MembersTab />}
              {activeTab === "leaderboard" && <LeaderboardTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <JoinCohortModal
        cohort={showJoinModal ? cohort : null}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoin}
      />
    </div>
  );
}

/* ─── OVERVIEW TAB ─── */
function OverviewTab({ cohort, lessons, progress, nextLesson, joined }: {
  cohort: Cohort;
  lessons: { id: string; title: string; duration: string; completed: boolean; order: number }[];
  progress: number;
  nextLesson: typeof lessons[0] | undefined;
  joined: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {nextLesson && joined && (
          <div className="surface-panel rounded-[1.5rem] p-5">
            <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Today's Lesson</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center shadow-sm">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-900">{nextLesson.title}</h4>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{nextLesson.duration}</span>
                  <span className="text-neutral-300">•</span>
                  <span>Lesson {nextLesson.order}/{lessons.length}</span>
                </div>
              </div>
              <Link
                to="/lesson/$lessonId"
                params={{ lessonId: nextLesson.id }}
                className="h-9 px-5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" /> Start
              </Link>
            </div>
          </div>
        )}

        <div className="surface-panel rounded-[1.5rem] p-5">
          <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-neutral-900 font-medium">Your progress</span>
                <span className="font-medium text-neutral-900">{progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-neutral-900" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-neutral-500">Cohort average</span>
                <span className="font-medium text-neutral-500">{cohort.avgProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full rounded-full bg-neutral-300" style={{ width: `${cohort.avgProgress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel rounded-[1.5rem] p-5">
          <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm"><span className="font-medium text-neutral-900">{item.user}</span>{" "}<span className="text-neutral-500">{item.action}</span></p>
                  <p className="text-xs text-neutral-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="surface-panel rounded-[1.5rem] p-5">
          <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Top Learners</h3>
          <div className="space-y-3">
            {members.sort((a, b) => b.progress - a.progress).slice(0, 3).map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-lg">{["🥇", "🥈", "🥉"][i]}</span>
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">{m.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{m.name}</p>
                  <p className="text-xs text-neutral-500">{m.progress}%</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-neutral-600">{m.streak}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel rounded-[1.5rem] p-5">
          <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: lessons.length, label: "Lessons" },
              { val: cohort.totalDuration, label: "Total" },
              { val: cohort.members, label: "Members" },
              { val: `${cohort.estimatedDays}d`, label: "Est. time" },
            ].map((s) => (
              <div key={s.label} className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center shadow-sm">
                <p className="text-lg font-medium text-neutral-900">{s.val}</p>
                <p className="text-[10px] text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LESSONS TAB ─── */
function LessonsTab({ cohortId, lessons, joined, onComplete }: {
  cohortId: string;
  lessons: { id: string; title: string; duration: string; completed: boolean; order: number }[];
  joined: boolean;
  onComplete: (cohortId: string, lessonId: string) => void;
}) {
  const sections: { title: string; lessons: typeof lessons }[] = [];
  for (let i = 0; i < lessons.length; i += 5) {
    sections.push({ title: `Section ${Math.floor(i / 5) + 1}`, lessons: lessons.slice(i, i + 5) });
  }

  return (
    <div className="max-w-3xl space-y-6">
      {sections.map((section, si) => (
        <div key={si} className="surface-panel rounded-[1.5rem] overflow-hidden">
          <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-900">{section.title}</h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {section.lessons.map((lesson) => (
              <div key={lesson.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-neutral-50 transition-colors">
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-neutral-300 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${lesson.completed ? "text-neutral-400 line-through" : "text-neutral-900"}`}>{lesson.title}</p>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {lesson.duration}
                  </p>
                </div>
                {joined && (
                  <Link
                    to="/lesson/$lessonId"
                    params={{ lessonId: lesson.id }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Play className="w-3 h-3" />
                    {lesson.completed ? "Review" : "Start"}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── NOTES TAB ─── */
function NotesTab({ lessons }: { lessons: { id: string; title: string; order: number }[] }) {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]?.id || "");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const currentNote = notes[selectedLesson] || "";

  return (
    <div className="flex gap-6 min-h-[500px]">
      <div className="w-64 shrink-0 surface-panel rounded-[1.5rem] overflow-hidden hidden md:block">
        <div className="px-4 py-3 border-b border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-900">Lessons</h3>
        </div>
        <div className="divide-y divide-neutral-100 max-h-[460px] overflow-y-auto">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLesson(l.id)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                selectedLesson === l.id ? "bg-neutral-100 text-neutral-900 font-medium" : "text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              <span className="block truncate">{l.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 surface-panel rounded-[1.5rem] overflow-hidden flex flex-col">
        <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-neutral-900 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {lessons.find((l) => l.id === selectedLesson)?.title || "Notes"}
          </h3>
          <span className="text-xs text-neutral-400">Auto-saved</span>
        </div>
        <div className="md:hidden px-5 pt-3">
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 p-5">
          <textarea
            value={currentNote}
            onChange={(e) => setNotes((prev) => ({ ...prev, [selectedLesson]: e.target.value }))}
            placeholder={`# ${lessons.find((l) => l.id === selectedLesson)?.title || "Notes"}\n\nStart writing your notes here...\n\n- Key takeaways\n- Questions\n- Action items`}
            className="w-full h-full min-h-[380px] bg-transparent resize-none text-sm leading-relaxed placeholder:text-neutral-300 focus:outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── COMMUNITY TAB ─── */
const mockPosts = [
  { id: "p1", user: "Aman S.", avatar: "A", message: "Struggled with Lesson 2 but finally got it 😭 The verb conjugations are tricky!", time: "15 min ago", likes: 4, comments: 2 },
  { id: "p2", user: "Riya K.", avatar: "R", message: "Finally completed Day 5! 🎉 This cohort is keeping me accountable.", time: "1 hour ago", likes: 12, comments: 5 },
  { id: "p3", user: "Alex J.", avatar: "A", message: "Anyone have tips for memorizing vocabulary faster? I keep forgetting by the next day.", time: "3 hours ago", likes: 7, comments: 8 },
  { id: "p4", user: "Sarah L.", avatar: "S", message: "Just joined! Excited to learn with everyone here 🙌", time: "5 hours ago", likes: 15, comments: 3 },
  { id: "p5", user: "David C.", avatar: "D", message: "Pro tip: Watch each lesson twice. Once for understanding, once for note-taking. Game changer!", time: "1 day ago", likes: 23, comments: 6 },
];

function CommunityTab() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts((prev) => [
      { id: `p-${Date.now()}`, user: "You", avatar: "Y", message: newPost, time: "Just now", likes: 0, comments: 0 },
      ...prev,
    ]);
    setNewPost("");
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, likes: likedPosts.has(id) ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="surface-panel rounded-[1.5rem] p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-medium text-white shrink-0">Y</div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something with your cohort…"
              rows={3}
              className="w-full bg-transparent resize-none text-sm placeholder:text-neutral-400 focus:outline-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="h-8 px-4 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="surface-panel rounded-[1.5rem] p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600 shrink-0">
              {post.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-neutral-900">{post.user}</span>
                <span className="text-xs text-neutral-400">{post.time}</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">{post.message}</p>
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    likedPosts.has(post.id) ? "text-red-500" : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {post.comments}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── MEMBERS TAB ─── */
function MembersTab() {
  const handleNudge = (name: string) => {
    toast.success(`Reminder sent to ${name}!`, { description: "They'll get a nudge to continue learning." });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-neutral-500">
          <span className="font-medium text-neutral-900">3 people</span> active today
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ name: "You", avatar: "Y", streak: 3, progress: 12, isYou: true }, ...members].map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`surface-panel rounded-[1.5rem] p-4 flex items-center gap-3 ${
              "isYou" in member && member.isYou ? "ring-1 ring-neutral-900/10 bg-neutral-50" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600 shrink-0">
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {member.name}
                {"isYou" in member && member.isYou && <span className="text-xs text-neutral-500 ml-1">(you)</span>}
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>{member.progress}%</span>
                <span className="flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500" /> {member.streak}
                </span>
              </div>
            </div>
            {!("isYou" in member && member.isYou) && (
              <button
                onClick={() => handleNudge(member.name)}
                className="px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center gap-1 shadow-sm"
              >
                <Bell className="w-3 h-3" /> Nudge
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── LEADERBOARD TAB ─── */
function LeaderboardTab() {
  const allMembers = [
    { name: "You", avatar: "Y", streak: 3, progress: 12, isYou: true },
    ...members,
  ].sort((a, b) => b.progress - a.progress || b.streak - a.streak);

  return (
    <div className="max-w-2xl">
      <div className="flex justify-center items-end gap-4 mb-8">
        {[1, 0, 2].map((rank) => {
          const m = allMembers[rank];
          if (!m) return null;
          const isFirst = rank === 0;
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rank * 0.15 }}
              className={`flex flex-col items-center ${isFirst ? "order-2" : rank === 1 ? "order-1" : "order-3"}`}
            >
              <span className="text-2xl mb-2">{["🥇", "🥈", "🥉"][rank]}</span>
              <div className={`rounded-full bg-neutral-200 flex items-center justify-center font-medium text-neutral-600 border-4 border-white ${
                isFirst ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm"
              }`}>
                {m.avatar}
              </div>
              <p className="text-sm font-medium text-neutral-900 mt-2">{m.name}</p>
              <p className="text-xs text-neutral-500">{m.progress}%</p>
              <div className="flex items-center gap-0.5 text-xs mt-0.5">
                <Flame className="w-3 h-3 text-orange-500" /> {m.streak}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="surface-panel rounded-[1.5rem] overflow-hidden">
        <div className="divide-y divide-neutral-100">
          {allMembers.map((m, i) => (
            <div
              key={m.name}
              className={`px-5 py-3.5 flex items-center gap-3 ${
                "isYou" in m && m.isYou ? "bg-neutral-50" : ""
              }`}
            >
              <span className="w-6 text-center text-sm font-medium text-neutral-400">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
                {m.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {m.name}
                  {"isYou" in m && m.isYou && <span className="text-xs text-neutral-500 ml-1">(you)</span>}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-neutral-900">{m.progress}%</span>
                <span className="flex items-center gap-0.5 text-xs text-neutral-500">
                  <Flame className="w-3 h-3 text-orange-500" /> {m.streak}
                </span>
              </div>
              {i < 3 && <Trophy className={`w-4 h-4 ${i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : "text-amber-600"}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
