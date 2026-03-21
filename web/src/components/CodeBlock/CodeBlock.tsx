import { useMemo } from 'react'
import { Badge } from 'src/components/ui/badge'
import CopyButton from 'src/components/CopyButton/CopyButton'
import { cn } from 'src/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showCopy?: boolean
}

const CodeBlock = ({ code, language, className, showCopy = true }: CodeBlockProps) => {
  const detectedLanguage = useMemo(() => {
    if (language) return language
    // Try to detect from first line comment
    const firstLine = code.split('\n')[0]
    const match = firstLine?.match(/\/\/\s*language:\s*(\w+)/i)
    return match?.[1]?.toLowerCase() || 'text'
  }, [code, language])

  // Strip the language comment from display
  const displayCode = useMemo(() => {
    const lines = code.split('\n')
    if (lines[0]?.match(/\/\/\s*language:\s*\w+/i)) {
      return lines.slice(1).join('\n').trimStart()
    }
    return code
  }, [code])

  return (
    <div className={cn('relative group rounded-xl border bg-card overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <Badge variant="secondary" className="text-xs font-mono">
          {detectedLanguage}
        </Badge>
        {showCopy && <CopyButton text={displayCode} />}
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-foreground/90">{displayCode}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
