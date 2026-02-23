import { Flex } from "@/components";
import { AddTodoForm } from "@/features/todo-list/AddTodoForm";
import { TodoList } from "@/features/todo-list/TodoList";

export default function Home() {
  return (
    <Flex p={3} justifyCenter>
      <Flex column gap={2} maxWidth={600} width={1}>
        <AddTodoForm />
        <Flex column>
          <TodoList />
        </Flex>
      </Flex>
    </Flex>
  );
}
