import { render } from '@redwoodjs/testing/web'

import CodeGeneratorPage from './CodeGeneratorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CodeGeneratorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeGeneratorPage />)
    }).not.toThrow()
  })
})
