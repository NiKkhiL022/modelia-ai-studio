import React from 'react'
import { ArrowLeft } from 'lucide-react'

// Reusable styled section similar to Architecture page
const Section: React.FC<
  React.PropsWithChildren<{ id: string; title: string; desc?: string }>
> = ({ id, title, desc, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-7 w-1 rounded bg-modelia-gradient" />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    {desc && <p className="text-gray-600 leading-relaxed mb-4 font-medium">{desc}</p>}
    <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">{children}</div>
  </section>
)

// Styled inline code block component
const CodeBlock: React.FC<{ code: string; lang?: string }> = ({ code, lang }) => (
  <pre className="relative group rounded-xl bg-[#0f172a] text-slate-100 p-4 text-sm overflow-auto shadow-inner ring-1 ring-slate-800/50">
    {lang && (
      <span className="absolute top-2 right-3 text-[10px] font-semibold tracking-wide text-slate-400">
        {lang}
      </span>
    )}
    <code className="font-mono whitespace-pre">{code.trim()}</code>
  </pre>
)

const ReadmePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-14 px-5">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => {
              if (window.history.length > 1) window.history.back()
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:text-modelia-600 hover:border-modelia-300 focus:outline-none focus:ring-2 focus:ring-modelia-500 shadow-sm transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight modelia-gradient-text mb-6">
          Project Guide
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          A concise but detailed handbook for working with the Modelia AI Studio codebase
          — from cloning to extending the generation workflow.
        </p>
      </header>

      {/* Table of Contents */}
      <nav aria-label="Table of contents" className="mb-14">
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            ['quick-start', 'Quick Start'],
            ['capabilities', 'Capabilities'],
            ['deps', 'Dependencies'],
            ['setup', 'Setup'],
            ['structure', 'Structure'],
            ['flow', 'Generation Flow'],
            ['hook', 'Hook Contract'],
            ['styling', 'Styling'],
            ['testing', 'Testing'],
            ['accessibility', 'Accessibility'],
            ['deploy', 'Deployment'],
            ['extend', 'Extending'],
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
        <Section id="quick-start" title="Quick Start" desc="Clone, install, run.">
          <CodeBlock
            lang="bash"
            code={`git clone https://github.com/your-org/modelia-ai-studio.git
cd modelia-ai-studio
npm install
npm run dev`}
          />
          <p>
            Open <code>http://localhost:5173</code>. You're running a fully client-side
            mock AI studio.
          </p>
        </Section>

        <Section
          id="capabilities"
          title="Core Capabilities"
          desc="What the app delivers."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Image upload with validation & size-aware downscaling.</li>
            <li>Prompt + style selection with live textual preview.</li>
            <li>Mock generation (1.5s avg latency + 20% failure simulation).</li>
            <li>Automatic retries (1s → 2s → 4s) with user-controlled abort.</li>
            <li>
              Bounded local history (last 5) persisted in <code>localStorage</code>.
            </li>
            <li>Accessible status announcements & keyboard-friendly controls.</li>
            <li>Responsive layout + mobile navigation overlay.</li>
          </ul>
        </Section>

        <Section id="deps" title="Dependencies" desc="Runtime & tooling stack.">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Runtime
              </h3>
              <ul className="text-sm list-disc ml-5 space-y-1 marker:text-modelia-500">
                <li>React 19 + React DOM</li>
                <li>Vite (dev + build)</li>
                <li>TypeScript (strict)</li>
                <li>TailwindCSS + PostCSS + Autoprefixer</li>
                <li>lucide-react (icons)</li>
                <li>react-router-dom</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-modelia-600 mb-2 uppercase">
                Tooling
              </h3>
              <ul className="text-sm list-disc ml-5 space-y-1 marker:text-modelia-500">
                <li>ESLint flat config + @typescript-eslint</li>
                <li>Prettier (format integration)</li>
                <li>Vitest + React Testing Library + jsdom</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="setup" title="Detailed Setup" desc="End-to-end local workflow.">
          <ol className="list-decimal ml-5 space-y-2 marker:text-modelia-500">
            <li>Clone repository & install dependencies.</li>
            <li>
              Run <code>npm run dev</code> and open the local URL.
            </li>
            <li>
              Edit any file under <code>src/</code>; HMR updates instantly.
            </li>
            <li>
              Run <code>npm run lint</code> or <code>npm test</code> as needed.
            </li>
            <li>
              Create a production bundle with <code>npm run build</code>.
            </li>
            <li>
              Preview production output using <code>npm run preview</code>.
            </li>
          </ol>
        </Section>

        <Section id="structure" title="Folder Structure" desc="High-level layout.">
          <CodeBlock
            lang="text"
            code={`src/
  components/        UI & feature components
  hooks/             Custom hooks (generation logic)
  routes/            Route-level pages (home, guide, architecture)
  services/          Mock API + localStorage helpers
  utils/             Image utilities (validation, downscale)
  types.ts           Shared type contracts
  App.tsx            Composition root`}
          />
        </Section>

        <Section
          id="flow"
          title="Generation Flow"
          desc="Lifecycle of a generation request."
        >
          <ol className="list-decimal ml-5 space-y-2 marker:text-modelia-500">
            <li>User selects image → validated (type/size) & preview generated.</li>
            <li>Optional canvas downscale reduces memory & upload payload.</li>
            <li>Prompt + style captured in local component state.</li>
            <li>User triggers generation; hook constructs a request object.</li>
            <li>Mock API: delay (~1500ms) + random failure (20%).</li>
            <li>On failure: exponential retry (1s, 2s, 4s) unless aborted.</li>
            <li>On success: result persisted (queue max 5) and shown to user.</li>
            <li>User may revisit history entry to rehydrate context.</li>
          </ol>
        </Section>

        <Section id="hook" title="Hook Contract" desc="Interface of useGeneration.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>
              <code>isGenerating</code>: boolean flag for active request.
            </li>
            <li>
              <code>error</code>: final error after retries (or null).
            </li>
            <li>
              <code>retryCount</code>: current attempt (1..3 while active).
            </li>
            <li>
              <code>generate(request)</code>: performs generation + retry orchestration.
            </li>
            <li>
              <code>abort()</code>: cancels in-flight attempt & halts retries.
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Edge cases: abort between retries, final attempt failure, rapid successive
            trigger avoidance via isGenerating gate.
          </p>
        </Section>

        <Section id="styling" title="Styling & Theming" desc="Utility-first design.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Tailwind utilities compose layout + color quickly.</li>
            <li>Custom gradient + subtle float animation for brand flair.</li>
            <li>
              Reusable <code>modelia-card</code> surface class standardizes panels.
            </li>
            <li>Consistent spacing scale maintains visual rhythm.</li>
          </ul>
        </Section>

        <Section id="testing" title="Testing" desc="Light but meaningful coverage.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Smoke tests ensure mount stability.</li>
            <li>Potential additions: hook logic unit tests (retry branching).</li>
            <li>Future: visual regression & accessibility snapshots.</li>
          </ul>
        </Section>

        <Section
          id="accessibility"
          title="Accessibility"
          desc="Core inclusive practices."
        >
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>ARIA live region for async status updates.</li>
            <li>Focus-visible outlines retained; no reset suppression.</li>
            <li>Semantic HTML structure (headings / lists) for screen readers.</li>
            <li>Color contrast aligned with WCAG for text on light backgrounds.</li>
          </ul>
        </Section>

        <Section id="deploy" title="Deployment" desc="Static hosting simplicity.">
          <CodeBlock
            lang="bash"
            code={`npm run build
# upload dist/ to Netlify / Vercel / GitHub Pages`}
          />
          <p className="text-sm text-gray-500 mt-2">
            No server required; all logic is client-only. Add real endpoints later by
            swapping the mock service.
          </p>
        </Section>

        <Section id="extend" title="Extending" desc="Next evolution ideas.">
          <ul className="list-disc ml-5 space-y-2 marker:text-modelia-500">
            <li>Integrate real inference API + authentication.</li>
            <li>Streaming partial updates (progressive render) if backend supports.</li>
            <li>Drag & drop and clipboard paste for images.</li>
            <li>Dark mode & theming tokens.</li>
            <li>Web Worker for CPU-intensive preprocessing.</li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

export default ReadmePage
