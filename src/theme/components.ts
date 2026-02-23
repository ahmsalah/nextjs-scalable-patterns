/**
 * The theme's `components` key allows you to customize a component without wrapping it in another component.
 * You can change the styles, the default props, and more.
 * Learn more about palette customization
 * https://mui.com/material-ui/customization/theme-components/
 */

import type { Components } from "@mui/material/styles";

export const components: Components = {
  // Name of the component
  MuiButton: {
    styleOverrides: {
      // Name of the slot/rule
      root: {
        fontWeight: "500",
        borderRadius: "10px",
        textTransform: "none",
      },
      outlined: {
        borderColor: "rgb(202, 208, 217)",
      },
      sizeMedium: {
        minHeight: "36px",
      },
      contained: {
        boxShadow: "none",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
      },
      notchedOutline: {
        borderColor: "rgba(0, 0, 0, 0.12)",
      },
      input: {
        paddingBlock: "6.5px",
      },
    },
  },
};
