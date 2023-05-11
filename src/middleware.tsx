import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  switch (req.nextUrl.pathname) {
    case "/login":
      // Check if session ID is present in cookie
      if (req.cookies.get("sessionId")) {
        return NextResponse.next();
      }

      // Generate new session ID
      const sessionId = uuidv4();

      // Store state in memory
      store.set(sessionId, {});

      // Set session ID in cookie
      const loginRes = NextResponse.next();
      loginRes.cookies.set({
        name: "sessionId",
        value: sessionId,
        httpOnly: true,
      });
      return loginRes;
    case "/logout":
      const logoutRes = NextResponse.next();
      logoutRes.cookies.delete("sessionId");
      return logoutRes;
  }
}
