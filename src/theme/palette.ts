/**
 * Learn more about palette customization
 * https://mui.com/material-ui/customization/palette/
 *
 * Default theme palette values provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
 */

import type { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    subdued: string;
  }
}

export const getPalette = (_mode: "light" | "dark"): PaletteOptions => ({
  mode: "light",
  primary: {
    main: "#202124",
  },
  secondary: { main: "rgb(38, 109, 240)" },
  background: {
    paper: "#FFFFFF",
    default: "#FFFFFF",
    subdued: "rgba(102, 112, 133, 0.06)",
  },
  text: {
    primary: "rgb(28, 29, 31)",
    secondary: "#9fa1a7",
  },
  divider: "rgba(0, 0, 0, 0.08)",
});

export type PaletteKey =
  | "primary.main"
  | "primary.contrastText"
  | "secondary.main"
  | "secondary.contrastText"
  | "info.light"
  | "info.main"
  | "info.dark"
  | "warning.light"
  | "warning.main"
  | "warning.dark"
  | "error.light"
  | "error.main"
  | "error.dark"
  | "success.light"
  | "success.main"
  | "success.dark"
  | "background.paper"
  | "background.subdued"
  | "text.primary"
  | "text.secondary"
  | "divider";
