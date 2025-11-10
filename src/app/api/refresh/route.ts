import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { APIError, isNextRedirectError } from "@/lib";

export async function POST() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const cookieStore = await cookies();

  try {
    const refreshTokenCookie = cookieStore.get("x-refresh-token")?.value;

    if (!refreshTokenCookie) {
      throw new Error("Unauthorized!");
    }

    const res = await fetch(`${BASE_URL}/api/v1/auth/local/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: `x-refresh-token=${refreshTokenCookie}`,
      },
    });

    const setCookieHeaders = res.headers.get("set-cookie");

    if (setCookieHeaders) {
      const cookieList = setCookieHeaders.split(",");

      cookieList.forEach(async (cookie) => {
        const [cookiePair] = cookie.split(";");
        const [name, value] = cookiePair.split("=");

        if (name && value) {
          cookieStore.set(name.trim(), value.trim(), {
            path: "/",
            httpOnly: true,
          });
        }
      });
    }

    if (res.status === 401) {
      cookieStore.delete("x-access-token");
      cookieStore.delete("x-refresh-token");

      redirect("/login");
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    if (isNextRedirectError(error)) throw error;

    if (error instanceof APIError) {
      if (error.statusCode === 401) {
        cookieStore.delete("x-access-token");
        cookieStore.delete("x-refresh-token");

        redirect("/login");
      }
    }

    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
