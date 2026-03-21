import { useState, useCallback, useRef, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const PromptInput = ({
  onSubmit,
  placeholder = 'Describe what you want to build...',
  disabled = false,
  className,
}: PromptInputProps) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue('')
  }, [value, disabled, onSubmit])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  return (
    <div className={cn('relative', className)}>
      <div className="relative rounded-xl border bg-card transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className="w-full resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 font-mono"
        />
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {navigator.platform?.includes('Mac') ? '\u2318' : 'Ctrl'}+Enter to send
          </span>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="gap-2"
          >
            <Send className="h-3.5 w-3.5" />
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PromptInput
