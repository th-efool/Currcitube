import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, BookOpen, Users } from "lucide-react";
import type { Cohort } from "@/domain";
import { members } from "@/data";
import { TIME_OPTIONS } from "@/constants/app.constants";

interface JoinCohortModalProps {
  cohort: Cohort | null;
  onClose: () => void;
  onJoin: (cohort: Cohort, dailyMinutes: number) => void;
}

export function JoinCohortModal({ cohort, onClose, onJoin }: JoinCohortModalProps) {
  const [selectedTime, setSelectedTime] = useState(20);

  if (!cohort) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] max-w-lg w-full p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] max-h-[90vh] overflow-y-auto border border-neutral-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-2xl">
                {cohort.thumbnailEmoji}
              </div>
              <div>
                <h2 className="text-lg font-medium text-neutral-900">{cohort.title}</h2>
                <span className="text-xs text-neutral-500">{cohort.category}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          </div>

          <p className="text-sm text-neutral-500 font-light mb-5">{cohort.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center shadow-sm">
              <BookOpen className="w-4 h-4 mx-auto mb-1 text-neutral-500" />
              <div className="text-sm font-medium text-neutral-900">{cohort.totalLessons}</div>
              <div className="text-[10px] text-neutral-400">Lessons</div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center shadow-sm">
              <Clock className="w-4 h-4 mx-auto mb-1 text-neutral-500" />
              <div className="text-sm font-medium text-neutral-900">{cohort.totalDuration}</div>
              <div className="text-[10px] text-neutral-400">Total</div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-center shadow-sm">
              <Users className="w-4 h-4 mx-auto mb-1 text-neutral-500" />
              <div className="text-sm font-medium text-neutral-900">{cohort.members}</div>
              <div className="text-[10px] text-neutral-400">Learners</div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-medium text-neutral-900 mb-3">People in this cohort</h3>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {members.slice(0, 5).map((m, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-neutral-600"
                  >
                    {m.avatar}
                  </div>
                ))}
              </div>
              <span className="text-xs text-neutral-500">+{cohort.members - 5} more</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-3">Choose your daily commitment</h3>
            <div className="grid grid-cols-3 gap-3">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedTime(opt.value)}
                  className={`rounded-xl p-3 text-center border transition-all ${
                    selectedTime === opt.value
                      ? "border-neutral-900 bg-neutral-50 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="text-sm font-medium text-neutral-900">{opt.label}</div>
                  <div className="text-[10px] text-neutral-400">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onJoin(cohort, selectedTime)}
            className="w-full h-11 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            Join & Start
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
