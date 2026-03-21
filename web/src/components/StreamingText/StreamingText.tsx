import { cn } from 'src/lib/utils'

interface StreamingTextProps {
  text: string
  isStreaming: boolean
  className?: string
}

const StreamingText = ({ text, isStreaming, className }: StreamingTextProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
        {text}
        {isStreaming && (
          <span className="inline-block w-2 h-4 ml-0.5 bg-primary animate-blink align-middle" />
        )}
      </div>
    </div>
  )
}

export default StreamingText
