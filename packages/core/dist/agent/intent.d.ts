import type { VibeRunInput } from "@devflow-modules/vibe-shared";
export type Intent = "review" | "tests" | "docs" | "default";
export declare function detectIntent(input: VibeRunInput): Promise<Intent>;
