"use server";

import { cookies } from "next/headers";

import { FetchResponse, User } from "@/models";

export async function getMe(): Promise<FetchResponse<User>> {
  try {
    const accessTokenCookie = cookies().get("x-access-token");

    if (!accessTokenCookie) {
      throw new Error("Unauthorized!");
    }

    const res = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `x-access-token=${accessTokenCookie.value}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();

      console.log("erroBody getMe::", errorBody);

      const response = {
        success: false,
        message: errorBody.message,
        data: null,
      };

      return response;
    }

    const body = (await res.json()) as User;

    return {
      success: true,
      message: "Successfully signed in!",
      data: body,
    };
  } catch (error: unknown) {
    console.log("getMe instanceof::", error);

    if (error instanceof Error) {
      return { data: null, success: false, message: error.message };
    } else {
      return { data: null, success: false, message: "Erro genérico" };
    }
  }
}
