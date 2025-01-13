import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { BreadCrumbItemProps } from '@/components/ui/Breadcrumbs';

export type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'> & {
  separator?: React.ReactNode;
  disabled?: boolean;
};

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator, disabled, ...props }, ref) => {
    const childrenCount = React.Children.count(props.children);

    const Item = React.Children.map(props.children, (_child, index) => {
      const child = _child as React.ReactElement<BreadCrumbItemProps>;
      if (!React.isValidElement(child)) return null;

      const isLast = index === childrenCount - 1;
      const Child = React.cloneElement(child, {
        isLast,
        disabled: isLast ? disabled : child.props.disabled,
      });

      return (
        <React.Fragment key={child?.key ?? index}>
          {Child}
          {!isLast && (
            <li
              aria-hidden='true'
              className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5')}
            >
              {separator ?? <ChevronRight />}
            </li>
          )}
        </React.Fragment>
      );
    });

    return (
      <nav ref={ref} aria-label='breadcrumb'>
        <ol
          className={cn(
            'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
          )}
          {...props}
        >
          {Item}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
