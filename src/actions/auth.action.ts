"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AuthService } from "@/services";
import { loginSchema } from "@/schemas";
import { FetchResponse, LoginResponse, SignUpPayload } from "@/models";

export async function loginAction(
  formData: FormData
): Promise<FetchResponse<LoginResponse>> {
  loginSchema.safeParse(Object.fromEntries(formData));

  const cookieStore = await cookies();

  try {
    const res = await AuthService.signIn(formData);

    if (!res.ok) {
      const errorBody = await res.json();

      const response = {
        success: false,
        message: errorBody.message,
        data: null,
      };

      return response;
    }

    const body = (await res.json()) as LoginResponse;

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

    revalidatePath("/");
  } catch (error) {
    console.log("loginAction error::", error);

    return {
      success: false,
      message: "An error has occured while signing you in.",
      data: null,
    };
  }

  redirect(`/`);
}

export async function signUpAction(
  payload: SignUpPayload
): Promise<FetchResponse<LoginResponse>> {
  try {
    const res = await AuthService.signUp(payload);

    if (!res.ok) {
      const errorBody = await res.json();

      const response = {
        success: false,
        message: errorBody.message,
        data: null,
      };

      return response;
    }

    const body = (await res.json()) as LoginResponse;

    return {
      success: true,
      message: null,
      data: body,
    };
  } catch (error) {
    console.error("signUpAction error::", error);

    return {
      success: false,
      message: "An error has occured while signing you in.",
      data: null,
    };
  }
}

export async function refreshTokenAction() {
  const cookieStore = await cookies();

  try {
    const refreshTokenCookie = cookieStore.get("x-refresh-token")?.value;

    if (!refreshTokenCookie) {
      throw new Error("Unauthorized!");
    }

    const res = await AuthService.refreshToken(refreshTokenCookie);

    if (res.status === 401) {
      cookieStore.delete("x-access-token");
      cookieStore.delete("x-refresh-token");
    }

    if (res.ok) {
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
    }
  } catch (error) {
    console.log("refreshToken error::", error);
  }
}
