import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { cohorts as allCohortData, formatViews } from "@/data";
import { COHORT_CATEGORIES, type CohortCategory } from "@/domain/cohort/cohort.types";
import {
  Layers,
  ArrowRight,
  Search,
  CalendarDays,
  Users,
  BarChart3,
  MessageCircle,
  Flag,
  Palette,
  Presentation,
  Infinity,
  Lock,
  CheckCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Coursify — Structured Learning, Driven by Community" },
      {
        name: "description",
        content:
          "Join public cohorts across hundreds of topics. Commit to a daily path, learn alongside peers, and finally finish what you start.",
      },
    ],
  }),
});

/* ─── Landing Navbar (homepage-only) ─── */
function LandingNav() {
  return (
    <nav className="fixed top-0 w-full z-50 solid-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-neutral-100 border border-neutral-200 group-hover:bg-neutral-200 transition-colors">
              <Layers className="w-3.5 h-3.5 text-neutral-800" />
            </div>
            <span className="text-sm font-medium tracking-tight text-neutral-900">
              Coursify
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
            <a href="#cohorts" className="hover:text-neutral-900 transition-colors">
              Cohorts
            </a>
            <a href="#platform" className="hover:text-neutral-900 transition-colors">
              Platform
            </a>
            <a
              href="#community"
              className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              Live Network
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-live-pulse" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
            Sign In
          </span>
          <Link
            to="/explore"
            className="inline-flex items-center justify-center h-8 px-5 rounded-full text-xs font-medium transition-all bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 active:scale-95 shadow-sm gap-1.5"
          >
            Start Learning
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Page Component ─── */
function HomePage() {
  return (
    <div className="antialiased bg-[#FAFAFA] text-[#0A0A0A] overflow-x-hidden scroll-smooth">
      <LandingNav />

      {/* ── HERO ── */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden flex flex-col items-center border-b border-neutral-200 bg-white">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neutral-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neutral-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 w-full z-10 relative flex flex-col items-center">
          <Reveal className="mb-12 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-600 mb-6 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-live-pulse" />
              3,402 learners active now
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 mb-6 leading-tight">
              Structured learning,
              <br />
              driven by community.
            </h1>
            <p className="text-base md:text-lg text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
              Join public cohorts across hundreds of topics. Commit to a daily
              path, learn alongside peers, and finally finish what you start.
            </p>
          </Reveal>

          {/* Featured Cohort Widget */}
          <Reveal delay="100ms" className="surface-panel rounded-[2rem] w-full relative overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 md:px-8 md:py-6 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-600">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-neutral-900">
                      Featured Public Cohort
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Business &amp; Communication
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-8 bg-neutral-200" />
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-neutral-400 border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] font-medium text-neutral-600">+124</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    Members Enrolled
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-neutral-500">
                <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md shadow-sm text-neutral-900">
                  Enrolling Now
                </span>
                <span>Starts in 2 Days</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white">
              <div className="flex-1 w-full order-2 lg:order-1">
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 mb-3 leading-tight">
                  Clear Business Writing
                </h3>
                <p className="text-sm text-neutral-500 mb-8 max-w-md font-light leading-relaxed">
                  Master the art of concise communication. Write emails, memos,
                  and proposals that get read and drive action without the fluff.
                </p>
                <div className="mb-8 flex gap-6 border-y border-neutral-100 py-4">
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-medium text-neutral-900">21 Days</p>
                  </div>
                  <div className="w-px bg-neutral-100" />
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                      Pace
                    </p>
                    <p className="text-sm font-medium text-neutral-900">
                      15 min / day
                    </p>
                  </div>
                  <div className="w-px bg-neutral-100" />
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                      Format
                    </p>
                    <p className="text-sm font-medium text-neutral-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" /> Guided
                      Cohort
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/explore"
                    className="h-11 px-8 rounded-full text-sm font-medium transition-all bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  >
                    Join Cohort
                  </Link>
                  <button className="h-11 px-6 rounded-full text-sm font-medium transition-all border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center justify-center gap-2">
                    View Curriculum
                  </button>
                </div>
              </div>
              {/* Visual mockup */}
              <div className="w-full lg:w-[380px] aspect-[4/3] rounded-2xl bg-neutral-50 border border-neutral-200 relative overflow-hidden group order-1 lg:order-2 shadow-sm">
                <div className="absolute inset-0 p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-medium">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-900">
                        The BLUF Principle
                      </p>
                      <p className="text-[10px] text-neutral-500">Day 1 • 12 mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 text-neutral-400 flex items-center justify-center text-[10px] font-medium">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-700">
                        Structuring the Memo
                      </p>
                      <p className="text-[10px] text-neutral-400">Day 2 • 15 mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50/50 rounded-xl border border-neutral-100">
                    <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center text-neutral-300">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="w-24 h-2.5 bg-neutral-200 rounded-full mb-1.5" />
                      <div className="w-16 h-2 bg-neutral-100 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 border-b border-neutral-200 bg-white">
        <Reveal className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { icon: Search, title: "1. Find a Cohort", desc: "Browse hundreds of active learning paths across various disciplines." },
              { icon: CalendarDays, title: "2. Commit to a Pace", desc: "Choose how much time you can dedicate daily. The system builds your schedule." },
              { icon: Users, title: "3. Learn Together", desc: "Join a private space with peers on the exact same daily track as you." },
              { icon: BarChart3, title: "4. Track Progress", desc: "Build streaks, mark lessons complete, and finish the course." },
            ].map((step) => (
              <div
                key={step.title}
                className="p-4 flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-4 shadow-sm text-neutral-700">
                  <step.icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-medium text-neutral-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-neutral-500 font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="cohorts" className="py-24 px-6 relative bg-[#FAFAFA]">
        <Reveal className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-2">
                Featured cohorts.
              </h2>
              <p className="text-neutral-500 text-sm font-light">
                Hand-picked paths our community loves most.
              </p>
            </div>
            <Link
              to="/explore"
              className="text-sm font-medium text-neutral-900 flex items-center gap-1 hover:gap-2 transition-all"
            >
              Browse all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedCohorts().map((cohort) => (
              <Link key={cohort.id} to="/cohort/$cohortId" params={{ cohortId: cohort.id }}>
                <CohortPreviewCard
                  badge="Featured"
                  badgeClass="bg-neutral-900 text-white"
                  icon={<span className="text-3xl">{cohort.thumbnailEmoji}</span>}
                  tags={cohort.tags.slice(0, 3)}
                  title={cohort.title}
                  desc={cohort.description}
                  progressLabel={formatViews(cohort.views)}
                  progressDetail={`${cohort.avgProgress}% avg`}
                  progressPct={cohort.avgProgress}
                  members={cohort.members >= 1000 ? `${(cohort.members / 1000).toFixed(1)}k members` : `${cohort.members} members`}
                  cta="View Path"
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── MICROLEARNING MODE ── */}
      <section id="platform" className="py-32 px-6 border-t border-neutral-200 relative bg-white overflow-hidden">
        <Reveal className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-6 shadow-sm">
                <Infinity className="w-3.5 h-3.5 text-neutral-500" />
                Microlearning Mode
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6 leading-tight">
                Turn long content into a smooth stream of short lessons.
              </h2>
              <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed mb-10">
                Move through each segment step-by-step. Finish the entire course
                without ever feeling stuck.
              </p>
              <div className="p-5 rounded-2xl border border-neutral-200 bg-[#FAFAFA] flex flex-col gap-4 w-max shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)]">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  Intelligent Breakdown
                </span>
                <div className="flex items-center gap-4">
                  <div className="h-9 w-32 bg-neutral-900 rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm">
                    <span className="text-[10px] font-medium text-white relative z-10">
                      2-Hour Course
                    </span>
                    <div className="absolute inset-y-0 right-0 w-1/3 bg-white/10" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300" />
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
                      >
                        <span className="text-[10px] font-medium text-neutral-700">
                          {n}
                        </span>
                      </div>
                    ))}
                    <div className="w-9 h-9 flex items-center justify-center opacity-40">
                      <span className="text-xs font-medium text-neutral-400">
                        ...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed mockup */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto select-none">
              <div className="w-full h-[540px] bg-[#FAFAFA] rounded-[2.5rem] border-[6px] border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col">
                <div className="h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 flex flex-col justify-center px-6 absolute top-0 inset-x-0 z-30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                      Course Progress
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Active
                    </span>
                  </div>
                  <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full g-prog-fill" />
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden mask-feed pt-16">
                  <div className="absolute left-[29px] top-0 bottom-0 w-px bg-neutral-200 z-0 hidden sm:block" />
                  <div
                    className="animate-feed-structured flex flex-col w-full relative z-10"
                    style={{ paddingTop: "168px", gap: "20px" }}
                  >
                    {[
                      { state: 1, seg: "4 of 24", dur: "3 min", title: "Visual Hierarchy", desc: "Learn how to naturally guide the user's eye." },
                      { state: 2, seg: "5 of 24", dur: "4 min", title: "Spacing & Padding", desc: "Mastering the 8pt grid system for layouts." },
                      { state: 3, seg: "6 of 24", dur: "2 min", title: "Color Theory", desc: "Building accessible and engaging palettes." },
                      { state: 4, seg: "4 of 24", dur: "3 min", title: "Visual Hierarchy", desc: "Learn how to naturally guide the user's eye." },
                    ].map((card, i) => (
                      <div key={i} className="flex items-center px-6 gap-5 w-full relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 border-[1.5px] border-[#FAFAFA] shrink-0 relative z-10 hidden sm:block" />
                        <div
                          className={`c-state-${card.state} flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col justify-between`}
                          style={{ height: "140px" }}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                                Segment {card.seg}
                              </span>
                              <span className="text-[10px] font-medium text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                                {card.dur}
                              </span>
                            </div>
                            <h3 className="text-sm font-medium text-neutral-900 mb-1 leading-tight tracking-tight">
                              {card.title}
                            </h3>
                            <p className="text-xs text-neutral-500 font-light line-clamp-1">
                              {card.desc}
                            </p>
                          </div>
                          <div className="relative mt-2">
                            <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                              <div className={`h-full bg-neutral-900 rounded-full p-fill-${card.state}`} />
                            </div>
                            <div className={`absolute -right-2 -top-5 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-md c-pop-${card.state}`}>
                              <CheckCheck className="w-2.5 h-2.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── LIVE COMMUNITY TICKER ── */}
      <section id="community" className="py-16 border-t border-neutral-200 overflow-hidden bg-[#FAFAFA]">
        <Reveal className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Platform Activity
          </p>
          <h2 className="text-lg font-medium tracking-tight text-neutral-900">
            Learning happens together.
          </h2>
        </Reveal>
        <div className="w-full relative flex items-center h-16 overflow-hidden before:absolute before:left-0 before:top-0 before:w-24 md:before:w-48 before:h-full before:bg-gradient-to-r before:from-[#FAFAFA] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-24 md:after:w-48 after:h-full after:bg-gradient-to-l after:from-[#FAFAFA] after:to-transparent after:z-10">
          <div className="flex w-[200%] animate-marquee items-center gap-4">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-4 shrink-0">
                <TickerItem
                  dot="green"
                  text={<><strong className="font-medium text-neutral-900">Maya</strong> completed Day 4 in Conversational Spanish</>}
                  time="2m ago"
                />
                <TickerItem
                  icon={<MessageCircle className="w-3.5 h-3.5 text-neutral-500" />}
                  text={<><strong className="font-medium text-neutral-900">Alex</strong> posted a question in Public Speaking</>}
                  time="5m ago"
                />
                <TickerItem
                  icon={<Flag className="w-3.5 h-3.5 text-neutral-500" />}
                  text={<><strong className="font-medium text-neutral-900">James</strong> finished the Deep Work sprint</>}
                  time="12m ago"
                />
                <TickerItem
                  dot="blue"
                  text={<><strong className="font-medium text-neutral-900">Sam</strong> joined the Creative Writing cohort</>}
                  time="18m ago"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden bg-white border-t border-neutral-200">
        <Reveal className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Users className="w-6 h-6 text-neutral-900" />
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6 leading-tight">
            Enter the learning network.
          </h2>
          <p className="text-neutral-500 text-base font-light mb-10 max-w-md mx-auto">
            Discover a new topic, join an active cohort, and start building your
            daily learning habit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto h-12 px-8 rounded-full text-sm font-medium transition-all bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm flex items-center justify-center gap-2"
            >
              Join a Learning Path <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/create"
              className="w-full sm:w-auto h-12 px-8 rounded-full text-sm font-medium transition-all border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 shadow-sm"
            >
              Create Your Course
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 border-t border-neutral-200 relative z-10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-white border border-neutral-200 transition-colors shadow-sm">
              <Layers className="w-2.5 h-2.5 text-neutral-700" />
            </div>
            <span className="text-sm font-medium tracking-tight text-neutral-500 group-hover:text-neutral-900 transition-colors">
              Coursify
            </span>
          </Link>
          <div className="flex items-center gap-6 text-xs text-neutral-500 font-medium">
            <Link to="/explore" className="hover:text-neutral-900 transition-colors">
              Explore Cohorts
            </Link>
            <Link to="/create" className="hover:text-neutral-900 transition-colors">
              Create a Course
            </Link>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">
              Sign In
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function CohortPreviewCard({
  badge,
  badgeClass,
  icon,
  tags,
  title,
  desc,
  progressLabel,
  progressDetail,
  progressPct,
  members,
  cta,
}: {
  badge: string;
  badgeClass: string;
  icon: React.ReactNode;
  tags: string[];
  title: string;
  desc: string;
  progressLabel: string;
  progressDetail: string;
  progressPct?: number;
  members: string;
  cta: string;
}) {
  return (
    <div className="surface-panel p-2 rounded-[2rem] surface-panel-hover group flex flex-col h-full relative cursor-pointer">
      <div className={`absolute top-6 right-6 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-sm text-[10px] font-medium ${badgeClass}`}>
        {badgeClass.includes("bg-neutral-900") && (
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
        )}
        {badge}
      </div>
      <div className="h-44 rounded-t-[1.5rem] rounded-b-xl bg-neutral-50 border border-neutral-100 mb-4 p-5 flex flex-col justify-between relative overflow-hidden">
        <div className="group-hover:scale-105 transition-transform duration-500">
          {icon}
        </div>
        <div className="flex items-center gap-3 text-[10px] font-medium text-neutral-500">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 bg-white rounded-md border border-neutral-200 shadow-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <h3 className="text-lg font-medium text-neutral-900 mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 font-light mb-6">{desc}</p>
        <div className="mt-auto">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-neutral-500 font-medium mb-1.5">
              <span>{progressLabel}</span>
              <span>{progressDetail}</span>
            </div>
            {progressPct != null ? (
              <div className="w-full bg-neutral-100 h-1.5 rounded-full relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-neutral-900 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            ) : (
              <div className="w-full bg-neutral-100 h-1.5 rounded-full" />
            )}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-neutral-200 border border-white" />
                <div className="w-6 h-6 rounded-full bg-neutral-300 border border-white" />
              </div>
              <span className="text-[10px] text-neutral-500 font-medium">
                {members}
              </span>
            </div>
            <span className="text-xs font-medium text-neutral-900 flex items-center gap-1 group-hover:gap-2 transition-all">
              {cta} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TickerItem({
  dot,
  icon,
  text,
  time,
}: {
  dot?: string;
  icon?: React.ReactNode;
  text: React.ReactNode;
  time: string;
}) {
  return (
    <div className="px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center gap-2.5 whitespace-nowrap">
      {dot && <div className={`w-1.5 h-1.5 rounded-full bg-${dot}-500`} />}
      {icon}
      <span className="text-xs text-neutral-600 font-light">{text}</span>
      <span className="text-[10px] text-neutral-400 ml-2">{time}</span>
    </div>
  );
}
