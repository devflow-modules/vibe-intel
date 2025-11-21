/**
 * @file Telemetria base (OpenTelemetry + OTLP HTTP Exporter)
 * Responsável por inicializar tracing, spans e métricas
 * em todos os pacotes (API, Core, CLI, etc.)
 */

import process from "node:process";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { createLogger } from "./logging.js";

let sdk: NodeSDK | null = null;
const baseLogger = createLogger("telemetry");

/**
 * Inicializa a telemetria base da aplicação.
 * @param serviceName Nome lógico do serviço (ex: vibe-api, vibe-core)
 */
export async function setupTelemetry(serviceName: string) {
  const log = baseLogger.child({ service: serviceName });
  const enabled = process.env.OTEL_ENABLED === "true";
  if (!enabled) {
    log.info({ msg: "telemetry:disabled" });
    return;
  }

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

  const exporter = new OTLPTraceExporter({
    url:
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
      "https://api.honeycomb.io/v1/traces",
    headers: process.env.OTEL_EXPORTER_OTLP_HEADERS
      ? Object.fromEntries(
          process.env.OTEL_EXPORTER_OTLP_HEADERS.split(",").map((p) =>
            p.split("=")
          )
        )
      : undefined,
  });

  sdk = new NodeSDK({
    traceExporter: exporter,
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
        process.env.NODE_ENV || "development",
      [SemanticResourceAttributes.SERVICE_VERSION]:
        process.env.npm_package_version || "0.1.0",
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  try {
    await sdk.start();
    log.info({
      msg: "telemetry:initialized",
      endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    });
  } catch (err) {
    log.error({ msg: "telemetry:init_failed", err });
  }

  // graceful shutdown
  const shutdown = async () => {
    log.info({ msg: "telemetry:shutdown_start" });
    await sdk?.shutdown().catch((err) =>
      log.error({ msg: "telemetry:shutdown_error", err })
    );
    process.exit(0);
  };

  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
}

/**
 * Encerramento manual (ex: testes, scripts)
 */
export async function shutdownTelemetry() {
  if (sdk) {
    await sdk.shutdown();
    baseLogger.info({ msg: "telemetry:shutdown_complete" });
  }
}
