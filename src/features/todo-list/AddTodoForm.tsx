"use client";

import { Button, Form, RHFTextField } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTodoListStore } from "./useTodoListStore";
import { useCallback } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
const schemaResolver = zodResolver(formSchema);
type FormValues = z.infer<typeof formSchema>;

export function AddTodoForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: schemaResolver,
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = useCallback(
    (data: FormValues) => {
      const { addTask } = useTodoListStore.getState();
      addTask({ title: data.title });
      reset();
    },
    [reset],
  );

  return (
    <Form flexbox alignStart gap={1.5} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField<FormValues, string>
        control={control}
        error={errors.title}
        name="title"
        id="title"
        placeholder="Add Task"
        fullWidth
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}
