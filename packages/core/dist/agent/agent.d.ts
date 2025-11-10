import type { VibeRunInput } from "@devflow-modules/vibe-shared";
export declare function runTask(input: VibeRunInput): Promise<{
    intent: import("./intent").Intent;
    result: unknown;
}>;
