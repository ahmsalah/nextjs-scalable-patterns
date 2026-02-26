"use client";

import { useEffect } from "react";
import { ToastList } from "./ToastList";
import { ToastTimer } from "./ToastTimer";
import { ToasterOptions } from "./types";
import { useToastStore } from "./useToastStore";

export function Toaster({ durationMs, maxVisibleToasts, isDismissible }: ToasterOptions) {
  useEffect(() => {
    useToastStore.getState().setToasterOptions({ durationMs, maxVisibleToasts, isDismissible });
  }, [durationMs, maxVisibleToasts, isDismissible]);

  return (
    <>
      <ToastTimer />
      <ToastList />
    </>
  );
}
