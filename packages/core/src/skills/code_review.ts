import { z } from "zod";
import { ai } from "@devflow-modules/vibe-shared";
import type { VibeSkillContext } from "@devflow-modules/vibe-shared";

// Estrutura de cada arquivo avaliado
const FileSchema = z.object({
  path: z.string(),
  content: z.string(),
});

// Entrada esperada da skill (sem defaults, obrigatória)
export const CodeReviewInputSchema = z.object({
  files: z.array(FileSchema).min(1, "Deve haver pelo menos um arquivo"),
  language: z.enum(["typescript", "javascript", "python", "java", "csharp"]),
  framework: z.string().optional(),
  focus: z.array(
    z.enum(["bugs", "style", "performance", "security", "architecture"])
  ),
})

/**
 * ✅ Tipo inferido *após* defaults do Zod.
 * Agora `language` e `focus` são opcionais também no TypeScript.
 */
export type CodeReviewInput = z.output<typeof CodeReviewInputSchema>;

export interface CodeReviewFinding {
  file: string;
  severity: "info" | "minor" | "major" | "critical";
  line?: number;
  message: string;
  suggestion?: string;
}

export interface CodeReviewResult {
  summary: string;
  findings: CodeReviewFinding[];
  metrics: {
    filesCount: number;
    chars: number;
  };
}

/**
 * 🔍 Skill principal de revisão de código
 * Analisa os arquivos recebidos e retorna um relatório técnico
 */
export async function runCodeReview(
  payload: CodeReviewInput,
  ctx: VibeSkillContext
): Promise<CodeReviewResult> {
  const input = CodeReviewInputSchema.parse(payload);

  const combined = input.files
    .map((f) => `// FILE: ${f.path}\n${f.content}`)
    .join("\n\n");

  const chars = combined.length;
  const now = new Date().toISOString();

  ctx.telemetry?.onEvent?.({
    type: "start",
    skill: "code_review",
    payload: {
      files: input.files.map((f) => f.path),
      language: input.language,
      framework: input.framework,
      focus: input.focus,
      chars,
    },
    timestamp: now,
  });

  const systemPrompt = [
    "You are a senior software engineer performing a strict code review.",
    `Language: ${input.language}`,
    input.framework ? `Framework: ${input.framework}` : "",
    `Focus: ${input.focus.join(", ")}`,
    "Return a JSON with: summary, findings[].{file,severity,line,message,suggestion}",
  ]
    .filter(Boolean)
    .join("\n");

  const { content } = await ai({
    model: ctx.model ?? "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: combined.slice(0, 15000) },
    ],
    skill: "code_review",
    env: ctx.env,
  });

  let parsed: CodeReviewResult;
  try {
    parsed = JSON.parse(content) as CodeReviewResult;
  } catch {
    parsed = {
      summary: content.slice(0, 2000),
      findings: [],
      metrics: {
        filesCount: input.files.length,
        chars,
      },
    };
  }

  ctx.telemetry?.onEvent?.({
    type: "finish",
    skill: "code_review",
    result: parsed,
    timestamp: new Date().toISOString(),
  });

  return parsed;
}
