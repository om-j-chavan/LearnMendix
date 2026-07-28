# 🎓 LearnMendix

An interactive, gamified web app for learning the **Mendix certification path** — Rapid, Intermediate, Advanced and Expert — in one place. Every concept is explained **twice**: once technically and once in plain English. Earn XP, keep a daily streak, pass quizzes and collect badges as you level up.

> A personal study companion. Not affiliated with Mendix or Siemens. Content is aligned with [docs.mendix.com](https://docs.mendix.com) but always verify against the official documentation.

---

## ✨ Features

- **4 certification tracks** → modules → lessons → end-of-module quizzes.
- **Dual explanations** on every lesson: **🎓 In depth** (technical) + **💡 In plain English** (analogy), plus *Try it in Studio Pro* tips and key terms.
- **Smart-mix depth** — full tutorial-style lessons for hard topics, tight revision cards for the basics.
- **Gamification**: XP + levels with rank titles, a 🔥 daily streak, 15 unlockable **badges**, level-up and badge celebration modals, and confetti on a quiz pass.
- **Quizzes**: one question at a time with instant feedback and explanations; 75% to pass (the real Intermediate exam bar), which unlocks the next module.
- **Accounts & multi-tenant isolation** — sign up / log in (SHA-256 hashed passwords, min 1 character). Each account's XP, streak, badges and quiz scores live in an isolated, per-user `localStorage` namespace, so data never leaks between accounts in the same browser.
- **Mendix Learning Paths catalog** — a browsable map of the real Mendix Academy taxonomy (5 skill levels, every learning path, with module lists) that links out to the official Academy content. Path/module titles are factual structure; descriptions and lessons here are original.
- **Timed mock exam** — a full simulation of the real Intermediate exam: **50 questions, a 90-minute countdown, 75% to pass**, weighted by the real module blueprint, with a **mix of single-answer and multi-select ("select all that apply")** questions, a question navigator, flag-for-review, auto-submit on timeout, and a per-module results breakdown. Questions are **original practice items that mirror the exam** — not the confidential real ones — reshuffled every attempt from a large pool.
- **Progress is saved locally** in your browser (`localStorage`) — no server, fully offline after first load.
- **Neon / gamer UI** with animated background, glow effects, smooth page transitions and optional sound effects.

### Content status (Phase 1)
| Track | Status |
|-------|--------|
| 🚀 Rapid Developer | ✅ Full — 6 modules + **Rapid Revision**, lessons + quizzes |
| 🎯 Intermediate Developer | ✅ Full — 8 modules (exam blueprint) + **Intermediate Revision (Exam Prep)** |
| 🧠 Advanced Developer | ✅ Full — 6 modules (integration, Java, workflows, performance, security, CI/CD) + **Advanced Revision** |
| 👑 Expert Developer | 🔓 Preview — module outlines (full content in Phase 3) |

Every fully-authored stage ends with a **Revision** module — **always unlocked** (jump in any time) with a **randomly generated** mixed quiz that draws fresh questions and shuffles answer positions on every attempt, so you can self-test repeatedly before the real exam.

---

## 🛠️ Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (custom neon theme)
- **Framer Motion** (animations) · **canvas-confetti** (celebrations)
- **Zustand** (+ `persist`) for progress/streak state
- **React Router** (HashRouter) · **lucide-react** icons

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to <http://localhost:5180>).

```bash
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build
```

---

## 🗂️ Project structure

```
src/
  data/courses.ts        # all course content (levels → modules → lessons → quizzes)
  types.ts               # shared TypeScript types
  lib/
    gamification.ts      # XP, levels, streak, badge definitions & evaluation
    selectors.ts         # unlock/progress helpers
    sound.ts             # tiny WebAudio SFX
    fx.ts                # confetti helpers
    ui.ts                # accent colours / glow helpers
    useCelebrate.ts      # turns an action result into on-screen celebrations
  store/
    useProgress.ts       # persisted progress store (Zustand)
    useFx.ts             # ephemeral celebration/toast store
  components/            # AppShell, TopBar, XPBar, StreakFlame, ProgressRing, modals…
  pages/                 # Dashboard, Track, Module, Lesson, Quiz, Achievements
```

### Adding / editing content
All lessons and quizzes live in [`src/data/courses.ts`](src/data/courses.ts). Each lesson has a `tech` (technical) and `simple` (plain-English) HTML string; each quiz question lists `options` and the `correct` index. Add a lesson or a question and it appears automatically — progress, XP and badges adapt.

---

## 🔒 Privacy
Everything runs client-side. Your progress never leaves your browser. Use the ↺ button in the header to reset all progress.

---

_Built as a study aid for the Mendix certification journey. Roadmap: flesh out Advanced (Phase 2) and Expert (Phase 3), add a timed mock-exam mode and a spaced-repetition review deck._
