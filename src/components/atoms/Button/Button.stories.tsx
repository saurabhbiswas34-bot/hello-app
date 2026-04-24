import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Button, { type ButtonSpacing, type ButtonVariant } from './Button'

const variantOptions: ButtonVariant[] = ['default', 'blue', 'red']
const spacingOptions: ButtonSpacing[] = ['none', 'sm', 'md', 'lg']

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn(), children: 'Button label' },
  argTypes: {
    variant: { control: 'select', options: variantOptions },
    horizontalSpacing: { control: 'select', options: spacingOptions },
    topMargin: { control: 'select', options: spacingOptions },
    url: { control: 'text' },
    newTab: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  args: { variant: 'red' },
}

export const BlueButton: Story = {
  args: { variant: 'blue' },
}

export const RedButton: Story = {
  args: { variant: 'red' },
}

export const LinkSameTab: Story = {
  args: {
    url: 'https://example.com',
    newTab: false,
    children: 'Same-tab link',
  },
}

export const LinkNewTab: Story = {
  args: {
    url: 'https://example.com',
    newTab: true,
    children: 'New-tab link',
  },
}

export const SpacingShowcase: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem',
        maxWidth: 320,
      }}
    >
      <Button horizontalSpacing="md" topMargin="sm">
        Inline margins (md / sm top)
      </Button>
      <Button variant="blue" horizontalSpacing="lg" topMargin="md">
        Blue with larger spacing
      </Button>
    </div>
  ),
}

export const LongLabelWrapping: Story = {
  args: {
    variant: 'default',
    children:
      'This is an intentionally long label to confirm wrapping across narrow viewports and story layouts.',
    horizontalSpacing: 'sm',
  },
  decorators: [
    (StoryEl) => (
      <div style={{ maxWidth: 200, border: '1px dashed #ccc', padding: 8 }}>
        <StoryEl />
      </div>
    ),
  ],
}

export const MultipleButtonsNoIdClash: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Button id="cta-one" variant="blue">
        First
      </Button>
      <Button id="cta-two" variant="red">
        Second
      </Button>
      <Button url="https://example.com" id="cta-three">
        Third link
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}
