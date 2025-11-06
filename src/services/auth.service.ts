import { apiClient } from "@/lib";
import { FetchResponse, LoginResponse, SignUpPayload } from "@/models";

export class AuthService {
  private static readonly BASE_URL = process.env.API_URL;

  static async signIn(
    formData: FormData
  ): Promise<FetchResponse<LoginResponse>> {
    return apiClient.fetch<LoginResponse>(
      `${this.BASE_URL}/api/v1/auth/local/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      }
    );
  }

  static async signUp(
    payload: SignUpPayload
  ): Promise<FetchResponse<LoginResponse>> {
    return apiClient.fetch(`${this.BASE_URL}/api/v1/auth/local/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async refreshToken(refreshToken: string): Promise<FetchResponse<any>> {
    return apiClient.fetch(`${this.BASE_URL}/api/v1/auth/local/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `x-refresh-token=${refreshToken}`,
      },
      next: {
        revalidate: 0,
      },
    });
  }
}
