import { APIError } from "@/lib/api-error";
import { FetchResponse } from "@/models";

export class APIClient {
  async fetch<T>(
    url: string,
    options: RequestInit = {},
    retry = true
  ): Promise<FetchResponse<T>> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401 && retry) {
      const res = await fetch(`${BASE_URL}/api/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        return await this.fetch<T>(url, options, false);
      }

      return Promise.reject("Unauthorized");
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new APIError(res.status, body);
    }

    return {
      data: await res.json().catch(() => null),
      headers: res.headers,
      status: res.status,
    };
  }
}

export const apiClient = new APIClient();
