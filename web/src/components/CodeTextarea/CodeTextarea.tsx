import { useState, useCallback, type KeyboardEvent } from 'react'
import { Play } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'

interface CodeTextareaProps {
  onSubmit: (code: string) => void
  disabled?: boolean
  className?: string
}

const CodeTextarea = ({ onSubmit, disabled = false, className }: CodeTextareaProps) => {
  const [value, setValue] = useState('')

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
  }, [value, disabled, onSubmit])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
      // Tab inserts spaces instead of changing focus
      if (e.key === 'Tab') {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        const start = target.selectionStart
        const end = target.selectionEnd
        const newValue = value.substring(0, start) + '  ' + value.substring(end)
        setValue(newValue)
        requestAnimationFrame(() => {
          target.selectionStart = target.selectionEnd = start + 2
        })
      }
    },
    [handleSubmit, value]
  )

  return (
    <div className={cn('flex flex-col rounded-xl border bg-card overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <span className="text-xs text-muted-foreground font-medium">Paste your code</span>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="gap-2"
        >
          <Play className="h-3.5 w-3.5" />
          Explain
        </Button>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste your code here..."
        disabled={disabled}
        rows={15}
        className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 font-mono leading-relaxed"
        spellCheck={false}
      />
      <div className="px-4 py-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          {navigator.platform?.includes('Mac') ? '\u2318' : 'Ctrl'}+Enter to explain
        </span>
      </div>
    </div>
  )
}

export default CodeTextarea
