import { createLogger, type VibeRunInput } from "@devflow-modules/vibe-shared";
import { initCore, runAgent } from "../index.js";

const log = createLogger("core-cli", { service: "vibe-core" });
const coreReady = initCore() ?? Promise.resolve();

export async function runCLI() {
  await coreReady;
  const input: VibeRunInput<"code_review"> = {
    skill: "code_review",
    payload: {
      files: [{ path: "example.ts", content: "export const greet = 'Hello';" }],
      language: "typescript",
      focus: ["bugs", "style", "architecture"],
    },
    context: {
      env: "local",
      model: "gpt-4o-mini",
      telemetry: {
        onEvent(event) {
          log.info({
            msg: "cli:telemetry",
            type: event.type,
            skill: event.skill,
            data: event.payload ?? event.result,
          });
        },
      },
    },
  };

  const result = await runAgent(input);
  log.info({ msg: "cli:result", result });
}
