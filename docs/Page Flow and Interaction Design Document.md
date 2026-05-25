# Page Flow and Interaction Design Document

## 0. Purpose
Detailed UX behavior spec.
Focus: information flow, interaction flow, placement logic.
Exclude: implementation/internal engineering details.

## 1. Global Layout Logic

## 1.1 Primary frame
- Top: global header (brand, primary nav, search/quick jump, profile).
- Body: page-specific content.
- Optional right rail (desktop): context panel.
- Mobile: bottom nav replaces dense top navigation.

## 1.2 Navigation priority
- Primary user jobs first: Learn, Dashboard, Cohorts, Explore.
- Create as secondary CTA in header + contextual prompts.
- Persistent "Resume" entry point when unfinished lesson exists.

## 1.3 Placement rules
- Left-to-right (desktop): orientation → task list → details.
- Top-to-bottom (mobile): status → next action → supporting details.
- 1 dominant CTA per viewport.
- Secondary actions grouped under kebab/dropdown.

## 2. Cross-Page Information Flow

## 2.1 First-time user flow
1. Land on Home.
2. Understand value quickly.
3. Create/join first cohort.
4. Set daily time.
5. Start first learning session.
6. Return to Dashboard with visible progress.

## 2.2 Returning user flow
1. Open app.
2. See daily target status.
3. Tap "Resume" or "Start today queue".
4. Complete one session.
5. Receive progress feedback + next recommended action.

## 2.3 Recovery flow (missed day)
1. Dashboard shows missed goal neutral tone.
2. One-tap recovery suggestion (short session).
3. Learn queue rebalances priorities.
4. Streak repair/consistency feedback shown.

## 3. Page Specs

## 3.1 Home (`/`)
### User intent
- Understand product.
- Decide to start.

### Content hierarchy
1. Hero (core promise + primary CTA).
2. 3-step explanation (input → adapt → complete).
3. Why different (completion vs consumption).
4. Example daily flow preview.
5. CTA repeat.

### Placement
- Hero above fold.
- Social proof under hero.
- Secondary explainer cards in horizontal row desktop / stacked mobile.

### Interactions
- CTA: "Create first cohort".
- Secondary: "Explore cohorts".
- Logged-in users get fast route to Dashboard.

## 3.2 Dashboard (`/dashboard`)
### User intent
- Assess today status.
- Start next session fast.

### Content hierarchy
1. Today progress strip (minutes done / target).
2. Next action card (what to do now).
3. Cohort progress cards.
4. Streak + consistency widget.
5. Recent activity feed.

### Placement
- Top row desktop: progress strip + start CTA.
- Mid row: cohort cards grid.
- Right rail desktop: streak + activity.
- Mobile: stack in same priority order.

### Interactions
- Start today queue.
- Resume last lesson.
- Open cohort detail.
- Adjust daily minutes per cohort inline.

### States
- Empty: onboarding CTA centered.
- Active/no work done: emphasize start CTA.
- Goal hit: show completion state + optional bonus lesson.

## 3.3 Explore (`/explore`)
### User intent
- Find cohort matching interest/time.

### Content hierarchy
1. Search + filter row.
2. Recommended cohorts.
3. Trending/new cohorts.
4. Saved/bookmarked cohorts.

### Placement
- Sticky filter/search at top.
- Card grid desktop, single column mobile.
- Join action always visible on card footer.

### Card contents
- Title, topic tags, difficulty.
- Estimated completion time.
- Active learners.
- Short outcome statement.

### Interactions
- Open card for detail preview.
- Quick join from card.
- Join modal asks daily time budget before confirm.

## 3.4 Cohorts (`/cohorts`)
### User intent
- Manage all cohorts.

### Content hierarchy
1. Tabs: Enrolled / Created / Completed.
2. Sort controls (progress, recent, priority).
3. Cohort list rows/cards.

### Placement
- Tabs top.
- Sort + search under tabs.
- Cohort items below with consistent action area.

### Cohort row structure
- Left: title + short descriptor.
- Center: progress bar + next lesson.
- Right: quick actions (continue, schedule, open).

### Interactions
- Continue learning.
- Edit time target.
- Reorder priority between cohorts.
- Leave/archive cohort.

## 3.5 Cohort Detail (`/cohort/$cohortId`)
### User intent
- Understand path.
- Continue module progression.
- Access cohort context/notes.

### Content hierarchy
1. Cohort header (title, overall progress, time left).
2. Next recommended lesson panel.
3. Module map/list.
4. Supporting tabs: Notes, Members, Settings.

### Placement
- Header pinned on scroll (compact mode after collapse).
- Module progression dominant center.
- Notes/Members in tabbed container below or side panel desktop.

### Module/Lesson placement logic
- Show current module expanded by default.
- Completed modules collapsed.
- Locked modules visible with requirement tags.

### Interactions
- Start next lesson.
- Jump to module.
- Add note attached to module/lesson.
- Creator/admin edit module structure.

## 3.6 Create (`/create`)
### User intent
- Build cohort quickly with low confusion.

### Flow structure
Step 1: Add source URLs.
Step 2: Review auto-generated module structure.
Step 3: Edit naming/order.
Step 4: Configure cohort metadata.
Step 5: Publish.

### Placement
- Wizard stepper top.
- Main workspace center.
- Live preview side panel desktop.
- Footer nav fixed (Back / Next / Publish).

### Interactions
- Drag reorder modules.
- Inline rename.
- Expand module to inspect lesson breakdown.
- Save draft anytime.

### Error behavior
- Validation inline near fields.
- Blocking errors at step boundary.

## 3.7 Learn (`/learn`)
### User intent
- Execute best next micro-session without planning.

### Content hierarchy
1. Today queue header (remaining minutes + cohorts mix).
2. Current recommended lesson card (primary focus).
3. Upcoming queue cards.
4. Queue controls (skip/snooze/rebalance hints).

### Placement
- Primary lesson card above fold.
- Upcoming queue below in compact list.
- Explanation chip: why this lesson now.

### Interactions
- Start now.
- Skip once.
- Snooze cohort for day.
- Manual swap with another queued lesson.

### Feedback loops
- After each completion: queue recalculates.
- Show delta: minutes left + cohort balance update.

## 3.8 Lesson (`/lesson/$lessonId`)
### User intent
- Prepare for focused session.

### Content hierarchy
1. Lesson objective + expected outcome.
2. Source preview.
3. Key points/checkpoints.
4. Notes/history.
5. Focus mode CTA.

### Placement
- Objective + CTA top.
- Source + checkpoints center.
- Notes in right rail desktop / accordion mobile.

### Interactions
- Start focus mode.
- Save note before starting.
- Mark checkpoint while reviewing.

## 3.9 Focus (`/focus/$lessonId`)
### User intent
- Complete session with minimal distraction.

### Screen model
- Single-purpose interface.
- Hide non-critical nav.
- Keep progress + timer always visible.

### Content hierarchy
1. Player/content surface.
2. Session timer + progress strip.
3. Quick actions (pause, checkpoint, note).
4. End-session summary trigger.

### Placement
- Player dominant center.
- Timer/progress top sticky.
- Actions bottom dock (thumb reachable mobile).

### Interactions
- Pause/resume.
- Add timestamp note.
- Complete segment.
- End session early with reason.

### Exit states
- Completed: celebration + next suggestion.
- Partial: saved progress + resume prompt.

## 4. Shared Components and Their Behavioral Roles
- Progress strip: always communicates done/remaining.
- Next action card: strongest directional component.
- Cohort card: comparison + quick action.
- Module map: structural orientation.
- Queue card: execution unit.
- Note composer: capture insight with low friction.

## 5. Microinteraction Rules
- Immediate visual response on all primary actions.
- Progress update animation <400ms.
- Confetti/celebration only on meaningful milestones.
- No modal stacking.
- Undo for destructive quick actions (leave/archive/snooze).

## 6. Content Strategy by Surface
- Dashboard copy: directive, short, action-first.
- Explore copy: evaluative/comparative.
- Cohort detail copy: orienting + progress-focused.
- Learn/focus copy: minimal, execution-only.

## 7. Empty, Error, Edge States
- Empty Dashboard: explain first action + show Create/Explore choices.
- Empty Cohorts tab: suggest discover cohorts.
- Broken source in created cohort: flag lesson + allow replace source.
- Queue exhausted for day: show completion state + optional extras.

## 8. Mobile-Specific Behavior
- Bottom nav fixed.
- Sticky "Start/Resume" button on dashboard/learn.
- Collapse secondary metadata behind accordions.
- Swipe between queue items in Learn view.

## 9. Handoff Checklist for Designers
- Wireframe each route + key states (empty/active/completed/error).
- Define component variants for cards/queues/modules.
- Define spacing/type scale tokens.
- Define interaction notes for transitions.
- Define responsive behavior for each page block.
- Provide click-through prototype for first-time + returning + recovery flows.
