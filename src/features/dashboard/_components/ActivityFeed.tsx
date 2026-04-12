import { motion } from "framer-motion";
import { activity } from "@/data";

export function ActivityFeed() {
  return (
    <div className="surface-panel rounded-[1.5rem] p-5">
      <h3 className="text-sm font-medium text-neutral-900 mb-4">Cohort Activity</h3>
      <div className="space-y-3">
        {activity.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium text-neutral-900">{item.user}</span>{" "}
                <span className="text-neutral-500">{item.action}</span>
              </p>
              <p className="text-xs text-neutral-400">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
