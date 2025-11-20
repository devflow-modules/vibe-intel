import * as path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";
import type { VibeAIRequest, VibeAIResponse } from "./types.js";

// =========================
// 🌱 Carrega variáveis de ambiente
// =========================
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../.env.local");
dotenv.config({ path: envPath });

const isTestEnv = process.env.NODE_ENV === "test";

const openAiKey = process.env.OPENAI_API_KEY;
if (!openAiKey && !isTestEnv) {
  console.error(`❌ OPENAI_API_KEY não encontrada.
Verifique o arquivo .env.local na raiz (${envPath})`);
  process.exit(1);
}

function createMockClient() {
  return {
    chat: {
      completions: {
        create: async () => ({
          choices: [
            {
              message: {
                content: '{"mocked":true}'
              }
            }
          ]
        })
      }
    }
  };
}

// =========================
// 🤖 Cliente OpenAI
// =========================
const client = isTestEnv
  ? (createMockClient() as unknown as OpenAI)
  : new OpenAI({
      apiKey: openAiKey,
    });

// =========================
// 🧠 Função principal com tipagem genérica
// =========================
/**
 * Executa uma chamada ao modelo OpenAI com tipagem segura.
 * Tenta parsear o retorno em JSON para tipo <T>, se possível.
 */
export async function ai<T = unknown>(
  request: VibeAIRequest
): Promise<VibeAIResponse & { parsed?: T }> {
  const completion = await client.chat.completions.create({
    model: request.model ?? "gpt-4o-mini",
    messages: request.messages,
    temperature: request.temperature ?? 0.2,
    max_tokens: request.maxTokens ?? 2000,
    // ⚠️ Não enviar metadata (gera erro 400 se 'store' não estiver ativo)
  });

  const content = completion.choices?.[0]?.message?.content ?? "";
  let parsed: T | undefined;

  try {
    parsed = JSON.parse(content) as T;
  } catch {
    // conteúdo não é JSON — ignora
  }

  return {
    raw: completion,
    content,
    parsed,
  };
}
