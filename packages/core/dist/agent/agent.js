import { ai } from "@devflow-modules/vibe-shared";
import { detectIntent } from "./intent";
import { skills } from "../skills";
export async function runTask(input) {
    const intent = await detectIntent(input);
    const skill = skills[intent] ?? skills.review;
    const result = await skill({ ai, input });
    return { intent, result };
}
