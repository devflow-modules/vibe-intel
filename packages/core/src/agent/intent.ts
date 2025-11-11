import type { VibeRunInput } from "@devflow-modules/vibe-shared";

export type Intent = "review" | "tests" | "docs" | "default";

export async function detectIntent(input: VibeRunInput): Promise<Intent> {
  if (["review", "tests", "docs"].includes(input.goal)) {
    return input.goal as Intent;
  }
  return "default";
}
