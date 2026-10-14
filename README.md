# Currcitube

**Turn the content you save into learning you actually finish.**

Currcitube is a cohort-based microlearning concept designed to help people make steady progress through long-form learning content. Instead of leaving YouTube playlists, lecture series, and skill-building videos in a backlog, learners follow structured paths, work in short sessions, and track their progress over time.

**Live demo:** https://currcitube.vercel.app

> **Project status:** This repository contains a front-end prototype with seeded/mock cohort data. Some flows are demonstrations rather than production integrations. Cohort creation currently returns mock data, and the Supabase client is a placeholder.

## Contents

- [Why Currcitube](#why-currcitube)
- [Product direction](#product-direction)
- [Current prototype](#current-prototype)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Roadmap](#roadmap)
- [License](#license)

## Why Currcitube

Online learning has no shortage of content. The harder problem is continuing when a playlist feels too long, time is limited, or the next step is unclear.

Currcitube explores a middle ground between passive long-form consumption and disconnected short-form content: **structured learning in small, manageable sessions, with visible progression and optional community momentum.**

The product is designed around three principles:

- **Completion over consumption:** make progress through a learning path, not just collect content.
- **Consistency over intensity:** fit learning into realistic daily time budgets.
- **Structure over planning overhead:** make the next useful lesson easy to find.

## Product direction

Currcitube's planned learning loop is:

1. **Choose a learning path** — explore an existing cohort or start one from a supported video or playlist source.
2. **Set a realistic pace** — decide how many minutes you can spend learning each day.
3. **Follow focused sessions** — move through lessons in a clear sequence.
4. **Track progress** — see completed lessons, cohort progress, and learning streaks.
5. **Learn alongside others** — use cohorts as a lightweight layer of shared accountability.

The intended experience is for people learning technical skills, languages, creative disciplines, and other subjects they want to explore without committing to a rigid, full-length course.

## Current prototype

The repository includes front-end routes and UI for:

| Area | Purpose |
| --- | --- |
| Home | Introduces the product and directs learners to discover cohorts. |
| Dashboard | Presents enrolled cohorts, next lessons, progress, and activity widgets. |
| Explore | Searches seeded cohorts and demonstrates joining a learning path. |
| Cohorts | Provides a place to manage learning paths. |
| Create | Demonstrates the cohort creation entry point. |
| Learn | Presents lessons in a guided feed across joined cohorts. |
| Lesson and Focus Mode | Opens a lesson and embeds its YouTube video with progress and completion controls. |

### Prototype limitations

- Cohort and lesson content is primarily seeded in local mock data.
- The cohort creation action currently returns a mock cohort; it does not yet generate a curriculum from the supplied URL.
- The Supabase client is currently a placeholder (`null`), not a configured database connection.
- UI indicators and example community metrics should not be interpreted as live production analytics.
- Authentication, persistence, and production backend behavior should be implemented and verified before treating the project as a production learning service.

## Technology stack

| Technology | Role |
| --- | --- |
| React 19 | Component-based UI |
| TypeScript | Typed application code |
| Vite 7 | Development server and build tooling |
| TanStack Start and TanStack Router | Application framework and file-based routes |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Interface transitions and motion |
| Radix UI | Accessible interface primitives |
| Lucide React | Icon library |
| TanStack Query | Server-state tooling |
| Supabase integration scaffold | Placeholder for a future backend connection |
| Vercel | Published demo deployment |

## Getting started

### Prerequisites

- Node.js compatible with the installed Vite and TypeScript toolchain
- [Bun](https://bun.sh/) or another package manager that supports the dependencies in `package.json`

### Install dependencies

Using Bun (the repository includes `bun.lockb`):

```bash
bun install
```

Or using npm:

```bash
npm install
```

### Run locally

```bash
bun run dev
```

With npm:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Starts the development server. |
| `bun run build` | Creates a production build. |
| `bun run build:dev` | Builds using development mode. |
| `bun run preview` | Serves the built application locally for preview. |
| `bun run lint` | Runs ESLint. |

Equivalent `npm run <script>` commands can be used after installing with npm.

## Project structure

```text
.
├── docs/                         # Product, page-flow, and Android design docs
├── Instructions/                 # Design iterations and implementation references
├── public/                       # Static assets
├── src/
│   ├── components/               # Shared layout and UI components
│   ├── constants/                # Application constants
│   ├── data/
│   │   └── repositories/         # Seeded/mock repository data
│   ├── domain/
│   │   ├── cohort/               # Cohort types and service logic
│   │   ├── community/            # Community-related types
│   │   └── lesson/                # Lesson types and service logic
│   ├── features/                 # Feature-level queries and components
│   ├── integrations/supabase/    # Supabase integration scaffold
│   ├── lib/                      # Shared utilities and state store
│   ├── routes/                   # File-based application routes
│   ├── styles.css                # Global styles
│   ├── router.tsx                # Router configuration
│   └── main.tsx                  # Application entry point
├── supabase/                     # Supabase project configuration
├── package.json
├── vite.config.ts
└── wrangler.jsonc
```

## Architecture notes

The codebase separates route-level UI, feature modules, domain types, and data access:

- **Routes** compose the page experience.
- **Features** hold feature-specific queries and UI components.
- **Domain modules** define the core cohort, lesson, and community concepts.
- **Data repositories** currently provide seeded data and are intended to be replaceable with real services.
- **Shared components** provide reusable interface primitives and layout elements.

This is an evolving prototype rather than a finished production architecture. Before adding live user data, the mock repository and placeholder integrations need to be replaced with persistent services and validated end-to-end.

## Roadmap

The product design documents describe these next steps:

- [ ] Replace mock data with a persistent backend and real authentication.
- [ ] Build actual cohort generation from supported YouTube URLs.
- [ ] Add curriculum parsing, lesson ordering, and editable cohort drafts.
- [ ] Persist progress, notes, daily time budgets, and streaks.
- [ ] Make the cross-cohort daily queue respond to learner schedules and progress.
- [ ] Implement durable community and accountability features.
- [ ] Add automated tests for the core learning loop and key edge cases.

## Contributing

For substantial changes, open an issue first to discuss the intended behavior and scope. Keep contributions focused and update relevant product or page-flow documentation when behavior changes.

## License

No license is currently declared at the repository root. Until a license is added, the code should not be assumed to be available for reuse, modification, or redistribution under an open-source license.
