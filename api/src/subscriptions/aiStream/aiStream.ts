import gql from 'graphql-tag'

import type { PubSub } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

export const schema = gql`
  type AiChunk {
    id: String!
    content: String!
    done: Boolean!
  }

  type Subscription {
    aiStream(id: String!): AiChunk! @skipAuth
  }
`

export type AiStreamChannel = {
  aiStream: [id: string, payload: { id: string; content: string; done: boolean }]
}

export type AiStreamChannelType = PubSub<AiStreamChannel>

const aiStream = {
  aiStream: {
    subscribe: (
      _,
      { id }: { id: string },
      { pubSub }: { pubSub: AiStreamChannelType }
    ) => {
      logger.debug({ id }, 'aiStream subscription started')
      return pubSub.subscribe('aiStream', id)
    },
    resolve: (payload: { id: string; content: string; done: boolean }) => {
      return payload
    },
  },
}

export default aiStream
