import { cn } from '@/lib/utils';

export type BreadCrumbItemProps<C extends React.ElementType = 'a'> = {
  isLast?: boolean;
  disabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as'>;

export const BreadcrumbItem = <C extends React.ElementType = 'a'>({
  disabled,
  isLast,
  as,
  startContent,
  endContent,
  ...props
}: BreadCrumbItemProps<C>) => {
  const Component = isLast ? 'span' : (as ?? 'a');

  return (
    <li className={cn('inline-flex items-center gap-1.5')}>
      {startContent}
      <Component
        className={cn('transition-colors hover:text-foreground', {
          'font-normal text-foreground': isLast,
        })}
        disabled={isLast ? true : disabled}
        aria-disabled={isLast ? true : disabled}
        {...(isLast && {
          'aria-current': false,
          role: 'link',
        })}
        {...props}
      />
      {endContent}
    </li>
  );
};
BreadcrumbItem.displayName = 'BreadcrumbItem';
