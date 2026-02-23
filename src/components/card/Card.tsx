import { Flex, type FlexProps } from "../box/Flex";

export type CardProps = FlexProps & {
  variant?: "transparent" | "outlined" | "borderless" | "elevated";
};

export function Card({
  children,
  sx,
  variant = "outlined",
  bgcolor = "background.paper",
  border,
  borderColor,
  color,
  borderRadius = 2,
  ...props
}: CardProps) {
  return (
    <Flex
      column
      {...props}
      sx={[
        variant === "elevated" && {
          boxShadow: (theme) => theme.mixins.boxShadows.primary.dark,
          border: 1,
          borderColor: "divider",
        },
        variant === "outlined" && {
          border: 1,
          borderColor: "divider",
          boxShadow: "none",
        },
        variant === "transparent" && {
          boxShadow: "none",
          bgcolor: "transparent",
        },
        variant === "borderless" && {
          boxShadow: "none",
          border: "none",
        },
        {
          borderRadius,
          outline: "none",
          bgcolor,
          borderColor,
          border,
          color,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Flex>
  );
}
