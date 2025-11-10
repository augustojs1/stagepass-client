import { apiClient } from "@/lib";
import type { User } from "@/models";

export class UsersService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  static async getMe() {
    return apiClient.fetch<User>(`${this.BASE_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });
  }
}
