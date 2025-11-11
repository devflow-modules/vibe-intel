import { ai, type VibeRunInput } from "@devflow-modules/vibe-shared";
import { detectIntent } from "./intent.js";
import * as skills from "../skills/index.js";

export async function runTask(input: VibeRunInput) {
  const intent = await detectIntent(input);
  const fallbackSkill = (skills as Record<string, any>)["default"] || Object.values(skills)[0];
  const skill = (skills as Record<string, any>)[intent] ?? fallbackSkill;
  return await skill.execute({ ai, input });
}
