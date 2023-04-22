import { z } from "zod";
import { procedure, router, adminProcedure } from "../trpc";

export const appRouter = router({
  hello: adminProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (context) => {
      console.log("_app user: ", context.ctx.user);
      console.log("_app permissions: ", context.ctx.permissions);

      const education = await context.ctx.db.collection("education").findOne();
      console.log("education: ", education);

      const { input } = context;
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
