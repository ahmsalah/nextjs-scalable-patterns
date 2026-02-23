import { Flex } from "../box";
import { FlexProps } from "../box/Flex";
import { Icon, IconProps } from "../icon/Icon";

type IconButtonProps = Pick<FlexProps, "sx"> & {
  icon: IconProps["icon"];
  iconColor?: IconProps["color"];
  iconSize?: IconProps["size"];
  size?: number;
  square?: boolean;
  isDisabled?: boolean;
  variant?: "transparent" | "subdued";
  onClick?: () => void;
  className?: string;
};

export function IconButton({
  className,
  icon,
  iconColor = "text.secondary",
  iconSize = "md",
  size = 32,
  isDisabled = false,
  square = false,
  variant = "transparent",
  sx,
  onClick,
}: IconButtonProps) {
  return (
    <Flex<"button">
      className={className}
      component="button"
      justifyCenter
      alignCenter
      disabled={isDisabled}
      onClick={onClick}
      sx={[
        {
          border: "none",
          outline: "none",
          cursor: "pointer",
          width: size,
          height: size,
          borderRadius: square ? 2 : "50%",
          "&:hover": {
            bgcolor: "action.hover",
          },
          "&:focus-visible, &:active": {
            bgcolor: "action.focus",
          },
        },
        isDisabled && {
          opacity: (theme) => theme.palette.action.disabledOpacity,
          cursor: "not-allowed",
        },
        variant === "transparent" && {
          bgcolor: "transparent",
        },
        variant === "subdued" && {
          bgcolor: "background.subdued",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Icon icon={icon} color={iconColor} size={iconSize} />
    </Flex>
  );
}
