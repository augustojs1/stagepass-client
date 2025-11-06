import { apiClient } from "@/lib";
import { LoginResponse, SignUpPayload } from "@/models";

export class AuthService {
  private static readonly BASE_URL = process.env.API_URL;

  static async signIn(formData: FormData) {
    return apiClient.fetch<LoginResponse>(
      `${this.BASE_URL}/api/v1/auth/local/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      }
    );
  }

  static async signUp(payload: SignUpPayload): Promise<Response> {
    const res = await fetch(`${this.BASE_URL}/api/v1/auth/local/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return res;
  }

  static async refreshToken(refreshToken: string): Promise<Response> {
    const res = await fetch(`${this.BASE_URL}/api/v1/auth/local/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `x-refresh-token=${refreshToken}`,
      },
      next: {
        revalidate: 0,
      },
    });

    return res;
  }
}
