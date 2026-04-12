import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakWidgetProps {
  streak: number;
}

export function StreakWidget({ streak }: StreakWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="surface-panel rounded-[1.5rem] p-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <div className="text-2xl font-medium text-neutral-900">{streak} day streak</div>
          <div className="text-sm text-neutral-500 font-light">Don't break it today!</div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-3">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < streak % 7 ? "bg-neutral-900" : "bg-neutral-100"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
