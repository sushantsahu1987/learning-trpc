import { adminProcedure, t } from "../trpc";
import { userRouter } from "./user";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  log: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("not a string");
    })
    .mutation((req) => {
      console.log("req.ctx.isAdmin : ", req.ctx.isAdmin);
      console.log(`Got ${req.input} from client`);
      return true;
    }),
  user: userRouter,
  secretData: adminProcedure.query(({ ctx }) => {
    console.log("ctx.user : ", ctx.user);
    return "secret data sauce";
  }),
  getCompanies: t.procedure.query(async ({ ctx }) => {
    const companies = await ctx.db
      .collection("companies")
      .find()
      .toArray();
    return companies;
  }),
  getEducation: t.procedure.query(async ({ctx}) => {
    const education = await ctx.db
      .collection("education")
      .findOne()
    return education;
  })

});
