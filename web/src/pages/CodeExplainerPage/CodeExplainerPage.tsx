import { Metadata } from '@redwoodjs/web'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { RotateCcw } from 'lucide-react'

import AppShell from 'src/components/AppShell/AppShell'
import CodeTextarea from 'src/components/CodeTextarea/CodeTextarea'
import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import StreamingText from 'src/components/StreamingText/StreamingText'
import CopyButton from 'src/components/CopyButton/CopyButton'
import { Button } from 'src/components/ui/button'
import { useAiStream } from 'src/hooks/useAiStream'

const CodeExplainerPage = () => {
  const { output, isStreaming, error, explain, reset } = useAiStream()

  return (
    <AppShell>
      <Metadata title="Code Explainer" description="Explain code with AI" />

      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Code Explainer</h1>
          <p className="text-sm text-muted-foreground">
            Paste any code snippet. GLM 4.7 explains it in detail.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Code Input */}
          <div>
            <CodeTextarea onSubmit={explain} disabled={isStreaming} />
          </div>

          {/* Right: Explanation Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">Explanation</h2>
                {isStreaming && <LoadingDots />}
              </div>
              {output && !isStreaming && (
                <div className="flex items-center gap-1">
                  <CopyButton text={output} />
                  <Button variant="ghost" size="sm" onClick={reset} className="gap-2 text-muted-foreground">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {error ? (
              <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
                <p className="text-sm text-destructive">{error}</p>
                <Button variant="outline" size="sm" onClick={reset} className="mt-3">
                  Try again
                </Button>
              </div>
            ) : isStreaming && !output ? (
              <div className="rounded-xl border bg-card p-8 flex items-center justify-center min-h-[300px]">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LoadingDots />
                  <span className="text-sm">Analyzing code...</span>
                </div>
              </div>
            ) : output ? (
              <div className="rounded-xl border bg-card p-6 overflow-y-auto max-h-[600px]">
                {isStreaming ? (
                  <StreamingText text={output} isStreaming={isStreaming} />
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
                    <Markdown remarkPlugins={[remarkGfm]}>{output}</Markdown>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-card/50 p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-sm text-muted-foreground text-center">
                  Paste code on the left and click <strong>Explain</strong> to see a detailed breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default CodeExplainerPage
