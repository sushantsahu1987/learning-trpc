import { inferAsyncReturnType } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const db = "database"
  return { req, res, db };
}

export type Context = inferAsyncReturnType<typeof createContext>;
