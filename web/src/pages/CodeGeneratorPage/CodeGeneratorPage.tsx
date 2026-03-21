import { Metadata } from '@redwoodjs/web'
import { RotateCcw } from 'lucide-react'

import AppShell from 'src/components/AppShell/AppShell'
import PromptInput from 'src/components/PromptInput/PromptInput'
import CodeBlock from 'src/components/CodeBlock/CodeBlock'
import StreamingText from 'src/components/StreamingText/StreamingText'
import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import { Button } from 'src/components/ui/button'
import { useAiStream } from 'src/hooks/useAiStream'

const CodeGeneratorPage = () => {
  const { output, isStreaming, error, generate, reset } = useAiStream()

  const handleGenerate = (prompt: string) => {
    generate(prompt)
  }

  return (
    <AppShell>
      <Metadata title="Code Generator" description="Generate code with AI" />

      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Code Generator</h1>
          <p className="text-sm text-muted-foreground">
            Describe what you want to build. GLM 4.7 writes the code.
          </p>
        </div>

        {/* Prompt Input */}
        <PromptInput
          onSubmit={handleGenerate}
          disabled={isStreaming}
          placeholder='e.g. "Write a binary search in Rust" or "React hook for debouncing"'
        />

        {/* Output Area */}
        {(output || isStreaming || error) && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">Output</h2>
                {isStreaming && <LoadingDots />}
              </div>
              {output && !isStreaming && (
                <Button variant="ghost" size="sm" onClick={reset} className="gap-2 text-muted-foreground">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </Button>
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
              <div className="rounded-xl border bg-card p-8 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <LoadingDots />
                  <span className="text-sm">Generating code...</span>
                </div>
              </div>
            ) : output ? (
              isStreaming ? (
                <div className="rounded-xl border bg-card overflow-hidden">
                  <div className="p-4">
                    <StreamingText text={output} isStreaming={isStreaming} />
                  </div>
                </div>
              ) : (
                <CodeBlock code={output} />
              )
            ) : null}
          </div>
        )}

        {/* Example prompts */}
        {!output && !isStreaming && (
          <div className="space-y-3 pt-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Try these</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Fibonacci sequence in Go',
                'React custom hook for localStorage',
                'Python decorator for retry logic',
                'Rust struct for a linked list',
                'SQL query to find duplicate emails',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => generate(example)}
                  className="rounded-lg border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default CodeGeneratorPage
