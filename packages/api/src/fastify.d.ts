import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: import("fastify").onRequestHookHandler;
  }

  interface FastifyRequest {
    jwtVerify: () => Promise<void>;
    user?: import("@fastify/jwt").FastifyJWT["payload"];
  }

  interface FastifyReply {
    setSession: (payload: import("./lib/auth").SessionPayload) => Promise<void>;
    clearSession: () => void;
  }
}
