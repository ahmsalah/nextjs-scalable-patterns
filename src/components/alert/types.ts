import { CardProps } from "../card/Card";

export type AlertVariant = "default" | "error" | "warning" | "info" | "success";

export type AlertProps = Pick<CardProps, "sx"> & {
  message: string;
  variant?: AlertVariant;
  description?: string;
  onDismiss?: () => void;
  action?: React.ReactNode;
};
