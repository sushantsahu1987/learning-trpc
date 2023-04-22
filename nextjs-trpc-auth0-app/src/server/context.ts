import { getSession } from "@auth0/nextjs-auth0";
import { inferAsyncReturnType } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const db = "database";
  const session = await getSession(req, res);
  // console.log("session accessToken: ", session?.accessToken);
  // console.log("session idToken: ", session?.idToken);
  console.log("context session creation:");
  return {
    access_token: session?.accessToken,
    id_token: session?.idToken,
    db,
    // req,
    // res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
