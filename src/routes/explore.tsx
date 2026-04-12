import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Cohort } from "@/domain";
import { Header } from "@/components/Header";
import { CohortCard } from "@/features/explore/_components/CohortCard";
import { JoinCohortModal } from "@/features/explore/_components/JoinCohortModal";
import { useApp } from "@/lib/store";
import { searchCohorts } from "@/data";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
  head: () => ({
    meta: [
      { title: "Explore Cohorts — Coursify" },
      { name: "description", content: "Browse and join active learning cohorts across hundreds of topics." },
    ],
  }),
});

function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const { joinCohort, isJoined } = useApp();

  const filtered = searchCohorts(search);

  const handleJoin = (cohort: Cohort, dailyMinutes: number) => {
    joinCohort(cohort, dailyMinutes);
    setSelectedCohort(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-2">
            Explore Cohorts
          </h1>
          <p className="text-neutral-500 font-light">
            Join others and actually finish what you start
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8 max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search courses (e.g. German, React, AI)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-neutral-200 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-shadow shadow-sm"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cohort, i) => (
            <CohortCard
              key={cohort.id}
              cohort={cohort}
              index={i}
              onJoin={setSelectedCohort}
              isJoined={isJoined(cohort.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-500">
            <p className="text-lg font-medium text-neutral-900">No cohorts found</p>
            <p className="text-sm mt-1 font-light">Try a different search or create your own!</p>
          </div>
        )}
      </main>

      <Link
        to="/create"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-lg hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all"
      >
        <Plus className="w-6 h-6" />
      </Link>

      <JoinCohortModal
        cohort={selectedCohort}
        onClose={() => setSelectedCohort(null)}
        onJoin={handleJoin}
      />
    </div>
  );
}
