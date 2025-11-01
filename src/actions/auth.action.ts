"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { loginSchema } from "@/schemas";
import { FetchResponse, LoginResponse, SignUpPayload } from "@/models";

export async function loginAction(
  formData: FormData
): Promise<FetchResponse<LoginResponse>> {
  loginSchema.safeParse(Object.fromEntries(formData));

  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/auth/local/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      }
    );

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
    const res = await fetch(
      `${process.env.API_URL}/api/v1/auth/local/sign-up`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

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
