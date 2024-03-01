import * as z from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Please input task title",
    })
    .max(1000, {
      message: "Task title is too long",
    }),
  description: z
    .string()
    .min(1, {
      message: "Please input task description",
    })
    .max(1000, {
      message: "Task description is too long",
    }),
  assignee: z.string(),
  status: z.string(),
});
