import type { VibeRunInput } from "@devflow-modules/vibe-shared";

export type Intent = "review" | "tests" | "docs";

export async function detectIntent(input: VibeRunInput): Promise<Intent> {
  if (input.goal === "tests" || input.goal === "docs") return input.goal;
  return "review";
}
