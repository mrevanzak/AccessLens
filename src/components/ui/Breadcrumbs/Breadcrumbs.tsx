import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type BreadcrumbProps = React.ComponentPropsWithoutRef<'nav'> & {
  separator?: React.ReactNode;
  data: {
    icon?: React.ReactNode;
    label: string;
    href: string;
  }[];
};

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator, data, ...props }, ref) => {
    const renderItem = React.useCallback(
      (
        { icon, label, href }: BreadcrumbProps['data'][number],
        index: number,
      ) => {
        const isLast = index === data.length - 1;

        return (
          <React.Fragment key={label}>
            <li className={cn('inline-flex items-center gap-1.5')}>
              {icon}
              <a
                className={cn('transition-colors hover:text-foreground', {
                  'font-normal text-foreground': isLast,
                })}
                {...(isLast && {
                  'aria-current': 'page',
                  role: 'link',
                })}
                href={href}
              >
                {label}
              </a>
            </li>
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
      },
      [data, separator],
    );

    return (
      <nav
        ref={ref}
        aria-label={props['aria-label'] ?? 'breadcrumbs'}
        {...props}
      >
        <ol
          className={cn(
            'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
          )}
        >
          {data.map(renderItem)}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
