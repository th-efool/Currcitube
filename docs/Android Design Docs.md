# Android Design Docs

## 0. Goal
Native Android app vision for Currcitube.
Follow Material 3 + Android UX patterns.
Focus: flow, screen behavior, placement, interaction model.

## 1. Product Model (Android)
- Job: convert long-form learning intent into daily executable sessions.
- Core loop: Open app → Start queue item → Complete micro-session → Receive next step.
- Key mobile truth: one-hand use, short sessions, instant resume.

## 2. Platform Rules
- Design system: Material 3 (dynamic color, type scale, elevation).
- Navigation: top app bar + bottom navigation + modal bottom sheets.
- Large screens: navigation rail + list-detail patterns.
- Motion: meaningful transitions, no decorative overload.
- Accessibility: TalkBack labels, 48dp touch targets, scalable text, high contrast.
- Offline-first reading/progress cache for unstable network.

## 3. App Information Architecture
Bottom nav tabs:
1. Home
2. Learn
3. Cohorts
4. Explore
5. Profile

Global actions:
- Persistent Resume chip/card.
- FAB contextually used on Create-capable screens (mostly Cohorts tab).

## 4. App-Wide Layout Patterns
- Top app bar:
  - Small top bar for task-heavy screens.
  - Medium/large top bar for overview screens.
- Bottom sheets:
  - Filters
  - Join flow
  - Quick schedule edits
- Snackbars:
  - Undo destructive actions (leave cohort, snooze, skip).
- Pull-to-refresh:
  - Home, Explore, Cohorts lists.

## 5. Primary User Flows

## 5.1 New user flow
1) Onboarding intro (3 cards max).
2) Permission rationale (notifications optional).
3) Choose interests.
4) Join/create first cohort.
5) Set daily minutes.
6) Start first lesson.

## 5.2 Returning user flow
1) Open app.
2) Home shows remaining minutes + resume target.
3) Tap Start/Resume.
4) Complete focus session.
5) See streak/progress + next recommendation.

## 5.3 Missed-day recovery flow
1) Home shows gentle recovery prompt.
2) Suggest reduced session plan.
3) Learn queue prioritizes lagging cohort.
4) Streak recovery messaging after completion.

## 6. Screen Specs

## 6.1 Splash + Auth
- Splash: brand + quick load.
- Auth: Google + email.
- Layout: single-column centered cards.
- Keep auth minimal; defer personalization.

## 6.2 Onboarding
Pages:
- Value proposition.
- How adaptive queue works.
- Set expectations (10–20 min/day habit).
Actions:
- Continue, Skip.
- Final action: "Set up my learning".

## 6.3 Home Tab
Purpose: daily control center.

Sections (top→bottom):
1. Greeting + streak icon.
2. Daily progress ring (minutes completed/target).
3. Resume card (primary CTA).
4. Today queue preview (next 3 items).
5. Cohort progress carousel.
6. Activity/history snippet.

Interactions:
- Tap ring → full daily stats sheet.
- Tap resume → Focus screen.
- Tap queue item → Lesson pre-focus screen.

States:
- Empty: show "Join or Create cohort" CTAs.
- Active: show queue.
- Goal complete: celebratory state + optional bonus queue.

## 6.4 Learn Tab
Purpose: execution queue.

Layout:
- Segmented control: Recommended | All Today.
- Current item hero card.
- Upcoming list items.
- Queue controls row.

Controls:
- Start now.
- Skip once.
- Snooze cohort today.
- Swap with another queued lesson.

Behavior:
- Recompute queue after each completion/skip.
- Show reason chip: "Because German missed yesterday".

## 6.5 Cohorts Tab
Purpose: manage learning tracks.

Structure:
- Tabs: Enrolled / Created / Completed.
- Search + sort chips.
- Cohort cards list.
- FAB: Create cohort.

Cohort card content:
- Title + tags.
- Progress bar.
- Next lesson.
- Daily minutes.
- Continue button.

Swipe actions:
- Left: Snooze today.
- Right: Quick schedule edit.

## 6.6 Cohort Detail Screen
Purpose: path visibility + progression.

Layout:
- Collapsing top app bar with cohort info.
- Progress summary block.
- Module list (expand/collapse).
- Secondary tabs/chips: Notes, Members, Info.

Module item:
- Module name.
- Completion status.
- Estimated remaining time.
- Next lesson shortcut.

Creator/admin controls:
- Edit structure.
- Reorder modules.
- Add/remove lessons.
(Use edit mode bottom sheet.)

## 6.7 Explore Tab
Purpose: discovery + join.

Layout:
- Search bar pinned.
- Filter chips row.
- Sections: For You, Trending, New.
- Infinite list/paging.

Cohort detail preview (bottom sheet or dedicated screen):
- Outcome summary.
- Time commitment.
- Module snapshot.
- Community stats.
- Join CTA.

Join flow:
- Step 1 confirm join.
- Step 2 choose daily minutes.
- Step 3 add to today queue.

## 6.8 Create Cohort Flow
Pattern: multi-step full-screen flow.

Steps:
1) Add source URLs.
2) Parse preview.
3) Edit modules/lesson names.
4) Set metadata.
5) Publish.

UI patterns:
- Step indicator top.
- Primary action bottom sticky.
- Validation inline.
- Save draft.

## 6.9 Lesson Detail Screen
Purpose: pre-focus orientation.

Sections:
- Objective.
- Source/context.
- Checkpoints.
- Notes.
- CTA: Start Focus Session.

Quick actions:
- Download/save offline segment.
- Bookmark.
- Add note before start.

## 6.10 Focus Session Screen
Purpose: distraction-free completion.

Layout:
- Immersive mode with minimal chrome.
- Media/player top.
- Timer + session progress sticky.
- Quick note/checkpoint controls bottom.

Controls:
- Pause/resume.
- 10-sec rewind/forward (if media).
- Mark checkpoint.
- End session.

Completion sheet:
- Minutes completed.
- Streak update.
- Next recommended lesson.
- CTA: Continue or return Home.

## 6.11 Profile Tab
Sections:
- Avatar + streak count.
- Weekly consistency chart.
- Learning stats (completion rate, time spent).
- Notification settings.
- Theme settings (dynamic/system/light/dark).

## 7. Android-Specific Interaction Rules
- Back gesture behavior always predictable:
  - Screen-level back returns previous screen.
  - In step flows, back moves previous step first.
- System back never causes data loss silently.
- Haptics on milestone completion and primary success states.
- Use modal bottom sheet for short tasks; full-screen for long tasks.
- Respect keyboard insets; primary CTA never hidden by IME.

## 8. Notifications Strategy
Types:
- Daily reminder (time-based).
- Resume unfinished session.
- Streak-at-risk alert.
- Cohort milestone achieved.

Rules:
- User-configurable frequency.
- No spam: cap non-critical nudges/day.
- Deep link directly to relevant screen.

## 9. Widgets + Shortcuts (Android Native Advantage)
- Home screen widget:
  - shows today minutes, next lesson, start button.
- App shortcuts (long-press icon):
  - Resume lesson
  - Open Learn queue
  - Create cohort

## 10. Large Screen/Foldable Behavior
- Use list-detail split for Cohorts + Cohort Detail.
- Learn queue left pane, selected lesson right pane.
- Preserve continuity when folding/unfolding.
- Avoid fixed bottom nav on very wide screens; use nav rail.

## 11. Empty/Error/Edge States
- No cohorts: prompt Explore + Create.
- Queue empty: suggest review/bonus lesson.
- Network lost during focus:
  - local progress cache,
  - sync banner when online returns.
- Source unavailable:
  - skip suggestion,
  - replace source option for creator.

## 12. Motion + Visual Language
- Motion duration:
  - small state: ~150–200ms,
  - screen transitions: ~250–350ms.
- Use shared axis transitions for queue→focus flows.
- Use container transform for card→detail transitions.
- Celebrate only milestone completions, not every tap.

## 13. Accessibility Requirements
- 48dp min touch targets.
- Screen reader names for all icons/buttons.
- Semantic headings for each major section.
- Captions/subtitles support for video sessions.
- Color never sole status signal; include text/icon.

## 14. Design QA Checklist
- Every screen has 1 primary action.
- Resume path reachable in <=2 taps from Home.
- Daily status visible without scrolling on Home.
- Error states actionable.
- Dark mode parity complete.
- TalkBack walkthrough passes key flows.

## 15. Deliverables Expected from Designers
- User flow diagrams (new, returning, recovery).
- Low-fidelity wireframes all key screens.
- High-fidelity Material 3 mockups (mobile + tablet).
- Interaction specs for transitions, sheets, states.
- Component library mapping (tokens + variants).
- Prototype covering full daily learning loop.
