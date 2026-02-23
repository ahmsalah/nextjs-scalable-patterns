import { omit } from "lodash-es";
import { Box, type BoxProps } from "./Box";
import { ElementType } from "react";

/**
 * `FlexProps` is an interface that extends from MUI's `BoxProps`, providing additional properties
 * specific to the `Flex` component for controlling the layout behavior of flex containers.
 */
export type FlexProps<C extends ElementType = "div"> = BoxProps<C> & {
  /** Use flexbox layout when set to `true`.
   *
   * @default true
   */
  flexbox?: boolean;
  /** Render as an inline-flex container when set to `true`. */
  inline?: boolean;

  /** Lay out children in a column direction when set to `true`. */
  column?: boolean;

  /** Lay out children in a row direction when set to `true`. */
  row?: boolean;

  /** Allow children to wrap onto multiple lines when set to `true`. */
  wrap?: boolean;

  /** Justify content to the start of the main axis. */
  justifyStart?: boolean;

  /** Justify content to the end of the main axis. */
  justifyEnd?: boolean;

  /** Center content along the main axis when set to `true`. */
  justifyCenter?: boolean;

  /** Distribute space between items evenly along the main axis. */
  justifyBetween?: boolean;

  /** Distribute space around items evenly along the main axis. */
  justifyAround?: boolean;

  /** Distribute space around items evenly along the main axis, including the first and last items. */
  justifyEvenly?: boolean;

  /** Align items to the start of the cross axis. */
  alignStart?: boolean;

  /** Align items to the end of the cross axis. */
  alignEnd?: boolean;

  /** Center items along the cross axis when set to `true`. */
  alignCenter?: boolean;

  /** Align items based on their baselines. */
  alignBaseline?: boolean;

  /** Stretch items to fill the container along the cross axis. */
  alignStretch?: boolean;
};

export function Flex<C extends ElementType = "div">({
  inline,
  column,
  wrap,
  row,
  flexbox = true,
  ...props
}: FlexProps<C>) {
  const justifyContent = getJustifyContent(props);
  const alignItems = getAlignItems(props);
  const display = getDisplay({ inline, flexbox });
  const restProps = omit(props, [
    "justifyStart",
    "justifyEnd",
    "justifyCenter",
    "justifyBetween",
    "justifyAround",
    "justifyEvenly",
    "alignStart",
    "alignEnd",
    "alignCenter",
    "alignBaseline",
    "alignStretch",
  ]);

  return (
    <Box
      display={display}
      flexDirection={column && !row ? "column" : "row"}
      flexWrap={wrap ? "wrap" : "nowrap"}
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...restProps}
    />
  );
}

function getJustifyContent(props: FlexProps) {
  if (props.justifyStart) return "flex-start";
  if (props.justifyEnd) return "flex-end";
  if (props.justifyCenter) return "center";
  if (props.justifyBetween) return "space-between";
  if (props.justifyAround) return "space-around";
  if (props.justifyEvenly) return "space-evenly";
  return "flex-start"; // default value
}

function getAlignItems(props: FlexProps) {
  if (props.alignStart) return "flex-start";
  if (props.alignEnd) return "flex-end";
  if (props.alignCenter) return "center";
  if (props.alignBaseline) return "baseline";
  if (props.alignStretch) return "stretch";
  return "stretch"; // default value
}

function getDisplay(props: Pick<FlexProps, "inline" | "flexbox">) {
  if (props.inline) return "inline-flex";
  if (props.flexbox) return "flex";
  return "block";
}
