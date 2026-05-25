# Project Design Document

## 1. Working Positioning

**A personal learning engine that turns any long-form content into a doable daily habit.**

Not a course marketplace.

Not a video library.

Not "AI that summarizes stuff."

It is a system that helps people take something they genuinely want to learn — a YouTube playlist, a long lecture series, a niche topic rabbit hole, a creator’s content arc, or a skill they keep postponing — and actually finish it in small, motivating sessions.

---

## 2. The Core Problem

People do not fail because they lack content.

They fail because content is too unstructured to fit real life.

High-quality learning is everywhere:

- YouTube playlists
- long-form videos
- creator series
- podcasts
- niche educational channels
- saved links and “watch later” lists

Problem is not discovery.

Problem is completion.

When content becomes a 10-hour to 20-hour commitment, it feels like burden. People need a way to make curiosity survivable inside a busy week.

---

## 3. Insight

Future of learning is not only better content.

It is better pedagogy adapted to modern attention patterns.

Current platforms optimize for:

- passive long-form consumption
- shallow short-form stimulation

Gap: middle layer.

Most microlearning products optimize for engagement, not deep mastery. They produce snippets, not sustained competency.

Deep learning still needs:

- continuity
- sequencing
- reinforcement
- recall
- progression
- conceptual layering

This product fills the gap between long-form depth and short-form usability.

---

## 4. Product Vision

Transform long-form content into structured, adaptive, daily learning progression.

Design for multi-threaded curiosity.

Users can run multiple learning cohorts in parallel (example: German + DSA + Docker + Psychology).

Core intent: progression, not endless browsing.

---

## 5. Category Definition

Not course platform.

Not content library.

Not generic AI summarizer.

It is a **learning execution layer**.

Category statement: **From curiosity to completion.**

---

## 6. User Promise

**Tell us what you want to learn and how much time you have. We convert it into a path you can sustain.**

- no guilt from unfinished playlists
- no confusion about where to continue
- low friction restart
- no “someday” trap

---

## 7. Primary User Stories

### 7.1 Curious Learner

"I keep finding interesting content, but I never finish it."

### 7.2 Busy Builder

"I want this skill, but only have 15 minutes/day."

### 7.3 Hobby Explorer

"I don’t want formal course. I want fun deeper learning."

### 7.4 Accountability Learner

"I stay consistent with nudges or social momentum."

---

## 8. Product Mechanics

### 8.1 Input

Learning source:

- YouTube playlist
- lecture/video series
- topic intent
- creator arc
- niche interest

### 8.2 Processing

System should:

- infer structure
- break into manageable lessons
- preserve sequence
- adapt pacing to available time
- recommend best next action
- apply recall/reinforcement loops

### 8.3 Output

User receives:

- daily path
- micro sessions
- recap + recall prompts
- completion feedback
- optional social/accountability layer

---

## 9. Core Differentiators

- Optimized for completion, not views.
- Converts passive content into active commitment.
- Adaptive scheduling across multiple cohorts.
- Keeps momentum with visible progression.
- Reduces planning overhead for user.

---

## 10. Emotional Positioning

Moment addressed:

- "Looks great, too much right now."
- "I save things and never finish."
- "Life interrupts learning."
- "I want learning to feel light, not heavy."

Positioning line: **curiosity with a finish line**.

---

## 11. Scope for Designers (Remake/Reimagine)

### 11.1 UX Goals

- Immediate clarity: what to learn today.
- Fast re-entry after missed days.
- Low cognitive load.
- Progress always visible.
- Multi-cohort management without overwhelm.

### 11.2 Information Architecture

Primary surfaces:

1. Home/Daily Flow
2. Cohorts Dashboard
3. Cohort Detail (modules, progress, members)
4. Session Player (reel-like guided flow)
5. Notes + Recall
6. Social/Accountability
7. Profile + Streaks + Milestones

### 11.3 Interaction Principles

- One dominant next action per screen.
- Frictionless continue action.
- Smart defaults over heavy configuration.
- Progressive disclosure for advanced controls.

### 11.4 Visual Direction

- Lightweight, motivating, modern.
- Emphasize momentum (progress bars, streaks, checkpoints).
- Distinguish "explore" vs "execute" states.

---

## 12. Feature Set (MVP vs Future)

### 12.1 MVP (Hackathon-feasible)

- Cohort creation from YouTube playlists/videos
- Time-budget setup per cohort
- Adaptive daily queue across cohorts
- Session completion tracking
- Basic notes (private + optional public)
- Basic cohort chat
- Progress dashboard

### 12.2 Post-MVP / Scale

- Twitch source support
- Rich recall exercises
- AI-generated checkpoints/quizzes
- Role-based cohort moderation/admin
- Body-doubling/study-together mode
- Deeper personalization engine

---

## 13. Non-Goals (Current)

- Open marketplace of paid courses
- Broad support for arbitrary external content formats
- Full LMS replacement
- Generic "summary tool" framing

---

## 14. Product Principles

- Completion > consumption
- Consistency > intensity
- Structure > chaos
- Momentum > motivation spikes
- Actionability > content abundance

---

## 15. Success Metrics

### 15.1 Behavioral

- Daily active learners
- Sessions completed/week
- Cohort completion rate
- Return rate after missed day
- Multi-cohort continuity

### 15.2 Learning Signals

- Recall prompt completion
- Checkpoint pass trends
- Time-to-completion per cohort

### 15.3 Product Health

- Drop-off points in flow
- Content-to-path conversion success
- User-reported overwhelm reduction

---

## 16. One-Line Pitch Options

1. Turn anything you want to learn into a daily habit you can actually finish.
2. Easiest way to go deep on long-form content without burnout.
3. Personal learning engine that transforms curiosity into completion.
4. Learn what you keep saving, one small step at a time.
5. From saved video to finished skill.

---

## 17. Strong Pitch Version

People do not fail because they lack content.

They fail because great content is rarely designed for real life.

We are building a personal learning engine that transforms long-form content into a guided, motivating daily journey.

User brings curiosity.

System provides structure, pacing, reinforcement, momentum.

Outcome: practical deep learning that fits busy days.

---

## 18. Messaging Guardrails

Avoid framing as:

- course platform
- online learning marketplace
- AI video summarizer
- generic study app

Preferred framing:

- completion
- pacing
- habit formation
- structured curiosity
- momentum
- finishing what you start

---

## 19. Canonical Framing Sentence

**We help people finish the learning they already care about by turning long-form content into a personalized daily path.**

---

## 20. Team Conversation Synthesis (May 24–25, 2026)

Key aligned points extracted from team chat:

- Theme fit: AI + second brain.
- Direction favored: community-driven cohort microlearning.
- Need: compact, hackathon-feasible scope.
- X-factor: user should not manually organize/plan constantly.
- Desired behavior: set time commitments per cohort; system adaptively rebalances day-to-day learning flow.
- Social add-ons considered: notes sharing, cohort chat, optional admin/edit roles.
- Scope caution: avoid too much flexibility that increases user cognitive overhead.

Decision implication:

- Build core execution engine first.
- Add community and collaboration as supportive layers.
- Keep content sources constrained initially for reliability and speed.
