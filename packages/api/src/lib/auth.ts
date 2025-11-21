import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { sendError } from "./http.js";

const TOKEN_COOKIE = "vibe_session";
const DEFAULT_EXPIRATION = "4h";

function resolveSecret(
  value: string | undefined,
  fallback: string,
  name: "COOKIE_SECRET" | "JWT_SECRET"
) {
  if (process.env.NODE_ENV === "production" && !value) {
    throw new Error(`${name} must be configured in production`);
  }
  return value ?? fallback;
}

const cookieSecret = resolveSecret(
  process.env.COOKIE_SECRET,
  "vibe_cookie_secret",
  "COOKIE_SECRET"
);

const jwtSecret = resolveSecret(
  process.env.JWT_SECRET,
  "development_secret",
  "JWT_SECRET"
);

export type SessionPayload = {
  sub: string;
  roles?: string[];
};

export const registerAuth: FastifyPluginAsync = fp(async (app) => {
  await app.register(fastifyCookie, {
    hook: "onRequest",
    secret: cookieSecret,
    parseOptions: {
      httpOnly: true,
      sameSite: "strict"
    }
  });

  await app.register(fastifyJwt, {
    secret: jwtSecret,
    cookie: {
      cookieName: TOKEN_COOKIE,
      signed: false
    }
  });

  app.decorate(
    "authenticate",
    async (req: any, reply: any) => {
      try {
        await req.jwtVerify();
      } catch {
        reply.clearSession?.();
        return sendError(reply, { message: "Não autorizado", status: 401 });
      }
    }
  );

  app.decorateReply(
    "setSession",
    async function setSession(this: any, payload: SessionPayload) {
      const token = await this.jwtSign(payload, {
        expiresIn: DEFAULT_EXPIRATION
      });

      this.setCookie(TOKEN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 4
      });
    }
  );

  app.decorateReply(
    "clearSession",
    function clearSession(this: any) {
      this.clearCookie(TOKEN_COOKIE, { path: "/" });
    }
  );
});
