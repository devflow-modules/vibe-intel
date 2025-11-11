import { ai } from "@devflow-modules/vibe-shared";
import { detectIntent } from "./intent.js";
import * as skills from "../skills/index.js";
export async function runTask(input) {
    const intent = await detectIntent(input);
    const fallbackSkill = skills["default"] || Object.values(skills)[0];
    const skill = skills[intent] ?? fallbackSkill;
    return await skill.execute({ ai, input });
}
