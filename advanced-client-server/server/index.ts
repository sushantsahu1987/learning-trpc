import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./context";

const app = express();
app.use(cors({ origin: "http://localhost:3001" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3001, () => {
  console.log("server listening on port 3001");
});

export type AppRouter = typeof appRouter;
