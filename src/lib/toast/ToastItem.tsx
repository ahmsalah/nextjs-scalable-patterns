"use client";
import { Alert, Box } from "@/components";
import { useToastStore } from "./useToastStore";
import { TOAST_MIN_WIDTH, TOAST_TRANSITION_DURATION_MS } from "./constants";
import { memo, useCallback, useEffect, useState } from "react";

type ToastItemProps = {
  id: string;
};

function ToastItemBase({ id }: ToastItemProps) {
  const toast = useToastStore((state) => state.toastsById[id]);
  const defaultIsDismissible = useToastStore((state) => state.toasterOptions.isDismissible);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const onDismiss = useCallback(() => {
    useToastStore.getState().unmountToast(id);
  }, [id]);

  const onTransitionEnd = useCallback(
    (event: React.TransitionEvent) => {
      if (toast?.status === "unmounting" && event.propertyName === "opacity") {
        useToastStore.getState().removeToast(id);
      }
    },
    [id, toast?.status],
  );

  if (!toast) return null;

  const isDismissible = toast.isDismissible ?? defaultIsDismissible;
  const isVisible = hasEntered && toast.status !== "unmounting";

  return (
    <Box
      onTransitionEnd={onTransitionEnd}
      sx={{
        transition: `transform ${TOAST_TRANSITION_DURATION_MS}ms ease, opacity ${TOAST_TRANSITION_DURATION_MS}ms ease`,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Alert
        message={toast.message}
        description={toast.description}
        variant={toast.variant}
        onDismiss={isDismissible ? onDismiss : undefined}
        sx={{ minWidth: TOAST_MIN_WIDTH }}
      />
    </Box>
  );
}

export const ToastItem = memo(ToastItemBase) as typeof ToastItemBase;
