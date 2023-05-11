import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sgidClient } from "@/lib/sgidClient";
import { store } from "@/lib/store";
import { NextSSRPage } from "@/types";

const handleLogin = async (state: string) => {
  // Get session ID from cookie
  const sessionId = cookies().get("sessionId")?.value || "";

  // Handle edge case
  if (!sessionId) {
    redirect("/");
  }

  // Store state in memory
  store.set(sessionId, { state: String(state) });

  // Generate authorization url
  const { url } = sgidClient.authorizationUrl(
    String(state),
    "openid myinfo.name",
    null
  );

  redirect(url);
};

export default async function Login({ searchParams }: NextSSRPage) {
  await handleLogin(searchParams?.state || "");
  return <></>;
}
