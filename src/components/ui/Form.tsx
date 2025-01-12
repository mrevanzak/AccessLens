import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseControllerProps,
  useForm as __useForm,
  useFormContext,
  type UseFormProps,
} from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

import { cn } from '@/lib/utils';

import { Input, type InputProps } from '@/components/ui/input';

const Form = FormProvider;

const useForm = <TOut, TDef extends ZodTypeDef, TIn extends FieldValues>(
  props: Omit<UseFormProps<TIn>, 'resolver' | 'values'> & {
    schema: ZodType<TOut, TDef, TIn>;
    values?: Partial<TIn>;
  },
) => {
  const form = __useForm<TIn>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
    values: props?.values as TIn,
  });

  return form;
};

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: UseControllerProps<TFieldValues, TName> & Omit<InputProps, 'id'>) => {
  const label =
    props.label ||
    props.name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Input
          id={props.name}
          placeholder={props.placeholder ?? label}
          label={label}
          error={fieldState.error?.message}
          {...field}
        />
      )}
    />
  );
};
FormInput.displayName = 'FormInput';

export { Form, FormField, FormInput, useForm, useFormField };
