import { store } from "@/lib/store";
import { cookies } from "next/headers";

const getUserInfo = async (sessionId: string) => {
  const data = store.get(sessionId)?.data;
  return data;
};

export default async function LoggedIn() {
  const sessionId = cookies().get("sessionId")?.value;

  if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies");
  }

  const userInfo = await getUserInfo(sessionId);
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div>User info retrieved:</div>
      <div>{JSON.stringify(userInfo)}</div>
    </main>
  );
}
