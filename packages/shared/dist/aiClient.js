import * as path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";
// =========================
// 🌱 Carrega variáveis de ambiente
// =========================
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../.env.local");
dotenv.config({ path: envPath });
if (!process.env.OPENAI_API_KEY) {
    console.error(`❌ OPENAI_API_KEY não encontrada.
Verifique o arquivo .env.local na raiz (${envPath})`);
    process.exit(1);
}
// =========================
// 🤖 Cliente OpenAI
// =========================
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// =========================
// 🧠 Função principal com tipagem genérica
// =========================
/**
 * Executa uma chamada ao modelo OpenAI com tipagem segura.
 * Tenta parsear o retorno em JSON para tipo <T>, se possível.
 */
export async function ai(request) {
    const completion = await client.chat.completions.create({
        model: request.model ?? "gpt-4o-mini",
        messages: request.messages,
        temperature: request.temperature ?? 0.2,
        max_tokens: request.maxTokens ?? 2000,
        // ⚠️ Não enviar metadata (gera erro 400 se 'store' não estiver ativo)
    });
    const content = completion.choices?.[0]?.message?.content ?? "";
    let parsed;
    try {
        parsed = JSON.parse(content);
    }
    catch {
        // conteúdo não é JSON — ignora
    }
    return {
        raw: completion,
        content,
        parsed,
    };
}
//# sourceMappingURL=aiClient.js.map