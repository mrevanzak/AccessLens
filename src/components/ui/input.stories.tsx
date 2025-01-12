import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

/**
 * Displays a form input field or a component that looks like an input field.
 */
const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    id: 'email',
    className: 'w-96',
    type: 'email',
    placeholder: 'Email',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the input field.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to make the input non-interactive and appears faded,
 * indicating that input is not currently accepted.
 */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'hello@accesstime.co' },
};

/**
 * Use the `label` prop to includes a clear, descriptive label above
 * the input area to guide users.
 */
export const WithLabel: Story = {
  args: { label: 'Email' },
};

/**
 * Use a text element below the input field to provide additional instructions
 * or information to users.
 */
export const WithHelperText: Story = {
  args: { description: 'Enter your email address.' },
};

/**
 * Use the `isInvalid` prop to indicate that the input value is invalid.
 */
export const Invalid: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
  },
};

/**
 * You can use the `startContent` and `endContent` prop to add content to the start and end of the input.
 */
export const WithStartAndEndContent: Story = {
  args: {
    placeholder: 'example',
    label: 'Website',
    startContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-small text-muted-foreground'>https://</span>
      </div>
    ),
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-small text-muted-foreground'>.org</span>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        description={`Value: ${value}`}
      />
    );
  },
};
