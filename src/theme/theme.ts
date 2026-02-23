import { components } from "./components";
import { getPalette } from "./palette";
import { typography } from "./typography";
import { mixins } from "./mixins";

export const getTheme = (mode: "light" | "dark") => ({
  components,
  palette: getPalette(mode),
  typography,
  mixins,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  shape: {
    borderRadius: 4,
  },
});
