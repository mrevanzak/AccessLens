import { zodResolver } from '@hookform/resolvers/zod';
import type * as React from 'react';
import {
  type FieldPath,
  type FieldValues,
  FormProvider,
  useController,
  type UseControllerProps,
  useForm as __useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

import { Input, type InputProps } from '@/components/ui/Input';

type FormProps<TIn extends FieldValues> =
  React.ComponentPropsWithoutRef<'form'> & {
    methods: UseFormReturn<TIn>;
  };
const Form = <TIn extends FieldValues>({
  methods,
  ...props
}: FormProps<TIn>) => {
  return (
    <FormProvider {...methods}>
      <form {...props} />
    </FormProvider>
  );
};

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

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
  ...props
}: UseControllerProps<TFieldValues, TName> & Partial<InputProps>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const label =
    props.label ||
    // Automatically convert name/id to label
    name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  return (
    <Input
      id={name}
      placeholder={placeholder ?? label}
      label={label}
      error={fieldState.error?.message}
      {...field}
    />
  );
};
FormInput.displayName = 'FormInput';

export { Form, FormInput, useForm };
