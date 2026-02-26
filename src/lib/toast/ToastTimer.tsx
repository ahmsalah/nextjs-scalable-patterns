"use client";

import { useEffect, useRef } from "react";
import { useToastStore } from "./useToastStore";

export function ToastTimer() {
  const toastIds = useToastStore((state) => state.toastIds);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const timers = timersRef.current;
    const { toasterOptions, removeToast } = useToastStore.getState();
    const { durationMs, maxVisibleToasts } = toasterOptions;

    if (toastIds.length > maxVisibleToasts) {
      const excessIds = toastIds.slice(0, toastIds.length - maxVisibleToasts);
      for (const id of excessIds) {
        const existing = timers.get(id);
        if (existing) {
          clearTimeout(existing);
          timers.delete(id);
        }
        removeToast(id);
      }
      return;
    }

    const activeIds = new Set(toastIds);

    for (const id of activeIds) {
      if (timers.has(id)) continue;

      const timer = setTimeout(() => {
        useToastStore.getState().unmountToast(id);
        timers.delete(id);
      }, durationMs);

      timers.set(id, timer);
    }

    for (const [id, timer] of timers) {
      if (!activeIds.has(id)) {
        clearTimeout(timer);
        timers.delete(id);
      }
    }
  }, [toastIds]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return null;
}
