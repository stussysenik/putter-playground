import { render } from '@redwoodjs/testing/web'

import CodeExplainerPage from './CodeExplainerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CodeExplainerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeExplainerPage />)
    }).not.toThrow()
  })
})
