# Toast

Lightweight toast notification system. Two exports:

## `Toaster`

React component that renders active toasts and manages their lifecycle (auto-dismiss timers, max visible limit). Mount it once at the root of your app.

```tsx
import { Toaster } from "@/lib/toast";

<Toaster durationMs={5000} maxVisibleToasts={3} isDismissible />;
```

All props are optional and fall back to sensible defaults.

| Prop               | Type      | Default | Description                                     |
| ------------------ | --------- | ------- | ----------------------------------------------- |
| `durationMs`       | `number`  | `3000`  | Auto-dismiss delay in milliseconds              |
| `maxVisibleToasts` | `number`  | `3`     | Max toasts on screen; oldest are evicted first  |
| `isDismissible`    | `boolean` | `false` | Whether toasts show a dismiss button by default |

## `toast`

Imperative function to show a toast from anywhere — no hooks or context needed.

```ts
import { toast } from "@/lib/toast";

toast("File saved");

toast("Something went wrong", {
  variant: "error",
  description: "Please try again later.",
  isDismissible: true,
});
```

| Param                   | Type                                          | Description                                         |
| ----------------------- | --------------------------------------------- | --------------------------------------------------- |
| `message`               | `string`                                      | Primary text                                        |
| `options.description`   | `string?`                                     | Secondary text below the message                    |
| `options.variant`       | `"error" \| "warning" \| "info" \| "success"` | Visual style                                        |
| `options.isDismissible` | `boolean?`                                    | Override the `Toaster`-level default for this toast |
