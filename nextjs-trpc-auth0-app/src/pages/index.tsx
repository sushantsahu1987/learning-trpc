import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export default function Home() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  console.log(user, isLoading, error);

  return (
    <main className="flex justify-center items-center h-screen space-x-4">
      {!user && (
        <a
          className="border border-2 px-4 text-white bg-black py-2"
          href="/api/auth/login"
        >
          Login
        </a>
      )}
      {user && (
        <a
          className="border border-2 px-4 text-white bg-black py-2"
          href="/api/auth/logout"
        >
          Logout
        </a>
      )}

      {user && (
        <button
          className="border border-2 px-4 text-white bg-black py-2"
          onClick={() => {
            router.push("/hello");
          }}
        >
          Hello
        </button>
      )}
    </main>
  );
}
