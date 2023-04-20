import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../server";

console.log("trpc client running");
const client = createTRPCProxyClient<AppRouter>({
  links: [
      loggerLink(),
      httpBatchLink({
          url: "http://localhost:3001/trpc",
          headers: { Authorization: "TOKEN" },
        }),
  ],
});

async function main() {
  const result = await client.sayHi.query();
  console.log(result);
  const result2 = await client.log.mutate("hello");
  console.log(result2);
  const result3 = await client.user.get.query({ userId: "123" });
  console.log(result3);
  const result4 = await client.user.update.mutate({
    userId: "123",
    name: "bob",
  });
  console.log(result4);
  const result5 = await client.secretData.query();
  console.log(result5);
}

main();
