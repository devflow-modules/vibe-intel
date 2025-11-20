import { z } from "zod";
import { ReviewResponseSchema } from "../review/reviewSchema.js";

export const TaskGoalSchema = z.enum(["review", "tests", "docs"]);

const TaskFileSchema = z.object({
  path: z.string(),
  content: z.string().max(150_000)
});

export const TasksRequestSchema = z.object({
  goal: TaskGoalSchema,
  files: z.array(TaskFileSchema).min(1, "Ao menos um arquivo é necessário")
});

export const TasksResponseSchema = z.object({
  goal: TaskGoalSchema,
  result: ReviewResponseSchema
});

export type TaskGoal = z.infer<typeof TaskGoalSchema>;
export type TasksRequest = z.infer<typeof TasksRequestSchema>;
export type TasksResponse = z.infer<typeof TasksResponseSchema>;

