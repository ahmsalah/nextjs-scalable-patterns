/**
 * Default theme mixins provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.mixins
 */

import type { MixinsOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  type BoxShadow = {
    light: string;
    dark: string;
  };
  interface Mixins {
    boxShadows: {
      primary: BoxShadow;
      secondary: BoxShadow;
    };
    transitions: {
      expand: (isExpanded: boolean) => {
        transform: string;
        transition: string;
      };
    };
    keyframes: {
      spin: Record<string, unknown>;
    };
  }
}

export const mixins: MixinsOptions = {
  boxShadows: {
    primary: {
      light: "0px 1px 4px 0px rgba(150, 150, 150, 0.30)",
      dark: "0px 1px 4px 0px rgba(0, 0, 0, 0.05)",
    },
    secondary: {
      light: "0px 1px 1px 0px rgba(150, 150, 150, 0.30)",
      dark: "0 1px 1px 0 rgba(0, 0, 0, 0.16)",
    },
  },
  transitions: {
    expand: (isExpanded) => ({
      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    }),
  },
  keyframes: {
    spin: {
      "@keyframes spin": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
  },
};
