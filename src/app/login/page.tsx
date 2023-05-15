import { redirect } from "next/navigation";
import { sgidClient } from "@/lib/sgidClient";
import { NextSSRPage } from "@/types";
import { cookies } from "next/headers";
import { store } from "@/lib/store";

const handleLogin = async (state: string) => {
  const sessionId = cookies().get("sessionId")?.value || "";

  if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies");
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
