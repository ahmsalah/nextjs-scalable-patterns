import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type StoreState = {
  taskIds: string[];
  tasksById: Record<string, Task>;
};

type StateActions = {
  addTask: (task: Pick<Task, "title">) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, task: Pick<Task, "title">) => void;
  reset: () => void;
};

export type TodoListStore = StoreState & StateActions;

const initialState: StoreState = {
  taskIds: [],
  tasksById: {},
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  ...initialState,
  addTask: (task) =>
    set((state) => {
      const newId = crypto.randomUUID();
      const newTask = { id: newId, isCompleted: false, ...task };

      return {
        taskIds: [...state.taskIds, newId],
        tasksById: {
          ...state.tasksById,
          [newId]: newTask,
        },
      };
    }),
  removeTask: (id) =>
    set((state) => {
      if (!state.tasksById[id]) return state;

      const { [id]: _removed, ...rest } = state.tasksById;

      return {
        taskIds: state.taskIds.filter((x) => x !== id),
        tasksById: rest,
      };
    }),
  toggleTask: (id) =>
    set((state) => {
      const existingTask = state.tasksById[id];
      if (!existingTask) return state;

      const updatedTask = { ...existingTask, isCompleted: !existingTask.isCompleted };

      return { tasksById: { ...state.tasksById, [id]: updatedTask } };
    }),
  updateTask: (id, task) =>
    set((state) => {
      const existingTask = state.tasksById[id];
      if (!existingTask) return state;

      const updatedTask = { ...existingTask, ...task };

      return { tasksById: { ...state.tasksById, [id]: updatedTask } };
    }),
  reset: () => set(initialState),
}));
