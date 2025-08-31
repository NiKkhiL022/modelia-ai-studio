<div align="center">

# Modelia AI Studio

AI image generation playground (mock backend) built with React, TypeScript, Vite & TailwindCSS.

</div>

## 1. Quick Start (TL;DR)

```bash
git clone https://github.com/your-org/modelia-ai-studio.git
cd modelia-ai-studio
npm install
npm run dev
```

Visit: http://localhost:5173

## 2. What This Project Does

Provides an end‑to‑end UX for generating AI‑styled images using a fully client‑side mocked API. Core capabilities:

- Image upload with validation (PNG/JPG ≤ 10MB) & client‑side downscale to reduce memory
- Prompt + style selection (several curated style presets)
- Generation flow with: simulated latency (≈1.5s), 20% random failure, automatic retries (1s, 2s, 4s) & Abort support
- Local history (last 5 successful generations) persisted to `localStorage`
- Accessible live status region, focus rings, keyboard friendly controls
- Responsive layout + mobile menu
- Documentation pages (README + Project Architecture) rendered inside the app

All “AI” output is mocked for fast iteration without infra complexity.

## 3. Core Dependencies

Runtime / Build:

- react / react-dom
- typescript (strict) + vite
- tailwindcss + autoprefixer + postcss
- lucide-react (icons)
- react-router-dom (routing)
- react-markdown + rehype-prism / remark-gfm (README rendering & syntax highlight)

Tooling & Quality:

- eslint (flat config) + @typescript-eslint
- prettier
- vitest + @testing-library/react + jsdom (unit tests)

## 4. Detailed Setup

1. Clone repository

```bash
git clone https://github.com/your-org/modelia-ai-studio.git
cd modelia-ai-studio
```

2. Install dependencies (Node 18+ recommended)

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open browser: http://localhost:5173
5. Run lint & tests (optional)

```bash
npm run lint
npm test
```

6. Create production build

```bash
npm run build
npm run preview   # serve the dist bundle locally
```

## 5. Scripts Reference

| Script    | Description                                        |
| --------- | -------------------------------------------------- |
| `dev`     | Launch Vite dev server with fast HMR               |
| `build`   | Type-check then create production bundle (`dist/`) |
| `preview` | Serve built assets to validate prod bundle         |
| `lint`    | Run ESLint (type-aware)                            |
| `test`    | Run Vitest test suite                              |

## 6. Folder Structure (High-Level)

```
src/
  components/        Reusable UI & feature components
  hooks/             Custom hooks (generation logic)
  routes/            Page-level route components
  services/          Mock API + localStorage helpers
  utils/             Image utilities (validation, downscale)
  types.ts           Shared type definitions
  App.tsx            Main composition root
```

## 7. Generation Flow (How It Works)

1. User uploads image → `ImageUpload` validates type & size, creates preview & optionally downsizes via canvas.
2. User enters prompt + chooses style → stored in `App` state and previewed in `LiveSummary`.
3. Clicking Generate → `useGeneration.generate()` called with `{ imageDataUrl, prompt, style }`.
4. `mockApi.generateImage()` simulates latency (timeout ~1500ms) and 20% random failure.
5. On failure: hook retries automatically with exponential backoff (1s → 2s → 4s). Abort cancels via `AbortController`.
6. On success: result (image URL + metadata) saved through `saveGeneration()` to `localStorage` (maintains max 5 entries) and displayed in `GeneratedResult`.
7. `GenerationHistory` reads history; selecting an item rehydrates state for quick tweaks.
8. Accessibility: An off-screen live region announces status (generating / error / complete). Buttons have focus outlines; labels connect to inputs.

## 8. Why This Architecture

- Separation of concerns: UI components remain thin; retry/abort logic isolated in `useGeneration` for testability.
- Mock-first: Enables rapid product iteration without real backend cost; later swap `mockApi` with real endpoint keeping hook contract stable.
- Local persistence: `localStorage` offers zero-config history while avoiding external DB.
- Progressive enhancement: Image downscale shrinks payload early, improving perceived speed and reducing memory.
- Strict TypeScript + ESLint: Catches mistakes early, enforces consistent style, and reduces runtime surprises.
- Single responsibility directories: Simplifies onboarding and change isolation.

## 9. Custom Hook Contract (`useGeneration`)

Inputs: `GenerationRequest { imageDataUrl: string; prompt: string; style: string }`
Outputs:

- `isGenerating` (boolean)
- `error` (string | null)
- `retryCount` (current attempt index; 1..3 while active)
- `generate(request)` returns `GenerationResponse | null`
- `abort()` stops in-flight attempt (no retry)

Edge Cases Handled:

- Abort during delay or between retries
- Max retries reached → final error surfaced
- Cleanup of abort controller after success/failure

## 10. Styling & Theming

- Tailwind utility-first approach with a small custom gradient + float animation.
- Reusable "modelia-card" class (see `index.css`) for consistent surface styling.

## 11. Testing (Lightweight)

- Vitest + React Testing Library for component behavior.
- Example smoke test ensures app mounts without runtime errors.
- Future: add hook unit tests (retry logic) & visual tests.

## 12. Accessibility Considerations

- Live region for generation status.
- Focus outlines, semantic headings, labeled inputs.
- Color contrast maintained for text over gradient backgrounds.

## 13. Environment / Browser Support

- Developed against modern Chromium-based + Firefox browsers.
- Node 18+ for dev environment. No server runtime required.

## 14. Deployment

Any static host works:

```bash
npm run build
# upload dist/ to Netlify, Vercel, GitHub Pages, etc.
```

## 15. Extending / Next Ideas

- Replace mock API with real backend (swap implementation in `services/mockApi.ts`).
- Add user auth + per-user history.
- Background removal or style transfer preprocessing.
- Drag & drop + paste-from-clipboard for images.
- Dark mode toggle.

## 16. License

MIT (add a LICENSE file before public release if needed).

---

Made with a mock-first mindset for rapid iteration.
