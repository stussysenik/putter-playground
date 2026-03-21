export const schema = gql`
  type AiResult {
    id: String!
  }

  type Mutation {
    generateCode(prompt: String!, language: String): AiResult! @skipAuth
    explainCode(code: String!, language: String): AiResult! @skipAuth
  }
`
