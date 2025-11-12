import type { VibeAIRequest, VibeAIResponse } from "./types.js";
/**
 * Executa uma chamada ao modelo OpenAI com tipagem segura.
 * Tenta parsear o retorno em JSON para tipo <T>, se possível.
 */
export declare function ai<T = unknown>(request: VibeAIRequest): Promise<VibeAIResponse & {
    parsed?: T;
}>;
