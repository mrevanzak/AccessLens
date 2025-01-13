import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';

/**
 * Displays the path to the current resource using a hierarchy of links.
 */
const meta = {
  title: 'ui/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>;

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
 * You can customize the behavior of the breadcrumb item by using the `as` prop.
 * This prop allows you to use a different navigation element for the breadcrumb item.
 */
export const CustomBreadcrumbItem: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem as={Link} href='/'>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem as={Link} href='/components'>
        Components
      </BreadcrumbItem>
      <BreadcrumbItem as={Link} href='/components/breadcrumb'>
        Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * You can add any element to the start or end of the breadcrumbs by using the `startContent` and `endContent` props.
 */
export const WithContent: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem startContent='🏠'>Home</BreadcrumbItem>
      <BreadcrumbItem startContent='🔧'>Components</BreadcrumbItem>
      <BreadcrumbItem startContent='📜'>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  ),
};
