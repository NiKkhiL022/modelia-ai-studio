import React from 'react'
import { ArrowLeft } from 'lucide-react'

// Small presentational helper for consistent section framing
const Section: React.FC<
  React.PropsWithChildren<{ id: string; title: string; desc?: string }>
> = ({ id, title, desc, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-7 w-1 rounded bg-modelia-gradient" />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    {desc && <p className="text-gray-600 leading-relaxed mb-4 font-medium">{desc}</p>}
    <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">{children}</div>
  </section>
)

const ArchitecturePage: React.FC = () => {
  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
  }
  return (
    <div className="max-w-5xl mx-auto py-14 px-5">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:text-modelia-600 hover:border-modelia-300 focus:outline-none focus:ring-2 focus:ring-modelia-500 shadow-sm transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight modelia-gradient-text mb-6">
          Project Architecture
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          A detailed, implementation-focused breakdown of how the application is built,
          why each choice was made, and how data flows from user action to a generated
          result.
        </p>
      </header>

      {/* Table of Contents */}
      <nav aria-label="Table of contents" className="mb-14">
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            ['overview', 'Overview'],
            ['layers', 'Layers'],
            ['flow', 'Flow'],
            ['error-retry', 'Error & Retry'],
            ['state', 'State'],
            ['performance', 'Performance'],
            ['accessibility', 'Accessibility'],
            ['approach', 'Why'],
            ['future', 'Future'],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-block rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-600 hover:text-modelia-600 hover:border-modelia-300 transition-colors shadow-sm"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-20">
        <Section
          id="overview"
          title="High‑Level Overview"
          desc="Foundational stack and execution model."
        >
          <p>
            The app is a <strong>pure client‑side</strong> React + TypeScript experience
            bootstrapped with Vite for instant HMR and lean bundling. TailwindCSS provides
            consistent design primitives. All AI calls are <strong>mocked locally</strong>
            — enabling rapid UX iteration with deterministic contracts before any real
            backend investment.
          </p>
        </Section>

        <Section
          id="layers"
          title="Key Layers & Responsibilities"
          desc="Directory responsibilities and rationale."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                UI Components
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">components/</code> holds presentational &
                lightly stateful parts (upload, selectors, buttons, result card, history)
                leaning on props for clarity.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Hooks
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">hooks/</code> centralizes behavior. The
                dedicated <code>useGeneration</code> hook isolates retry + abort logic so
                UI stays declarative.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Services
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">services/</code> acts as the boundary for
                side effects: mock API delay/error simulation & localStorage persistence.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Utilities
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">utils/</code> provides pure helpers (image
                validation & canvas downscale) to keep concerns isolated.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm md:col-span-2">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Routes & Types
              </h3>
              <p className="text-sm leading-relaxed">
                <code className="font-semibold">routes/</code> defines page frames (home,
                docs) while <code className="font-semibold">types.ts</code> locks API
                contracts. Clean boundaries simplify future migration to a real endpoint.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="flow"
          title="User Interaction Flow"
          desc="Chronological path from input to persisted generation."
        >
          <ol className="list-decimal ml-5 space-y-2 marker:text-modelia-500">
            <li>
              Upload → <code>ImageUpload</code> validates (type/size) & emits an
              <code> UploadedImage</code> (dataURL + meta).
            </li>
            <li>Canvas downscale (if needed) reduces memory + future network weight.</li>
            <li>
              Prompt + style stored as controlled state in <code>App</code>.
            </li>
            <li>
              <code>LiveSummary</code> previews combined intent (immediate correctness
              feedback).
            </li>
            <li>
              Generate → <code>useGeneration.generate()</code> called with request object.
            </li>
            <li>
              Mock service delays ~1.5s, 20% probability failure; errors trigger retry.
            </li>
            <li>Retries: 1s → 2s → 4s (max 3 attempts) unless aborted.</li>
            <li>
              Success: response persisted (FIFO capped at 5) via localStorage helper.
            </li>
            <li>
              History refresh counter causes <code>GenerationHistory</code> to re-read and
              re-render.
            </li>
            <li>User can restore prior prompt/style by selecting a history item.</li>
            <li>Abort cancels controller, halts chain, resets flags.</li>
          </ol>
        </Section>

        <Section
          id="error-retry"
          title="Error & Retry Strategy"
          desc="Contained resilience without polluting presentation."
        >
          <p>
            Centralizing retry logic in the hook prevents scattered timers and duplicated
            state. The hook records the current attempt, computes a power-of-two delay,
            and re-invokes the mock API unless aborted. Abort checks before scheduling the
            next attempt guarantee prompt cancellation response. After max attempts the
            surfaced error enables a user-driven retry.
          </p>
        </Section>

        <Section
          id="state"
          title="State Management Rationale"
          desc="Why local state & custom hooks were chosen."
        >
          <p>
            The scope is narrow; introducing global stores (Redux/Zustand) would add
            ceremony without benefit. Local component state keeps mental mapping simple.
            The heavy async path (generation) lives in a hook so that behavior is
            testable, reusable, and swappable when a real HTTP API arrives.
          </p>
        </Section>

        <Section
          id="performance"
          title="Performance Considerations"
          desc="Pragmatic optimizations applied early."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Image downscaling trims memory + improves preview render speed.</li>
            <li>No global polling or intervals; only on-demand async work.</li>
            <li>Lean dependency set keeps bundle small.</li>
            <li>Tailwind JIT purges unreachable classes at build time.</li>
          </ul>
        </Section>

        <Section
          id="accessibility"
          title="Accessibility"
          desc="Inclusive defaults baked in."
        >
          <p>
            Live region announces generating / error / complete states. All clickable
            elements are keyboard reachable with visible focus outlines. Semantic HTML and
            aria labels are used where necessary. Color selections target WCAG contrast on
            light backgrounds.
          </p>
        </Section>

        <Section id="approach" title="Why This Approach" desc="Guiding principles.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Mock-first: iterate UI swiftly before backend coupling.</li>
            <li>Encapsulation: logic in hooks; views remain declarative.</li>
            <li>Safety: strict TypeScript + lint rules catch drift early.</li>
            <li>Clarity: flat, intention-revealing file layout.</li>
          </ul>
        </Section>

        <Section id="future" title="Future Evolution" desc="Planned enhancements.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Swap mock service for real API client + authentication.</li>
            <li>Background Web Worker for heavier transforms.</li>
            <li>Dark mode + theming tokens abstraction.</li>
            <li>Streaming or incremental partial preview (if backend supports).</li>
            <li>Optional offline cache of last successful generations.</li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

export default ArchitecturePage
