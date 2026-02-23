"use client";
import { type FunctionComponent, type PropsWithChildren, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const ThemeRegistry: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const theme = useMemo(() => createTheme(getTheme("light")), []);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
