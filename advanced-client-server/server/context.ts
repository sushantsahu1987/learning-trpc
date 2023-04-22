import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import  ConnectionDb from './db'

export async function createContext({ req, res }: CreateExpressContextOptions) {

  const cd = await ConnectionDb.getInstance()
  const db = cd.getDb()
  return {
    req,
    res,
    isAdmin: true,
    db
  };
}