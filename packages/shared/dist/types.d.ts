export type VibeModel = "gpt-4o-mini" | "gpt-4o" | "gpt-4-turbo";
export interface VibeAIMessage {
    role: "system" | "user" | "assistant";
    content: string;
}
export interface VibeAIRequest {
    model?: VibeModel;
    messages: VibeAIMessage[];
    temperature?: number;
    maxTokens?: number;
    skill?: string;
    env?: string;
}
export interface VibeAIResponse {
    raw: unknown;
    content: string;
}
export interface VibeTelemetryEvent {
    type: "start" | "finish" | "error";
    skill: string;
    payload?: unknown;
    result?: unknown;
    error?: unknown;
    timestamp: string;
}
export interface VibeSkillContext {
    env: "local" | "ci" | "cloud";
    model?: VibeModel;
    projectRoot?: string;
    telemetry?: {
        onEvent?(event: VibeTelemetryEvent): void;
    };
}
export interface SkillMapBase {
}
/**
 * Entrada genérica para execução de uma skill.
 * O tipo de payload e output é inferido automaticamente do SkillMapBase.
 */
export interface VibeRunInput<K extends keyof SkillMapBase = keyof SkillMapBase> {
    skill: K;
    payload: SkillMapBase[K]["input"];
    context: VibeSkillContext;
}
