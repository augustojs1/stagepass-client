import { APIError } from "@/lib/api-error";
import { refreshTokenAction } from "@/actions";
import { FetchResponse } from "@/models";

export class APIClient {
  async fetch<T>(
    url: string,
    options: RequestInit = {},
    retried = false
  ): Promise<FetchResponse<T>> {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401 && !retried) {
      await refreshTokenAction();
      return this.fetch<T>(url, options, true);
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new APIError(res.status, body);
    }

    const data = await res.json().catch(() => null);

    return {
      data,
      headers: res.headers,
      status: res.status,
    };
  }
}

export const apiClient = new APIClient();
