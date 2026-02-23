import { useTodoListStore } from "./useTodoListStore";
import { TextField } from "@/components";
import { ChangeEvent, useCallback } from "react";

type TodoListItemFormProps = {
  id: string;
};

export function TodoListItemForm({ id }: TodoListItemFormProps) {
  const taskTitle = useTodoListStore((state) => state.tasksById[id]?.title);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { updateTask } = useTodoListStore.getState();
      updateTask(id, { title: event.target.value });
    },
    [id],
  );

  const onBlur = useCallback(() => {
    const { removeTask, tasksById } = useTodoListStore.getState();
    if (tasksById[id]?.title === "") {
      removeTask(id);
    }
  }, [id]);

  return (
    <TextField
      id={id}
      value={taskTitle}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      sx={{
        "&& .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
      }}
    />
  );
}
