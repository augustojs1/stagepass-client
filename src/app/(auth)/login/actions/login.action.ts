"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { loginSchema, signUpSchema } from "@/app/(auth)/login/schemas";
import { FetchResponse, LoginResponse } from "@/app/models";

export async function loginAction(
  formData: FormData
): Promise<FetchResponse<LoginResponse>> {
  loginSchema.safeParse(Object.fromEntries(formData));

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

export async function signUpAction(formData: FormData) {
  // signUpSchema.safeParse(Object.fromEntries(formData));

  console.log(
    "formData payload::",
    JSON.stringify(Object.fromEntries(formData))
  );

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/auth/local/sign-up`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      }
    );

    const body = await res.json();

    console.log("body::", body);

    if (!res.ok) {
      const response = {
        success: false,
        message: body.message,
        data: null,
      };

      return response;
    }
  } catch (error) {
    //
    console.log("error::", error);
  }
}
