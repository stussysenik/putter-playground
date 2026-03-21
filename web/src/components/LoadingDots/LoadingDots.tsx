import { cn } from 'src/lib/utils'

interface LoadingDotsProps {
  className?: string
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-primary animate-pulse-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default LoadingDots
