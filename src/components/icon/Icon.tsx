"use client";
import { SVGElementType, useMemo } from "react";
import { type IconProps as IconsAXProps, Icon as IconsAXIcon } from "iconsax-react";
import { Box, BoxProps } from "../box/Box";

export type IconProps = BoxProps<SVGElementType> &
  Pick<IconsAXProps, "variant"> & {
    size?: "sm" | "md" | "lg" | number;
    icon: IconsAXIcon;
    disableViewBox?: boolean;
  };

export function Icon({
  icon,
  size = "md",
  sx,
  color,
  variant,
  disableViewBox,
  ...props
}: IconProps) {
  const isSafariBrowser = useMemo(() => {
    if (typeof window !== "undefined") {
      return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    }
    return false;
  }, []);

  return (
    <Box
      component={icon}
      className="icon-root"
      color={color}
      {...props}
      sx={[
        {
          display: "inline-flex",
          width: "1em",
          height: "1em",
          "&&&": { fontSize: getSize(size) },
          minWidth: isSafariBrowser ? undefined : "fit-content",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      variant={variant}
      {...(!disableViewBox && { viewBox: "0 0 24 24" })}
    />
  );
}

function getSize(size: "sm" | "md" | "lg" | number): number {
  switch (size) {
    case "sm":
      return 16;
    case "md":
      return 20;
    case "lg":
      return 24;
    default:
      return size;
  }
}
