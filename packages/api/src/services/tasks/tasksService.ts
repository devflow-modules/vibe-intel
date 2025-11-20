import type { ReviewRequest } from "../../schemas/review/reviewSchema.js";
import type { TasksRequest, TasksResponse, TaskGoal } from "../../schemas/tasks/tasksSchema.js";
import { TasksResponseSchema } from "../../schemas/tasks/tasksSchema.js";
import { executeCodeReview } from "../review/reviewService.js";

const GOAL_TO_FOCUS: Record<TaskGoal, ReviewRequest["focus"]> = {
  review: ["bugs", "style", "architecture"],
  tests: ["architecture", "performance"],
  docs: ["style", "architecture"]
};

type TasksServiceDeps = {
  log?: {
    info: (input: Record<string, unknown>) => void;
    debug: (input: Record<string, unknown>) => void;
    error: (input: Record<string, unknown>) => void;
  };
};

export async function executeAutomationTask(
  payload: TasksRequest,
  deps: TasksServiceDeps = {}
): Promise<TasksResponse> {
  const reviewInput: ReviewRequest = {
    files: payload.files,
    language: "typescript",
    focus: GOAL_TO_FOCUS[payload.goal],
    framework: "nextjs"
  };

  deps.log?.info({ msg: "tasks:start", goal: payload.goal });

  try {
    const result = await executeCodeReview(reviewInput, deps);
    const response = { goal: payload.goal, result };

    deps.log?.info({ msg: "tasks:success", goal: payload.goal });

    return TasksResponseSchema.parse(response);
  } catch (error) {
    deps.log?.error({ msg: "tasks:error", goal: payload.goal, error });
    throw error;
  }
}

