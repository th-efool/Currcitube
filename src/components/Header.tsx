import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 solid-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded flex items-center justify-center bg-neutral-100 border border-neutral-200 group-hover:bg-neutral-200 transition-colors">
            <Layers className="w-3.5 h-3.5 text-neutral-800" />
          </div>
          <span className="text-sm font-medium tracking-tight text-neutral-900">
            Coursify
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/explore"
            className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-medium text-neutral-900 bg-neutral-100" }}
          >
            Explore
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-medium text-neutral-900 bg-neutral-100" }}
          >
            Dashboard
          </Link>
          <Link
            to="/learn"
            className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-medium text-neutral-900 bg-neutral-100" }}
          >
            Microlearning
          </Link>
          <Link
            to="/cohorts"
            className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-medium text-neutral-900 bg-neutral-100" }}
          >
            My Cohorts
          </Link>
        </nav>
        <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-xs font-medium text-white">
          Y
        </div>
      </div>
    </header>
  );
}
