import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';

type InputProps<T = string> = {
  /** The id of the input field. */
  id: string;
  /** The label for the input field. */
  label?: string;
  /** A description/helper text of the input field. */
  description?: string;
  /** An error message to display below the input field. */
  error?: string;
  /** To render content at the start of the input field. e.g. icons */
  startContent?: React.ReactNode;
  /** To render content at the end of the input field. e.g. clear button */
  endContent?: React.ReactNode;
  /** Custom class names to apply to the input field. */
  classNames?: {
    wrapper?: string;
    label?: string;
    description?: string;
    errorMessage?: string;
  };

  value?: T;
  setValue?: (value: T) => void;
} & React.ComponentProps<'input'>;

function Input<T>(
  {
    label,
    description,
    error,
    startContent,
    endContent,
    classNames,
    id,
    type = 'text',
    className,
    value,
    setValue,
    ...props
  }: InputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={cn('flex flex-col space-y-2', classNames?.wrapper)}>
      {label && (
        <Label
          htmlFor={id}
          className={cn({ 'text-destructive': !!error }, classNames?.label)}
        >
          {label}
        </Label>
      )}
      <div
        className={cn(
          'box-border inline-flex h-10 items-center space-x-1.5 rounded-md border border-input bg-background px-3 py-2 ring-offset-background has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2',
          {
            'border-destructive has-[:focus-visible]:ring-destructive': !!error,
          },
          className,
        )}
      >
        {startContent}
        <input
          id={id}
          type={type}
          className={cn(
            'peer flex-1 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none md:text-sm',
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(e) => setValue?.(e.target.value as T)}
          {...props}
        />
        {endContent}
      </div>
      {description && (
        <p
          className={cn(
            'text-xs text-muted-foreground peer-disabled:opacity-70',
            classNames?.description,
          )}
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className={cn(
            'text-sm font-medium text-destructive',
            classNames?.errorMessage,
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}
Input.displayName = 'Input';

export const InputWrapper = React.forwardRef(Input) as <T>(
  props: InputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof Input>;

export { InputWrapper as Input };
