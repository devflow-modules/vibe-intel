import type { VibeSkillContext, SkillMapBase } from "@devflow-modules/vibe-shared";
import type { CodeReviewInput, CodeReviewResult } from "./code_review.js";

/**
 * 🔧 Extende o SkillMapBase do shared com as skills locais.
 * Isso torna as skills visíveis em todo o monorepo.
 */
declare module "@devflow-modules/vibe-shared" {
  interface SkillMapBase {
    code_review: {
      input: CodeReviewInput;
      output: CodeReviewResult;
    };
  }
}

// Mapa resultante após o merge
export type SkillMap = SkillMapBase;

/**
 * Runner genérico por skill — cada skill tem input/output tipados.
 */
export type SkillRunner<K extends keyof SkillMap> = (
  payload: SkillMap[K]["input"],
  ctx: VibeSkillContext
) => Promise<SkillMap[K]["output"]>;

/**
 * Registro das skills disponíveis no core.
 */
const skills: { [K in keyof SkillMap]: SkillRunner<K> } = {
  code_review: async (payload, ctx) => {
    const { runCodeReview } = await import("./code_review.js");
    return runCodeReview(payload, ctx);
  },
};

/**
 * Retorna o runner tipado de uma skill específica.
 */
export function getSkill<K extends keyof SkillMap>(name: K): SkillRunner<K> {
  const skill = skills[name];
  if (!skill) throw new Error(`Skill not found: ${String(name)}`);
  return skill;
}
