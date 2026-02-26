export type Toast = {
  /** Unique identifier for the toast instance. */
  id: string;
  /** Status of the toast instance. Used internally for animation */
  status: "mounted" | "unmounting";
  /** Primary text displayed in the toast. */
  message: string;
  /** Optional secondary text shown below the message. */
  description?: string;
  /** Visual style indicating the toast's semantic purpose. */
  variant?: "error" | "warning" | "info" | "success";
  /** Whether the user can manually close the toast via a dismiss button. */
  isDismissible?: boolean;
};

export type ToasterOptions = Pick<Toast, "isDismissible"> & {
  /** Time in milliseconds before the toast is automatically dismissed. */
  durationMs?: number;
  /** Maximum number of toasts visible on screen at once. Older toasts are removed first. */
  maxVisibleToasts?: number;
};
