# DevOS — AI Developer Workspace

> Your intelligent workspace for everything you build.

DevOS is a premium, portfolio-quality developer SaaS frontend — an interactive workspace concept combining AI-powered coding, project intelligence, developer analytics, and learning roadmaps into a single cohesive experience.
<div align="center">

### 🚀 Live Demo

[*View DevOS Live →*](https://devos-ai-developer-workspace-k976-9clhcj7ud-study-mate-ai-team.vercel.app)

<br>

[![Live Demo](https://img.shields.io/badge/Live-Demo-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white)](https://devos-ai-developer-workspace-k976-9clhcj7ud-study-mate-ai-team.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ubaidullahzafar789-cyber)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ubaid%20Ullah-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ubaid-ullah-925094424/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ubaidullahzafar789@gmail.com)

</div>

---
## Features

- **Hero with "Developer Core"** — a lightweight canvas-based visual representing code, AI, projects, and knowledge with subtle mouse interaction.
- **Bento feature grid** — AI-Powered Coding, Project Intelligence, Developer Analytics, and Learning Roadmap with visual hierarchy.
- **AI Assistant interface** — a realistic chat UI with code suggestions, project context, and interactive input.
- **Dashboard preview** — a full workspace shell with sidebar navigation and six tabs: Overview, Projects, Snippets, AI Assistant, Roadmap, and Settings.
- **Project management** — project cards with technology tags, progress bars, status, and activity.
- **Developer analytics** — canvas-drawn activity chart, AI usage donut, project and learning progress lists (no chart libraries).
- **Interactive roadmap** — scroll-revealed milestones from Foundation to Advanced Engineering.
- **Command palette** — `Ctrl/Cmd + K` searchable interface with navigation, workspace, and action commands.
- **Theme control** — dark (default) and light mode with persisted preference.
- **Responsive** — intentional layouts for desktop, tablet, and mobile.
- **Accessible** — semantic HTML, keyboard navigation, focus states, ARIA labels, and `prefers-reduced-motion` support.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Layout | Bootstrap 5 (grid, flex, spacing utilities only) |
| Styling | Custom CSS3 with CSS variables, glassmorphism, canvas visuals |
| Logic | TypeScript (strict) compiled via Vite |
| Icons | Bootstrap Icons |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

No React, Vue, Angular, or chart libraries. Bootstrap is used for structural layout only — all visual identity is custom CSS.

## Project Structure

```
DevOS/
├── index.html              # Single-page app with all sections
├── css/
│   ├── style.css           # Variables, base, background, navbar, hero, layout
│   ├── components.css      # Buttons, cards, command palette, toast, inputs
│   └── responsive.css      # Tablet and mobile breakpoints
├── ts/
│   ├── main.ts             # Application entry — boots all modules
│   ├── types.ts            # Shared interfaces (Project, RoadmapItem, etc.)
│   ├── data.ts             # Project, activity, roadmap, snippet, analytics data
│   ├── theme.ts            # Dark/light theme controller
│   ├── scroll.ts           # IntersectionObserver scroll reveal
│   ├── hero-canvas.ts      # "Developer Core" canvas visual
│   ├── command-palette.ts  # Cmd+K searchable palette
│   ├── dashboard.ts        # Dashboard rendering, tabs, filtering
│   ├── analytics.ts        # Canvas charts (activity bar + donut)
│   ├── roadmap.ts          # Roadmap scroll-reveal rendering
│   └── ai-chat.ts          # AI assistant chat interaction
├── public/
│   └── assets/
│       ├── brand/          # DevOS mark SVG
│       ├── hero/           # (placeholder — Gemini assets go here)
│       ├── illustrations/  # (placeholder)
│       ├── 3d/             # (placeholder)
│       └── backgrounds/    # (placeholder)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Run Locally

```bash
npm install
npm run dev      # starts Vite dev server at http://localhost:5173
npm run build    # type-checks (tsc) and builds to dist/
npm run preview  # serves the production build
```

## How TypeScript Is Used

TypeScript drives all meaningful application logic with proper interfaces — `Project`, `RoadmapItem`, `CommandAction`, `ActivityItem`, `WeeklyActivity`, `AiUsageSegment`, `Snippet`. The strict compiler catches null-safety issues at build time. No `any` types are used.

## How Bootstrap Is Used

Bootstrap provides the responsive grid (`row`/`col`), containers, flexbox utilities, spacing helpers, and breakpoints. All visual identity — buttons, cards, navbar, hero, dashboard, colors, typography, animations — is custom CSS. The result does not look like default Bootstrap.

## How Animations Work

- **Scroll reveal** — `IntersectionObserver` adds a `.visible` class with staggered delays via CSS custom properties.
- **Hero canvas** — `requestAnimationFrame` loop with subtle mouse parallax; pauses entirely under reduced-motion.
- **Card hovers** — CSS transitions on `transform` and `border-color`.
- **Roadmap** — milestones slide in via IntersectionObserver + CSS transform.
- **Charts** — canvas-drawn on init and re-drawn on theme change.
- `prefers-reduced-motion` and the in-app "Reduced motion" toggle disable animations.

## Assets Organization

The `public/assets/` folders are ready for Gemini-generated assets. The hero visual is canvas-rendered by default; to use a generated image instead, place it in `assets/hero/` and set the `.hero-core-image-slot` `src` and `display` in CSS. All important text is real HTML — nothing is baked into images.

## Deployment

```bash
npm run build
# Deploy the dist/ directory to any static host (Vercel, Netlify, etc.)
```

## License

© DevOS. All rights reserved.
