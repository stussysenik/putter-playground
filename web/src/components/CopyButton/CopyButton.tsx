import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
}

const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8 text-muted-foreground hover:text-foreground', className)}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}

export default CopyButton
