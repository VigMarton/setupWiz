## Setup Wizard (Personal Windows Provisioning Wizard)

### Project overview & value proposition
**Setup Wizard** is a lightweight, browser-based setup checklist for provisioning a Windows laptop (especially refurbished machines). Instead of relying on memory, scattered notes, or ad-hoc checklists, it provides a consistent **step-by-step flow** with **explicit completion vs. skip confirmation**, a **progress sidebar**, and a **final summary** of what was done.

It’s designed to be fast to use, easy to maintain, and safe: the app does **not** attempt to automate OS changes; it provides clear instructions and verification steps so a user can confidently complete each action.

### The problem it solves
Provisioning a Windows laptop is error-prone because:
- Steps have dependencies (updates → drivers/firmware → security → apps).
- It’s easy to skip critical items accidentally (e.g., Windows Update, security hardening).
- There’s often no record of what was completed vs. skipped.

This project solves that by:
- Encoding the process as an ordered wizard with dependency-aware step order (see `project-info/overview.md`).
- Requiring an explicit choice per step: **Completed** or **Skip with acknowledgment**.
- Persisting progress locally so the workflow survives refresh/reopen.
- Producing a completion summary that acts as a lightweight audit log for the session.

### Target users
- **Individual power users** setting up personal laptops.
- **Hobby refurbishers** preparing machines for themselves or family members.
- **Technicians** who want a repeatable flow and a clear “done vs skipped” view.

This is intentionally **personal-use oriented**: no multi-user accounts, no backend, no legal/commercial framing.

---

### Key features (implementation-specific)

#### Data-driven step system (18-step wizard)
- The wizard steps are defined as **data**, not hardcoded pages.
- Each step includes: title, short description, “why it matters”, skip rules, estimated time, warnings, and detailed instructions.
- Step definitions live in `src/data/steps.ts` as a typed array (`Step[]`), making it straightforward to add/reorder/modify steps without touching UI logic.

#### Completion vs. Skip gating (with explicit confirmation)
Each step requires one of:
- **“I have completed this step”**, or
- **“I want to skip this step” + “I understand the risks…”**

For required steps (e.g., Windows Update, Final Health Check, Completion Summary), skip is disabled at the data layer using `skipAllowed: false`.

This “gated next” behavior is implemented in `src/steps/StepScreen.tsx` by computing `canProceed` and disabling the Next button until the rules are satisfied.

#### Persistent progress + resumability
Wizard progress persists to `localStorage`:
- Current step index
- Per-step status: `not_started | completed | skipped`
- Skip reasons (stored and shown in the final summary)

The persistence layer is intentionally simple and local-only (no backend) and is implemented in `src/App.tsx`.

#### Sidebar navigation + status icons
The left sidebar lists every step and its current status with a quick visual marker:
- ⭕ not started
- 🟡 skipped
- 🟢 completed

Users can click any step to jump directly (optimized for personal/technician flows).
Implementation: `src/components/StepSidebar.tsx`.

#### Collapsible “Detailed Instructions”
Each step includes a collapsible “Detailed Instructions” section:
- Collapsed by default.
- Resets to collapsed when switching steps (prevents “leaking” UI state between steps).

The instructions are rendered as plain text with `white-space: pre-line` and a scrollable container to support long step content (see styling in `src/App.css`).

#### Final Completion Summary
The last step summarizes the entire run:
- Completed vs skipped counts
- Per-step status list
- Skip reasons and “skip when” notes where applicable

Implementation: `src/components/SummaryStep.tsx`.

#### Reliable “scroll to top” on navigation
Long instruction steps can be scrolled; when moving to another step the view is reset to the top to avoid confusing context carry-over.
This is implemented defensively with multiple scroll attempts (immediate + delayed) targeting both:
- the scrollable `.main-content` container, and
- `window` scroll as a fallback

Locations: `src/App.tsx`, `src/steps/StepScreen.tsx`, and `src/components/SummaryStep.tsx`.

---

### Tech stack
- **React 18 + TypeScript**: component-driven UI, typed step model, safer refactors.
- **Vite**: fast dev server + optimized production build.
- **CSS (handwritten)**: lightweight styling without a UI framework.
- **Vercel**: static deployment with SPA rewrites.

Build config:
- `package.json` uses `tsc && vite build` for production output.
- `vite.config.ts` sets `base: '/'` for root-hosted deployments (Vercel).

---

### Architecture & data flow

#### High-level architecture
- **Single-page app (SPA)** with a single “active step” view.
- Steps are **pure data**; UI components render that data.
- App state is stored in React state and persisted to `localStorage`.

#### Data flow (at runtime)
- `src/data/steps.ts` exports `steps: Step[]`.
- `src/App.tsx` owns:
  - `currentStepIndex`
  - `stepStatuses[]`
  - `skipReasons` map
- `StepSidebar` renders the list and sets `currentStepIndex` on click.
- `StepScreen` renders the selected step and enforces “Completed”/“Skip+Confirm” gating.
- `SummaryStep` renders the final report using the same state.

#### Why this architecture?
- It avoids over-engineering (no router, no backend, no database).
- It’s easy to maintain: updating step content doesn’t require UI changes.
- It’s resilient: progress can be resumed after refresh or accidental tab close.

---

### System design highlights & key technical decisions

#### 1) “No automation” by design
This project intentionally avoids running scripts or modifying system settings automatically. Instead, it focuses on:
- correctness of instructions
- verification steps
- repeatable flow

This makes the project safer for personal provisioning and avoids brittle OS-specific automation.

#### 2) Skip logic is explicit and auditable
Skipping is allowed only when `skipAllowed` is true, and requires an explicit acknowledgment checkbox.
Skipped steps are recorded and surfaced in the final summary, which prevents silent omissions.

#### 3) UI state isolation per step
Checkbox states and instruction expansion reset when the step changes. This prevents a common wizard bug where the “Completed” state visually carries over to the next step even though the underlying status is different.

#### 4) Scroll restoration handled at the app layer
Because the scrollable region is the `.main-content` container (not the document body), scroll-to-top must target the correct element. The implementation uses:
- container scroll reset
- window scroll fallback
- delayed retries to handle render timing

#### 5) Deployment-ready SPA routing on Vercel
Even though this app doesn’t currently use URL routing, it’s deployed as an SPA and includes a rewrite rule so direct URL navigation won’t 404.
Config: `vercel.json` rewrites `/(.*)` → `/index.html`.

---

### Folder structure & code organization

#### `project-info/`
- `overview.md`: the design blueprint: step philosophy, order, UX rules.
- `portfolio-documentation.md`: this document.

#### `src/data/`
- `steps.ts`: typed step model (`Step`, `StepStatus`) and the full step definitions.

#### `src/components/`
- `StepSidebar.tsx`: sidebar list + status icons + step selection.
- `SummaryStep.tsx`: final summary report.

#### `src/steps/`
- `StepScreen.tsx`: the step UI shell (header, expandable instructions, completion/skip gating).

#### Root config
- `vite.config.ts`: Vite config (notably `base` for hosting).
- `vercel.json`: Vercel build/output settings and SPA rewrite.
- `package.json`: scripts and dependencies.

---

### Notable technical challenges (and how they were solved)

#### Step UI state incorrectly persisted across navigation
**Problem**: “Completed” could appear toggled when moving to a new step due to component state reuse.
**Solution**: On step change (`step.id`, `status`), explicitly reset local UI state (completion/skip/confirmation and instruction expansion). Implementation: `useEffect` in `src/steps/StepScreen.tsx`.

#### Scroll position carried over between steps
**Problem**: Long pages scrolled mid-way would stay scrolled after navigating, confusing the user.
**Solution**: Reset scroll position on every step change for the correct scroll container (`.main-content`) with fallback and delayed retries. Implemented in `src/App.tsx`, `src/steps/StepScreen.tsx`, and `src/components/SummaryStep.tsx`.

#### Deployment base path differences (GitHub Pages vs Vercel)
**Problem**: GitHub Pages often requires a repo subpath base (e.g., `/setupWiz/`) while Vercel is typically root (`/`).
**Solution**: Set Vercel-friendly base (`/`) in `vite.config.ts` and document the change required for GitHub Pages in README.

---

### What this project demonstrates (skills & strengths)

#### Product thinking + UX discipline
- Designed a flow that reflects real provisioning dependencies.
- Added explicit skip confirmation to prevent silent failure modes.
- Included a summary view that acts as a confidence/audit report.

#### Frontend engineering fundamentals
- Clean, typed data model (`Step`, `StepStatus`).
- State management and persistence with predictable data flow.
- Component decomposition: sidebar, step screen, summary view.

#### Robust UI behavior and edge-case handling
- Scroll restoration in the correct container (common SPA pitfall).
- UI state reset to prevent accidental carry-over between steps.
- Long-form content rendering and readability considerations (scrollable instructions panel, `pre-line` formatting).

#### Deployment and real-world readiness
- Vercel-ready configuration (`vercel.json`, correct output dir, SPA rewrites).
- Vite build pipeline and static hosting considerations.

---

### Quick start (for reviewers)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`


