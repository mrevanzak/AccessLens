import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Displays the path to the current resource using a hierarchy of links.
 */
const meta = {
  title: 'ui/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    data: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Components',
        href: '/components',
      },
      {
        label: 'Breadcrumb',
        href: '/components/breadcrumb',
      },
    ],
  },
  render: (args) => <Breadcrumbs {...args} />,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Displays the path of links to the current resource.
 */
export const Default: Story = {};

/**
 * You can customize the separator between breadcrumbs by using the separator prop.
 */
export const CustomSeparator: Story = {
  args: {
    separator: '/',
  },
};

/**
 * You can add icons to the breadcrumbs by using the icon prop.
 */
export const WithContent: Story = {
  args: {
    data: [
      {
        icon: '🏠',
        label: 'Home',
        href: '/',
      },
      {
        icon: '🔧',
        label: 'Components',
        href: '/components',
      },
      {
        icon: '📜',
        label: 'Breadcrumb',
        href: '/components/breadcrumb',
      },
    ],
  },
};
