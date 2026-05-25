# Project Design Document

## 0. Purpose
Design blueprint for remake/reimagine current app UI/UX.
Audience: product designers + frontend implementers.
Output expected: page flows, component specs, interaction states, responsive behavior.

## 1. Existing App Map (Source of Truth)
Current routes in codebase:
- `/` Home. (`src/routes/index.tsx`)
- `/dashboard` Dashboard. (`src/routes/dashboard.tsx`)
- `/explore` Explore cohorts. (`src/routes/explore.tsx`)
- `/cohorts` User cohorts list. (`src/routes/cohorts.tsx`)
- `/cohort/$cohortId` Cohort detail. (`src/routes/cohort.$cohortId.tsx`)
- `/create` Create cohort. (`src/routes/create.tsx`)
- `/learn` Learning feed. (`src/routes/learn.tsx`)
- `/lesson/$lessonId` Lesson detail. (`src/routes/lesson.$lessonId.tsx`)
- `/focus/$lessonId` Focus mode session. (`src/routes/focus.$lessonId.tsx`)

## 2. Core Product Scope
Goal: convert long-form learning sources into daily executable learning sessions.

### In scope
- Cohort-based learning paths.
- Time-budget per cohort.
- Adaptive daily queue across cohorts.
- Progress tracking.
- Notes + social accountability (lightweight).

### Out of scope (MVP)
- Marketplace.
- Complex CMS.
- Unlimited source types.
- Heavy forum/discussion system.

## 3. IA + Navigation
Primary nav items:
- Home
- Dashboard
- Explore
- Cohorts
- Learn
- Create

Global navigation rules:
- Persistent top header on desktop.
- Bottom nav on mobile for: Dashboard, Learn, Cohorts, Explore.
- "Continue Learning" CTA visible globally when active lesson exists.

## 4. Page-by-Page UX Spec

## 4.1 Home (`/`)
Purpose: product value + onboarding funnel.
Sections:
- Hero: "From saved content to daily completion".
- How it works: Add source → Set time → Follow daily queue.
- Social proof / stats strip.
- CTA: "Create first cohort".
States:
- Logged out: marketing + auth CTA.
- Logged in: redirect suggestion to `/dashboard`.

## 4.2 Dashboard (`/dashboard`)
Purpose: daily command center.
Blocks:
- Today minutes target vs completed.
- Cohort progress cards.
- Streak widget.
- Recent activity feed.
- Primary CTA: "Start today’s session" → `/learn`.
Required states:
- Empty: no cohorts joined.
- Partial: active cohorts, no activity today.
- Complete: daily goal hit.

## 4.3 Explore (`/explore`)
Purpose: discover/join cohorts.
Blocks:
- Search + filter (topic, level, duration).
- Cohort cards (title, est total time, active learners, completion trend).
- Join modal flow.
Interactions:
- Join → optional daily time budget prompt.
- Save/bookmark cohort.

## 4.4 Cohorts (`/cohorts`)
Purpose: manage enrolled/created cohorts.
Layout:
- Tabs: Enrolled | Created | Completed.
- Each cohort row: progress %, next lesson, daily target, quick actions.
Quick actions:
- Continue.
- Edit time budget.
- Leave cohort.
- Open details.

## 4.5 Cohort Detail (`/cohort/$cohortId`)
Purpose: structured path + community context.
Tabs:
- Overview
- Modules/Lessons
- Notes
- Members
- Settings (creator/admin only)
Elements:
- Milestone progress bar.
- Module list with locked/unlocked states.
- Prerequisite indicators.
- Estimated time remaining.
Actions:
- Start next lesson.
- Mark complete (where applicable).
- Add private/public note.

## 4.6 Create (`/create`)
Purpose: create cohort from source.
Wizard steps:
1) Add source URL(s) (YouTube/Twitch only for MVP).
2) Auto-parse + module generation preview.
3) Edit module titles/order.
4) Set metadata (difficulty, tags, est pace).
5) Publish cohort.
Validation:
- Invalid URL handling.
- Duplicate source warning.
- Empty module guard.

## 4.7 Learn (`/learn`)
Purpose: adaptive "what to do now" feed.
Feed behavior:
- Interleave lessons from multiple cohorts per daily budget.
- Priority rebalancing based on missed targets.
- Show why this lesson is next (short rationale chip).
Card actions:
- Start now.
- Skip once.
- Snooze cohort for today.

## 4.8 Lesson (`/lesson/$lessonId`)
Purpose: lesson context page before deep session.
Blocks:
- Lesson objective.
- Source preview.
- Key checkpoints.
- Notes panel.
- Start Focus Mode CTA.

## 4.9 Focus (`/focus/$lessonId`)
Purpose: distraction-minimized execution.
Elements:
- Video/content player.
- Session timer.
- Milestone checkpoint prompts.
- Quick recall prompt after segment.
- Complete session action.
Exit behavior:
- Save progress continuously.
- On completion: feedback + next suggested lesson.

## 5. Cross-Cutting UX Rules
- Max 1 primary CTA per viewport.
- Progress always visible (header chip or sticky footer).
- Re-entry friction low: "Resume" shown across Dashboard/Cohorts/Learn.
- Clear empty states with direct next action.
- Errors show actionable fix text.

## 6. Design System Requirements
- Tokenized spacing/typography/color.
- Component consistency using existing UI primitives under `src/components/ui/*`.
- Accessibility:
  - contrast AA minimum,
  - keyboard navigation for primary flows,
  - visible focus states,
  - ARIA labels on actionable icons.

## 7. Responsive Behavior
Breakpoints:
- Mobile: 320–767
- Tablet: 768–1023
- Desktop: 1024+
Rules:
- Mobile-first layouts.
- Collapse multi-column dashboards into stacked cards.
- Keep Learn/Focus actions thumb-reachable.

## 8. MVP Feature Checklist (Build Priority)
P0:
- Auth shell + navigation.
- Dashboard daily goal + streak.
- Explore list + join flow.
- Cohort detail + module progression.
- Learn adaptive queue (basic heuristic).
- Focus mode timer + completion tracking.

P1:
- Notes (private/public).
- Cohort member list + light interaction.
- Creator edit flow improvements.

P2:
- Advanced recommendation tuning.
- Rich recall widgets.
- Real-time collaboration enhancements.

## 9. Data/State Needed for UI
Entities:
- User
- Cohort
- Module
- Lesson
- Enrollment
- Session
- Note

Key UI state:
- activeCohorts
- todayBudgetByCohort
- todayCompletedByCohort
- nextLessonQueue
- streak
- lastActiveLesson

## 10. Success Criteria for Redesign
- User can reach "Start today session" in <=2 interactions from any primary page.
- User understands current progress in <=3 seconds on Dashboard/Cohort/Learn.
- Join cohort + first lesson start flow completed in <=3 minutes.
- Return user can resume last lesson in 1 click.
