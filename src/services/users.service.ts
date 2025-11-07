import { apiClient } from "@/lib";
import type { User } from "@/models";

export class UsersService {
  private static readonly BASE_URL = process.env.API_URL;

  static async getMe(accessToken: string) {
    return apiClient.fetch<User>(`${this.BASE_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `x-access-token=${accessToken}`,
      },
      next: {
        revalidate: 0,
      },
    });
  }
}
