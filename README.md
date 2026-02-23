# Next.js Scalable Architecture Demo

A production-ready Next.js boilerplate that demonstrates **scalable architecture and patterns** through a simple Todo List app. The goal is not the todo list itself — it's the patterns, structure, and conventions that scale to large applications.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** with React Compiler
- **TypeScript** (strict mode)
- **MUI v7** + Emotion
- **Zustand** for state management
- **React Hook Form** + **Zod** for form handling
- **pnpm** as package manager

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
├── components/             # Reusable, generic UI components
│   ├── box/                # Box, Flex layout primitives
│   ├── button/             # Button, IconButton
│   ├── card/               # Card
│   ├── icon/               # Icon wrapper
│   ├── inputs/             # TextField, RHFTextField, Form
│   └── typography/         # Typography
├── features/               # Feature modules (domain-specific)
│   └── todo-list/          # Todo list feature
│       ├── AddTodoForm.tsx
│       ├── TodoList.tsx
│       ├── TodoListItem.tsx
│       ├── TodoListItemForm.tsx
│       └── useTodoListStore.ts
└── theme/                  # MUI theme configuration
    ├── palette.ts
    ├── typography.ts
    ├── components.ts
    ├── mixins.ts
    ├── fonts.ts
    ├── theme.ts
    └── ThemeRegistry.tsx
```

### Feature-Based Organization

Code is organized by **feature**, not by type. Each feature module is self-contained with its own components, hooks, and store. This keeps related code colocated and makes features easy to add, modify, or remove without affecting the rest of the app.

Generic, reusable UI components live in `src/components/` and are re-exported through barrel files for clean imports.

---

## State Management — Normalized Zustand Store

The store (`useTodoListStore.ts`) follows a **normalized state** pattern, similar to what you'd find in Redux Toolkit's `createEntityAdapter`, but implemented with Zustand:

```ts
type StoreState = {
  taskIds: string[]; // ordered list of IDs
  tasksById: Record<string, Task>; // lookup table
};
```

### Why Normalized State?

In a naive approach, you'd store tasks as a flat array (`Task[]`). This causes problems at scale:

| Operation       | Array `Task[]`        | Normalized `taskIds` + `tasksById` |
| --------------- | --------------------- | ---------------------------------- |
| Find by ID      | O(n) scan             | O(1) lookup                        |
| Update one item | New array + find      | Update single record entry         |
| Re-renders      | Every item re-renders | Only the changed item re-renders   |

With normalized state, each component subscribes to **only the slice it needs**:

- `TodoList` subscribes to `state.taskIds` — it only re-renders when tasks are added/removed, not when a task's title changes.
- `TodoListItem` subscribes to `state.tasksById[id]?.isCompleted` — it only re-renders when its own completion status changes.
- `TodoListItemForm` subscribes to `state.tasksById[id]?.title` — it only re-renders when its own title changes.

### Accessing State Outside React

Actions are invoked via `useTodoListStore.getState()` inside callbacks, avoiding unnecessary subscriptions:

```ts
const onToggle = useCallback(() => {
  useTodoListStore.getState().toggleTask(id);
}, [id]);
```

This is a Zustand best practice — the component doesn't subscribe to the action functions, only to the data it renders.

---

## Performance Optimizations

### 1. React Compiler

The React Compiler is enabled in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,
};
```

The compiler automatically memoizes components and hooks at build time, reducing the need for manual `useMemo`/`useCallback` in most cases.

### 2. Granular Zustand Selectors

Each component subscribes to the **minimal slice** of state it needs, preventing cascading re-renders:

```ts
// Only re-renders when the list of IDs changes
const taskIds = useTodoListStore((state) => state.taskIds);

// Only re-renders when this specific task's title changes
const taskTitle = useTodoListStore((state) => state.tasksById[id]?.title);
```

### 3. `memo()` on List Items

`TodoListItem` is wrapped with `React.memo()` to prevent re-renders when sibling items change:

```ts
export const TodoListItem = memo(TodoListItemBase);
```

Combined with the ID-based list pattern (`taskIds.map(id => <TodoListItem key={id} id={id} />)`), this means adding a new task **does not** re-render existing items.

### 4. Stable Callbacks with `useCallback`

Event handlers are memoized to maintain referential equality, preventing unnecessary child re-renders:

```ts
const onRemove = useCallback(() => {
  useTodoListStore.getState().removeTask(id);
}, [id]);
```

---

## Form Handling

Forms use **React Hook Form** with **Zod** schema validation:

```ts
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const { control, handleSubmit, reset } = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: { title: "" },
});
```

The `RHFTextField` component bridges React Hook Form's `Controller` with the custom `TextField`, keeping form logic declarative and type-safe.

---

## Component Library

All UI components are thin, typed wrappers around MUI, extended with project-specific conveniences:

- **`Flex`** — A `Box` with boolean shorthand props for flexbox layout (`column`, `alignCenter`, `justifyBetween`, etc.), replacing verbose `sx` prop usage.
- **`Typography`** — Extends MUI Typography with `semibold`, `medium`, `maxLines`, and `hideIfNull` props.
- **`IconButton`** — A custom button built on the `Flex` primitive with icon support, variants, and accessible states.
- **`Card`** — Layout primitive with `outlined`, `elevated`, `transparent`, and `borderless` variants.
- **`TextField`** — Wraps MUI's `OutlinedInput` with label, description, and error handling.
- **`Form`** — A `Flex` rendered as a `<form>` element with `noValidate`.

All components are type-safe with constrained palette keys (`PaletteKey`) to prevent invalid color values at compile time.

---

## Theme System

The theme is structured into focused modules:

| File                 | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `palette.ts`         | Color palette with type-safe `PaletteKey` union   |
| `typography.ts`      | Font sizes, weights, and variants                 |
| `components.ts`      | MUI component style overrides                     |
| `mixins.ts`          | Reusable box shadows, transitions, keyframes      |
| `fonts.ts`           | Google Font (Inter) with `next/font` optimization |
| `ThemeRegistery.tsx` | Theme provider with Emotion cache for SSR         |

---

## Development Tooling

| Tool            | Purpose                                                                        |
| --------------- | ------------------------------------------------------------------------------ |
| **ESLint**      | Linting with `next/core-web-vitals` + `next/typescript` + Prettier integration |
| **Prettier**    | Code formatting                                                                |
| **Husky**       | Git hooks                                                                      |
| **lint-staged** | Run linters on staged files before commit                                      |
| **TypeScript**  | Strict mode with path aliases (`@/*`)                                          |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```
