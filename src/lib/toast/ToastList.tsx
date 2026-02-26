"use client";

import { Flex } from "@/components";
import { useToastStore } from "./useToastStore";
import { ToastItem } from "./ToastItem";
import { createPortal } from "react-dom";

export function ToastList() {
  const toastIds = useToastStore((state) => state.toastIds);

  if (toastIds.length === 0) {
    return null;
  }

  return createPortal(
    <Flex
      component="section"
      role="region"
      aria-label="Notifications"
      column
      gap={1}
      sx={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 2000,
      }}
    >
      {toastIds.map((id) => (
        <ToastItem key={id} id={id} />
      ))}
    </Flex>,
    document.body,
  );
}
