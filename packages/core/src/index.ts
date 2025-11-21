import { createLogger, setupTelemetry } from "@devflow-modules/vibe-shared";

let telemetryPromise: Promise<void> | null = null;
const log = createLogger("core-init", { service: "vibe-core" });

export function initCore() {
  if (!telemetryPromise) {
    log.info({ msg: "core:initCore:start" });
    telemetryPromise = setupTelemetry("vibe-core")
      .then(() => {
        log.info({ msg: "core:initCore:ready" });
      })
      .catch((error) => {
        log.error({ msg: "core:initCore:error", error });
        throw error;
      });
  } else {
    log.debug({ msg: "core:initCore:reuse" });
  }
  return telemetryPromise;
}

export * from "./agent/agent.js";
export * from "./agent/intent.js";
export * from "./skills/index.js";
export * from "./skills/code_review.js";
