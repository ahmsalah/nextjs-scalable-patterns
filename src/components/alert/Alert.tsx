import { Flex } from "../box/Flex";
import { Button } from "../button";
import { Typography } from "../typography";
import { Card } from "../card";
import { AlertProps } from "./types";
import { getIcon } from "./assets";

export function Alert({
  variant = "default",
  message,
  description,
  onDismiss,
  action,
  sx,
}: AlertProps) {
  return (
    <Card
      role="alert"
      aria-live="assertive"
      aria-atomic
      row
      alignCenter
      variant="elevated"
      px={2}
      py={0.75}
      gap={1}
      minHeight={52}
      sx={sx}
    >
      <Flex row alignCenter gap={1} flex={1}>
        {!!variant && getIcon(variant)}
        <Flex column>
          <Typography variant="body2">{message}</Typography>
          {!!description && (
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          )}
        </Flex>
      </Flex>

      {(!!action || !!onDismiss) && (
        <Flex alignCenter gap={1}>
          {action}
          {!!onDismiss && (
            <Button onClick={onDismiss} size="small" aria-label="Dismiss notification">
              Dismiss
            </Button>
          )}
        </Flex>
      )}
    </Card>
  );
}
