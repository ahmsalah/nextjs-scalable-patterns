import { Box, Flex, IconButton } from "@/components";
import { useTodoListStore } from "./useTodoListStore";
import { memo, useCallback } from "react";
import { Trash } from "iconsax-react";
import { TodoListItemForm } from "./TodoListItemForm";

type TodoListItemProps = { id: string };

function TodoListItemBase({ id }: TodoListItemProps) {
  const isCompleted = useTodoListStore((state) => !!state.tasksById[id]?.isCompleted);

  const onToggle = useCallback(() => {
    useTodoListStore.getState().toggleTask(id);
  }, [id]);

  const onRemove = useCallback(() => {
    useTodoListStore.getState().removeTask(id);
  }, [id]);

  return (
    <Flex alignCenter gap={1} sx={{ opacity: isCompleted ? 0.5 : 1 }}>
      <Box component="input" type="checkbox" checked={isCompleted} onChange={onToggle} />
      <Flex alignCenter gap={1} borderBottom={1} borderColor="divider" flex={1} py={1}>
        <TodoListItemForm id={id} />
        <IconButton square icon={Trash} iconColor="text.primary" onClick={onRemove} />
      </Flex>
    </Flex>
  );
}

export const TodoListItem = memo(TodoListItemBase);
