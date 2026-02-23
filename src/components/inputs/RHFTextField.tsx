"use client";

import { type ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  type ControllerProps,
  type FieldError,
  Controller,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "./TextField";

export type RHFTextFieldProps<T extends FieldValues, V extends string | number = string> = Omit<
  TextFieldProps,
  "value" | "onChange" | "error"
> & {
  control: Control<T>;
  name: Path<T>;
  rules?: ControllerProps<T>["rules"];
  isRequired?: boolean;
  error?: FieldError;
  /**
   * Used to transform the value before it is passed to the onChange handler.
   */
  onBeforeChange?: (value: string) => V;
  /**
   * Do something with the value after it is changed.
   */
  onAfterChange?: (value: V) => void;
  /**
   * Used to render the value.
   */
  renderValue?: (value: V) => ReactNode;
};

export function RHFTextField<T extends FieldValues, V extends string | number = string>({
  control,
  name,
  rules,
  isRequired,
  error,
  helperText,
  isDisabled,
  onBeforeChange,
  onAfterChange,
  renderValue,
  type,
  ...props
}: RHFTextFieldProps<T, V>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired ? "This field is required" : undefined,
        ...rules,
      }}
      render={({ field }) => (
        <>
          <TextField
            {...props}
            {...field}
            type={type}
            value={renderValue?.(field.value) ?? field.value}
            onChange={(event) => {
              const newValue = onBeforeChange?.(event.target.value) ?? event.target.value;
              field.onChange(newValue);
              onAfterChange?.(newValue as V);
            }}
            onBlur={(event) => {
              field.onBlur();
              props.onBlur?.(event);
            }}
            onKeyDown={(event) => {
              if (type === "number" && ["e", "E", "+", "-"].includes(event.key)) {
                event.preventDefault();
              }
              props.onKeyDown?.(event);
            }}
            isDisabled={isDisabled ?? field.disabled}
            isError={!!error?.message}
            helperText={error?.message ?? helperText}
          />
        </>
      )}
    />
  );
}
