import { beforeAll, afterEach } from "vitest";

beforeAll(() => {
  process.env.JWT_SECRET ??= "test-secret";
  process.env.COOKIE_SECRET ??= "cookie-secret";
  process.env.APP_VERSION ??= "test";
});

afterEach(() => {
  vi.restoreAllMocks();
});

