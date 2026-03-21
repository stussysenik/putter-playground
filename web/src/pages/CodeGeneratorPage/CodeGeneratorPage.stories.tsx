import type { Meta, StoryObj } from '@storybook/react'

import CodeGeneratorPage from './CodeGeneratorPage'

const meta: Meta<typeof CodeGeneratorPage> = {
  component: CodeGeneratorPage,
}

export default meta

type Story = StoryObj<typeof CodeGeneratorPage>

export const Primary: Story = {}
