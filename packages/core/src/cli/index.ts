import { runAgent } from "../agent/agent.js";
import type { VibeRunInput } from "@devflow-modules/vibe-shared";

export async function runCLI() {
  const input: VibeRunInput<"code_review"> = {
    skill: "code_review",
    payload: {
      files: [
        { path: "example.ts", content: "console.log('Hello');" },
      ],
      language: "typescript",
      focus: ["bugs", "style", "architecture"],
    },
    context: {
      env: "local",
      model: "gpt-4o-mini",
      telemetry: {
        onEvent(event) {
          console.log(
            `[${event.type}] ${event.skill}`,
            event.payload ?? event.result
          );
        },
      },
    },
  };

  const result = await runAgent(input);
  console.log(JSON.stringify(result, null, 2));
}
