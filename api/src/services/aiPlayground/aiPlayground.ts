import { randomUUID } from 'crypto'

import { logger } from 'src/lib/logger'
import { glm } from 'src/lib/glm'

import type { AiStreamChannelType } from 'src/subscriptions/aiStream/aiStream'

const CODE_GENERATOR_SYSTEM = `You are a code generator. The user will describe what they want and you output ONLY the code. Rules:
- Output raw code only, no markdown fences, no explanations
- Include a comment on line 1 with the language name, e.g. // language: python
- Write clean, idiomatic, well-commented code
- If no language is specified, pick the most appropriate one`

const CODE_EXPLAINER_SYSTEM = `You are a code explainer. The user will paste code and you explain it thoroughly. Format your response in markdown:

## Overview
Brief summary of what the code does.

## Line-by-Line Breakdown
Explain each significant section with the relevant code referenced.

## Complexity Analysis
- **Time complexity**: O(?)
- **Space complexity**: O(?)

## Suggestions for Improvement
Numbered list of concrete improvements.`

async function streamGlmResponse(
  systemPrompt: string,
  userMessage: string,
  sessionId: string,
  pubSub: AiStreamChannelType
) {
  try {
    const stream = await glm.chat.completions.create({
      model: 'glm-4.7',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 4096,
    })

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content ?? ''
      if (content) {
        pubSub.publish('aiStream', sessionId, {
          id: sessionId,
          content,
          done: false,
        })
      }
    }

    pubSub.publish('aiStream', sessionId, {
      id: sessionId,
      content: '',
      done: true,
    })
  } catch (error) {
    logger.error({ error, sessionId }, 'GLM streaming error')
    pubSub.publish('aiStream', sessionId, {
      id: sessionId,
      content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      done: true,
    })
  }
}

export const generateCode = async (
  { prompt, language }: { prompt: string; language?: string },
  { context }: { context: { pubSub: AiStreamChannelType } }
) => {
  const id = randomUUID()
  const userMessage = language
    ? `Write ${language} code: ${prompt}`
    : prompt

  // Fire and forget — the subscription delivers the chunks
  streamGlmResponse(CODE_GENERATOR_SYSTEM, userMessage, id, context.pubSub)

  return { id }
}

export const explainCode = async (
  { code, language }: { code: string; language?: string },
  { context }: { context: { pubSub: AiStreamChannelType } }
) => {
  const id = randomUUID()
  const userMessage = language
    ? `Explain this ${language} code:\n\n${code}`
    : `Explain this code:\n\n${code}`

  streamGlmResponse(CODE_EXPLAINER_SYSTEM, userMessage, id, context.pubSub)

  return { id }
}
