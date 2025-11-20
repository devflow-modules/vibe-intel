import { trace } from "@opentelemetry/api";
import { HealthPayloadSchema, type HealthPayload } from "../../schemas/health/healthSchema.js";

export async function getHealthStatus(): Promise<HealthPayload> {
  const tracer = trace.getTracer("vibe-api");
  const span = tracer.startSpan("health:get-status");

  try {
    const payload: HealthPayload = {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION ?? "v1",
      environment: process.env.NODE_ENV ?? "development"
    };

    return HealthPayloadSchema.parse(payload);
  } finally {
    span.setAttribute("uptime_seconds", process.uptime());
    span.end();
  }
}

