"use client";

import { type BoxProps as MuiBoxProps, type Theme } from "@mui/material";
import { type PaletteKey } from "@/theme/palette";
import { type BoxTypeMap, createBox } from "@mui/system";

type CustomProps = {
  color?: PaletteKey | "inherit";
  bgcolor?: PaletteKey | "transparent";
  backgroundColor?: PaletteKey | "transparent";
  borderColor?: PaletteKey;
};

export type BoxProps<
  C extends React.ElementType = BoxTypeMap["defaultComponent"],
  P = object,
> = Omit<MuiBoxProps<C, P>, "color" | "bgcolor" | "backgroundColor" | "borderColor"> & CustomProps;

export const Box = createBox<Theme, CustomProps>();
