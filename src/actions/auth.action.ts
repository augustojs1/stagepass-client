"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AuthService } from "@/services";
import { APIError, isNextRedirectError } from "@/lib";
import { loginSchema } from "@/schemas";
import type { ApiResponse, LoginResponse, SignUpPayload } from "@/models";

export async function loginAction(
  formData: FormData
): Promise<ApiResponse<LoginResponse>> {
  loginSchema.safeParse(Object.fromEntries(formData));

  const cookieStore = await cookies();

  try {
    const { headers } = await AuthService.signIn(formData);

    const setCookieHeaders = headers.get("set-cookie")!;

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

    revalidatePath("/");
    redirect("/");
  } catch (error: unknown) {
    if (isNextRedirectError(error)) throw error;

    if (error instanceof APIError) {
      return {
        success: false,
        data: error.body,
        message: error.message,
      };
    }

    return {
      success: false,
      data: null,
      message: "An error has occured!",
    };
  }
}

export async function signUpAction(
  payload: SignUpPayload
): Promise<ApiResponse<LoginResponse>> {
  const cookieStore = await cookies();

  try {
    const { headers } = await AuthService.signUp(payload);

    const setCookieHeaders = headers.get("set-cookie")!;

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

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if (isNextRedirectError(error)) throw error;

    if (error instanceof APIError) {
      return {
        success: false,
        data: error.body,
        message: error.message,
      };
    }

    return {
      success: false,
      data: null,
      message: "An error has occured!",
    };
  }
}

export async function refreshToken() {
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

    return {
      ok: true,
    };
  } catch (error) {
    if (isNextRedirectError(error)) throw error;

    if (error instanceof APIError) {
      if (error.statusCode === 401) {
        cookieStore.delete("x-access-token");
        cookieStore.delete("x-refresh-token");

        redirect("/login");
      }
    }
  }
}
