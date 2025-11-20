import { setupTelemetry } from "@devflow-modules/vibe-shared";

let telemetryPromise: Promise<void> | null = null;

export function initCore() {
  if (!telemetryPromise) {
    telemetryPromise = setupTelemetry("vibe-core");
  }
  return telemetryPromise;
}

export * from "./agent/agent.js";
export * from "./agent/intent.js";
export * from "./skills/index.js";
export * from "./skills/code_review.js";
