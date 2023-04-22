import { TRPCError, initTRPC } from "@trpc/server";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import jwt_decode from "jwt-decode";
import SDK from "../sdk";

import { Context } from "./context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export interface JwtPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
}

export interface TokenPayload {
  nickname: string;
  name: string;
  picture: string;
  updated_at: Date;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
  nonce: string;
}

const promisifyJwt = (
  access_token: string,
  signingKey: string
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(access_token, signingKey, function (err: any, decoded: any) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

const isAdminMiddleware = t.middleware(async ({ ctx, next }) => {
  const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://ssahu.eu.auth0.com/.well-known/jwks.json",
  });
  const kid = "OEExQUNGMjQwMjg2NzRBNzQxNTg0NTFEQTMxNEY2MkQ2MUE0N0M4MA";
  const key: any = await client.getSigningKey(kid);
  const signingKey = key.publicKey || key.rsaPublicKey;
  const jwt_decoded = jwt_decode<TokenPayload>(ctx.id_token || "");
  // const sdk = new SDK();
  // try {
  //   const result = await sdk.getUserByEmail(jwt_decoded.email);
  //   if (result) {
  //     const user = result[0];
  //     const role = await sdk.getUserRole(user.user_id || "")
  //     console.log(role)
  //   }
  // } catch (error) {
  //   throw new TRPCError({ code: "UNAUTHORIZED" });
  // }

  try {
    const decoded = await promisifyJwt(ctx.access_token || "", signingKey);
    const permissions = decoded.permissions;
    return next({
      ctx: {
        user: { email: jwt_decoded.email, name: jwt_decoded.name },
        permissions,
      },
    });
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const adminProcedure = t.procedure.use(isAdminMiddleware);
