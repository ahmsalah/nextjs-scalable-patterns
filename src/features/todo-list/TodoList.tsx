"use client";

import { Flex, Typography } from "@/components";
import { useTodoListStore } from "./useTodoListStore";
import { TodoListItem } from "./TodoListItem";

export function TodoList() {
  const taskIds = useTodoListStore((state) => state.taskIds);

  if (taskIds.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Add a task to get started
      </Typography>
    );
  }

  return (
    <Flex column>
      {taskIds.map((id) => (
        <TodoListItem key={id} id={id} />
      ))}
    </Flex>
  );
}
