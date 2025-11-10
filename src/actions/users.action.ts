"use server";

import { cookies } from "next/headers";

import { UsersService } from "@/services";
import { APIError } from "@/lib";
import type { ApiResponse, User } from "@/models";

export async function getMe(): Promise<ApiResponse<User>> {
  const cookieStore = await cookies();

  try {
    const accessToken = cookieStore.get("x-access-token")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized!");
    }

    const { data } = await UsersService.getMe();

    return {
      success: true,
      message: "Successfully get user!",
      data: data,
    };
  } catch (error: unknown) {
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
