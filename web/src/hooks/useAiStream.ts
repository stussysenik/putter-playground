import { useState, useCallback, useRef } from 'react'
import { useMutation } from '@redwoodjs/web'
import { useSubscription } from '@apollo/client'

const GENERATE_CODE = gql`
  mutation GenerateCode($prompt: String!, $language: String) {
    generateCode(prompt: $prompt, language: $language) {
      id
    }
  }
`

const EXPLAIN_CODE = gql`
  mutation ExplainCode($code: String!, $language: String) {
    explainCode(code: $code, language: $language) {
      id
    }
  }
`

const AI_STREAM_SUBSCRIPTION = gql`
  subscription AiStream($id: String!) {
    aiStream(id: $id) {
      id
      content
      done
    }
  }
`

interface UseAiStreamReturn {
  output: string
  isStreaming: boolean
  error: string | null
  generate: (prompt: string, language?: string) => void
  explain: (code: string, language?: string) => void
  reset: () => void
}

export function useAiStream(): UseAiStreamReturn {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [output, setOutput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const outputRef = useRef('')

  const [generateCodeMutation] = useMutation(GENERATE_CODE)
  const [explainCodeMutation] = useMutation(EXPLAIN_CODE)

  // Subscribe to the AI stream when we have a session ID
  useSubscription(AI_STREAM_SUBSCRIPTION, {
    variables: { id: sessionId },
    skip: !sessionId,
    onData: ({ data }) => {
      const chunk = data?.data?.aiStream
      if (!chunk) return

      if (chunk.done) {
        setIsStreaming(false)
        setSessionId(null)
      } else if (chunk.content) {
        // Check if it's an error message
        if (chunk.content.startsWith('Error: ')) {
          setError(chunk.content)
          setIsStreaming(false)
          setSessionId(null)
        } else {
          outputRef.current += chunk.content
          setOutput(outputRef.current)
        }
      }
    },
    onError: (err) => {
      setError(err.message)
      setIsStreaming(false)
      setSessionId(null)
    },
  })

  const generate = useCallback(
    async (prompt: string, language?: string) => {
      setOutput('')
      setError(null)
      setIsStreaming(true)
      outputRef.current = ''

      try {
        const { data } = await generateCodeMutation({
          variables: { prompt, language },
        })
        setSessionId(data.generateCode.id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start generation')
        setIsStreaming(false)
      }
    },
    [generateCodeMutation]
  )

  const explain = useCallback(
    async (code: string, language?: string) => {
      setOutput('')
      setError(null)
      setIsStreaming(true)
      outputRef.current = ''

      try {
        const { data } = await explainCodeMutation({
          variables: { code, language },
        })
        setSessionId(data.explainCode.id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start explanation')
        setIsStreaming(false)
      }
    },
    [explainCodeMutation]
  )

  const reset = useCallback(() => {
    setOutput('')
    setError(null)
    setIsStreaming(false)
    setSessionId(null)
    outputRef.current = ''
  }, [])

  return { output, isStreaming, error, generate, explain, reset }
}
