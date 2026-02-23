/**
 * Learn more about typography customization
 * https://mui.com/material-ui/customization/typography/
 *
 * Default theme typography values provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.typography
 */

import type { TypographyVariantsOptions } from "@mui/material/styles";
import { interFont } from "./fonts";
import { getPalette } from "./palette";

export const typography: TypographyVariantsOptions = {
  fontFamily: interFont.style.fontFamily,
  htmlFontSize: 16,
  h1: {
    fontSize: "2.5rem", // 40px,
    fontWeight: "600",
  },
  h2: {
    fontSize: "2rem", // 32px,
    fontWeight: "600",
  },
  h3: {
    fontSize: "1.5rem", // 28px,
    fontWeight: "600",
  },
  h4: {
    fontSize: "1.5rem", // 24px,
    fontWeight: "400",
  },
  h5: {
    fontSize: "1.25rem", // 20px
    fontWeight: "400",
  },
  h6: {
    fontSize: "1.125rem", // 18px
    fontWeight: "400",
  },
  body1: {
    fontSize: "1rem", // 16px
    fontWeight: "400",
  },
  body2: {
    fontSize: "0.875rem", // 14px
    fontWeight: "400",
  },
  subtitle1: {
    fontSize: "1rem", // 16px,
    fontWeight: "400",
    color: getPalette("light").text?.secondary,
  },
  subtitle2: {
    fontSize: "0.875rem", // 14px,
    fontWeight: "400",
    color: getPalette("light").text?.secondary,
  },
  caption: {
    fontSize: "0.75rem", // 12px
    fontWeight: "400",
  },
  button: {
    fontSize: "0.875rem", // 14px
    fontWeight: "500",
    lineHeight: "1.7",
  },
};
