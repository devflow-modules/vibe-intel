import { createClient } from "@supabase/supabase-js";

const isBrowser =
  typeof globalThis !== "undefined" &&
  Boolean((globalThis as { window?: unknown }).window);

if (isBrowser) {
  throw new Error("Supabase admin client não pode ser utilizado no frontend");
}

function resolveSupabaseSecret(value: string | undefined, name: string) {
  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} must be configured in production`);
  }

  throw new Error(`${name} is required to initialize the Supabase client`);
}

const SUPABASE_URL = resolveSupabaseSecret(
  process.env.SUPABASE_URL,
  "SUPABASE_URL"
);
const SUPABASE_SERVICE_ROLE = resolveSupabaseSecret(
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE,
  "SUPABASE_SERVICE_ROLE_KEY"
);

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: {
    persistSession: false
  },
  global: {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          "x-vibe-rls": "enforced"
        }
      })
  }
});
