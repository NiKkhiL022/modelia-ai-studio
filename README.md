<div align="center">

# Modelia AI Studio

React + TypeScript + Vite + TailwindCSS

</div>

## Overview

Modelia AI Studio is a (soon to be) simplified AI image generation interface. This repository currently contains the project scaffold with:

- Vite (React + TS) setup
- TailwindCSS (manual config)
- Strict TypeScript compiler options
- ESLint (type-aware, strict + stylistic) integrated with Prettier

> The functional AI studio features described in the original draft will be implemented next.

## Tech Stack

| Layer      | Choice                                                 |
| ---------- | ------------------------------------------------------ |
| Build Tool | Vite 7                                                 |
| UI Library | React 19 (RC APIs not used)                            |
| Language   | TypeScript (strict)                                    |
| Styling    | TailwindCSS                                            |
| Linting    | ESLint (typescript-eslint, react hooks, react-refresh) |
| Formatting | Prettier                                               |

## Scripts

| Command           | Purpose                       |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start dev server (Vite)       |
| `npm run build`   | Type check & production build |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint (type-aware)       |

## Tailwind Setup

Config files:

- `tailwind.config.js` – content globs for `index.html` and all source files.
- `postcss.config.js` – enables `tailwindcss` + `autoprefixer`.
- `src/index.css` – includes `@tailwind` directives and minimal base layer customizations.

### Adding a Component

```tsx
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600/15 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
      {children}
    </span>
  )
}
```

## Lint & Format

- ESLint config (`eslint.config.js`) uses `recommendedTypeChecked`, `strictTypeChecked`, and `stylisticTypeChecked` presets.
- `eslint-config-prettier` disables conflicting formatting rules.
- Prettier config: `.prettierrc.json` (no semicolons, single quotes, width 90).

Run manually:

```bash
npm run lint
```

Format (optional – we rely on editor integration):

```bash
npx prettier . --write
```

## TypeScript Strictness

Key compiler flags: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`, `verbatimModuleSyntax`.

## Next Steps (Planned Features)

1. Image upload & validation (PNG/JPG ≤ 10MB)
2. Client-side resizing worker
3. Prompt + style selection UI
4. Mocked generation API with latency + failure simulation & retry
5. Abort controller integration
6. LocalStorage history (last 5 generations)
7. Accessible components (focus states, ARIA)
8. Unit tests (React Testing Library) & optional E2E (Playwright)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## License

MIT (add a LICENSE file if distributing publicly).
