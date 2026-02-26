import { ButtonBase, ButtonBaseProps } from "@mui/material";
import { Flex, FlexProps } from "./Flex";

type FlexButtonProps = Omit<ButtonBaseProps, "disabled"> &
  FlexProps & {
    /**
     *  If `true`, the button will be disabled.
     */
    isDisabled?: boolean;
  };

export function FlexButton({ isDisabled, onClick, sx, ...props }: FlexButtonProps) {
  const isButton = !!onClick;

  return (
    <Flex<"button">
      component={isButton ? ButtonBase : undefined}
      disabled={isDisabled}
      {...props}
      sx={[
        isButton && {
          outline: "none",
          transition: "background-color 150ms",
          "&:hover": {
            bgcolor: "action.hover",
          },
          "&:focus-visible": {
            bgcolor: "action.focus",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
