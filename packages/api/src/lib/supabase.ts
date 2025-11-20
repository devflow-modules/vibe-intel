import { createClient } from "@supabase/supabase-js";

const isBrowser = typeof globalThis !== "undefined" && Boolean((globalThis as { window?: unknown }).window);

if (isBrowser) {
  throw new Error("Supabase admin client não pode ser utilizado no frontend");
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error("Supabase credentials are missing");
}

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
