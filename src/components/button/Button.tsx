import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import NextLink from "next/link";
import { Typography } from "../typography/Typography";

export type ButtonProps = Omit<MuiButtonProps, "disabled" | "variant"> & {
  /**
   * If `true`, the button will show a loading spinner and be disabled.
   */
  isLoading?: boolean;
  /**
   *  If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The URL to link to when the button is clicked. If defined, a Next.js `Link` component
   * will be used as the root node, creating a client-side transition between routes.
   */
  href?: string;
  /**
   * The target of the link, if `href` is provided.
   */
  target?: string;
  /**
   * The download attribute of the link, if `href` is provided.
   */
  download?: string;
  /**
   * The variant to use.
   * @default "contained"
   */
  variant?: "contained" | "outlined";
  /**
   * If `true`, the button will not wrap its text.
   * @default false
   */
  noWrap?: boolean;
};

export function Button({
  sx,
  isLoading = false,
  href,
  isDisabled,
  variant = "contained",
  children,
  onClick,
  noWrap,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      endIcon={props.endIcon}
      LinkComponent={href ? NextLink : undefined}
      {...props}
      href={href}
      disabled={isDisabled}
      variant={variant}
      sx={sx}
      {...(isLoading && {
        endIcon: <CircularProgress color="inherit" size={16} />,
        disabled: true,
      })}
      onClick={onClick}
    >
      <Typography variant="inherit" component="span" className="button-label" noWrap={noWrap}>
        {children}
      </Typography>
    </MuiButton>
  );
}

Button.displayName = "Button";
