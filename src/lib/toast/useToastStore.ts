import { create } from "zustand";
import { Toast, ToasterOptions } from "./types";
import {
  DEFAULT_IS_DISMISSIBLE,
  DEFAULT_MAX_VISIBLE_TOASTS,
  DEFAULT_TOAST_DURATION_MS,
} from "./constants";

type StoreState = {
  toastIds: string[];
  toastsById: Record<string, Toast>;
  toasterOptions: Required<ToasterOptions>;
};

type StateActions = {
  setToasterOptions: (options: ToasterOptions) => void;
  addToast: (toast: Omit<Toast, "id" | "status">) => void;
  unmountToast: (id: string) => void;
  removeToast: (id: string) => void;
  toast: (message: string, options?: Omit<Toast, "message" | "id" | "status">) => void;
};

export type ToastStore = StoreState & StateActions;

const initialState: StoreState = {
  toastIds: [],
  toastsById: {},
  toasterOptions: {
    durationMs: DEFAULT_TOAST_DURATION_MS,
    maxVisibleToasts: DEFAULT_MAX_VISIBLE_TOASTS,
    isDismissible: DEFAULT_IS_DISMISSIBLE,
  },
};

export const useToastStore = create<ToastStore>((set, get) => ({
  ...initialState,
  setToasterOptions: (options) => {
    set((state) => ({ toasterOptions: { ...state.toasterOptions, ...options } }));
  },
  addToast: (toast) => {
    set((state) => {
      const newId = crypto.randomUUID();
      const newToast: Toast = { id: newId, status: "mounted", ...toast };

      return {
        toastIds: [...state.toastIds, newId],
        toastsById: {
          ...state.toastsById,
          [newId]: newToast,
        },
      };
    });
  },
  unmountToast: (id) => {
    set((state) => {
      if (!state.toastsById[id]) return state;

      return {
        toastsById: {
          ...state.toastsById,
          [id]: { ...state.toastsById[id], status: "unmounting" },
        },
      };
    });
  },
  removeToast: (id) => {
    set((state) => {
      if (!state.toastsById[id]) return state;

      const { [id]: _removed, ...rest } = state.toastsById;

      return {
        toastIds: state.toastIds.filter((toastId) => toastId !== id),
        toastsById: rest,
      };
    });
  },
  toast: (message, options) => {
    get().addToast({ message, ...options });
  },
}));
