import { motion } from "framer-motion";
import { Play, ArrowRight, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Cohort } from "@/domain";
import { formatViews } from "@/data";

interface CohortCardProps {
  cohort: Cohort;
  index: number;
  onJoin: (cohort: Cohort) => void;
  isJoined: boolean;
}

export function CohortCard({ cohort, index, onJoin, isJoined }: CohortCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="surface-panel p-2 rounded-[2rem] surface-panel-hover cursor-pointer group relative flex flex-col h-full"
    >
      {/* Card visual header */}
      <div className="h-36 rounded-t-[1.5rem] rounded-b-xl bg-neutral-50 border border-neutral-100 mb-4 p-5 flex flex-col justify-between relative overflow-hidden">
        <span className="text-3xl group-hover:scale-105 transition-transform duration-500">
          {cohort.thumbnailEmoji}
        </span>
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-medium text-neutral-500">
          <span className="px-2 py-1 bg-white rounded-md border border-neutral-200 shadow-sm">
            {cohort.category}
          </span>
          {cohort.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-white rounded-md border border-neutral-200 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col">
        <h3 className="text-lg font-medium text-neutral-900 mb-1 tracking-tight">
          {cohort.title}
        </h3>
        <p className="text-sm text-neutral-500 font-light mb-4 line-clamp-2">
          {cohort.description}
        </p>

        {/* Views */}
        <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium mb-4">
          <Eye className="w-3 h-3" />
          {formatViews(cohort.views)}
        </div>

        <div className="mt-auto">
          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-neutral-500 font-medium mb-1.5">
              <span>Avg progress</span>
              <span>{cohort.avgProgress}%</span>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cohort.avgProgress}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
                className="absolute left-0 top-0 h-full bg-neutral-900 rounded-full"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-neutral-200 border border-white" />
                <div className="w-6 h-6 rounded-full bg-neutral-300 border border-white" />
              </div>
              <span className="text-[10px] text-neutral-500 font-medium">
                {cohort.members >= 1000 ? `${(cohort.members / 1000).toFixed(1)}k` : cohort.members} learners
              </span>
            </div>

            {isJoined ? (
              <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                ✓ Joined
              </span>
            ) : (
              <span className="text-xs font-medium text-neutral-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                View Path <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Full-card link */}
      <Link
        to="/cohort/$cohortId"
        params={{ cohortId: cohort.id }}
        className="absolute inset-0 z-10 rounded-[2rem]"
        aria-label={`View ${cohort.title}`}
      />

      {/* Join button overlay */}
      {!isJoined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onJoin(cohort);
          }}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-medium shadow-sm hover:bg-neutral-800 transition-colors"
        >
          <Play className="w-3 h-3" /> Join
        </button>
      )}
    </motion.div>
  );
}
