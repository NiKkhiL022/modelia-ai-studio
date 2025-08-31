import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const ReadmePage: React.FC = () => {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/README.md')
      .then(r => r.text())
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => {
        setContent('Failed to load README')
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold modelia-gradient-text">Project README</h1>
        <p className="text-gray-500 mt-2">Live copy rendered from repository root.</p>
      </div>
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-modelia-100 rounded w-1/2" />
          <div className="h-4 bg-modelia-100 rounded w-2/3" />
          <div className="h-4 bg-modelia-100 rounded w-full" />
          <div className="h-4 bg-modelia-100 rounded w-5/6" />
        </div>
      )}
      {!loading && (
        <article className="prose prose-indigo max-w-none">
          <ReactMarkdown
            components={{
              code({
                inline,
                className,
                children,
                ...props
              }: {
                inline?: boolean
                className?: string
                children: React.ReactNode
              }) {
                const languageClass = className ?? ''
                const match = /language-(\w+)/.exec(languageClass)
                if (!inline && match) {
                  const theme: Record<string, unknown> = vscDarkPlus as Record<
                    string,
                    unknown
                  >
                  const codeText = Array.isArray(children)
                    ? children.map(c => (typeof c === 'string' ? c : '')).join('')
                    : typeof children === 'string'
                      ? children
                      : ''
                  return (
                    <SyntaxHighlighter
                      style={theme}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ borderRadius: '0.75rem', fontSize: '0.85rem' }}
                      {...props}
                    >
                      {codeText.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  )
                }
                return (
                  <code className={languageClass} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  )
}

export default ReadmePage
