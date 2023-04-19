// "dev:tsnd": "tsnd --respawn index.ts",
// "build:tsnd": "tsc --project tsconfig.json"

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

async function main() {
  const users = await trpc.getUser.query("sushant");
  console.log("Users:", users);

  const createdUser = await trpc.createUser.mutate({ name: "sushant" });
  console.log("Created user:", createdUser);
}

console.log("Client started");
main()
