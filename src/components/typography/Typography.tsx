import {
  Typography as MuiTypography,
  TypographyTypeMap,
  type TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { type PaletteKey } from "@/theme/palette";
import { ElementType } from "react";

export type TypographyProps<C extends React.ElementType = TypographyTypeMap["defaultComponent"]> =
  Omit<MuiTypographyProps<C>, "fontWeight" | "color"> & {
    /**
     * Maximum number of lines to display
     */
    maxLines?: number;
    /**
     * If true, the element won't be rendered if the content is (e.g. null, undefined, false,  "").
     */
    hideIfNull?: boolean;
    color?: PaletteKey | "inherit";
    fontWeight?: "400" | "500" | "600" | "700";
    /**
     * Alias for fontWeight 600
     */
    semibold?: boolean;
    /**
     * Alias for fontWeight 500
     */
    medium?: boolean;
  };

export function Typography<C extends ElementType = TypographyTypeMap["defaultComponent"]>({
  hideIfNull,
  maxLines,
  children,
  sx,
  fontWeight,
  semibold,
  medium,
  variant,
  ...props
}: TypographyProps<C>) {
  if (hideIfNull && !(children || children === 0)) {
    return null;
  }
  return (
    <MuiTypography
      {...props}
      variant={variant}
      sx={[
        !!maxLines && {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: maxLines,
          overflow: "hidden",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      fontWeight={semibold ? "600" : medium ? "500" : fontWeight}
    >
      {children}
    </MuiTypography>
  );
}
