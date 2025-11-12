import type { VibeRunInput } from "@devflow-modules/vibe-shared";
import { getSkill } from "../skills/index.js";
import type { SkillMap } from "../skills/index.js";

/**
 * Executa skill com tipagem inferida.
 */
export async function runAgent<K extends keyof SkillMap>(
  input: VibeRunInput<K>
): Promise<SkillMap[K]["output"]> {
  const skill = getSkill(input.skill as K);

  input.context.telemetry?.onEvent?.({
    type: "start",
    skill: String(input.skill),
    payload: input.payload,
    timestamp: new Date().toISOString(),
  });

  const result = await skill(input.payload, input.context);

  input.context.telemetry?.onEvent?.({
    type: "finish",
    skill: String(input.skill),
    result,
    timestamp: new Date().toISOString(),
  });

  return result;
}
