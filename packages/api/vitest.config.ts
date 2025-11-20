import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"]
    }
  },
  resolve: {
    alias: {
      "@devflow-modules/vibe-core": path.resolve(__dirname, "../core/src/index.ts"),
      "@devflow-modules/vibe-shared": path.resolve(__dirname, "../shared/src/index.ts")
    }
  }
});

