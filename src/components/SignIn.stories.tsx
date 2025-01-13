import type { Meta, StoryObj } from '@storybook/react';

import { SignInForm } from '@/components/SignIn';

/**
 * Displays a Sign in form.
 */
const meta = {
  title: 'Sign In',
  component: SignInForm,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
