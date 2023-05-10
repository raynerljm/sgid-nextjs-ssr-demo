import { store } from "@/lib/store";
import { sgidClient } from "@/lib/sgidClient";
import { cookies } from "next/headers";

const getAndStoreUserInfo = async (code: string, sessionId: string) => {
  const { accessToken } = await sgidClient.callback(code);
  const { data } = await sgidClient.userinfo(accessToken);
  const newSession = {
    ...store.get(sessionId),
    data,
  };
  store.set(sessionId, { ...store.get(sessionId), data });
  return newSession;
};

export default async function Callback({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const code = searchParams?.code;
  const sessionId = cookies().get("sessionId")?.value;

  if (!code) {
    throw new Error(
      "Authorization code is not present in the url search params"
    );
  } else if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies");
  }

  const { state, data: userInfo } = await getAndStoreUserInfo(code, sessionId);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white bg-opacity-20 rounded-md p-4 flex flex-col gap-4">
        <div className="text-white">Successfully logged in!</div>

        <div>
          <div>Ice cream flavour:</div>
          <div>{state}</div>
        </div>
        <div>
          <div>User info retrieved:</div>
          <div>{JSON.stringify(userInfo)}</div>
        </div>

        <a href="/user-info">View user info</a>
      </div>
    </main>
  );
}
