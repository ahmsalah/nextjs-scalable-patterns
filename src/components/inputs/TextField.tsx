import { FormHelperText, OutlinedInput, OutlinedInputProps } from "@mui/material";
import { Flex } from "../box/Flex";
import { Typography } from "../typography/Typography";

export type TextFieldProps = Omit<OutlinedInputProps, "disabled" | "error"> & {
  id: string;
  isDisabled?: boolean;
  description?: string;
  helperText?: string;
  isError?: boolean;
};

export function TextField({
  id,
  label,
  isDisabled,
  fullWidth,
  sx,
  description,
  isError,
  helperText,
  ...props
}: TextFieldProps) {
  return (
    <Flex column width={fullWidth ? 1 : "auto"}>
      {Boolean(label || description) && (
        <Flex column ml={0.25} mb={0.25}>
          {!!label && (
            <Typography<"label"> component="label" htmlFor={id} variant="body2" semibold>
              {label}
            </Typography>
          )}
          {!!description && (
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          )}
        </Flex>
      )}
      <OutlinedInput
        {...props}
        id={id}
        disabled={isDisabled}
        error={isError}
        fullWidth={fullWidth}
        sx={sx}
      />
      {!!helperText && <FormHelperText error={isError}>{helperText}</FormHelperText>}
    </Flex>
  );
}
