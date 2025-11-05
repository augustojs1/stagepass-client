import { refreshTokenAction } from "@/actions";

export class APIClient {
  async fetch<T>(url: string, options: RequestInit = {}, retried = false) {
    const res = await fetch(url, { ...options });

    if (res.status === 401) {
      await refreshTokenAction();
    }

    // if (res.status === 401 && !retried) {
    //   const refresh = await fetch("/api/refresh", { credentials: "include" });

    //   if (refresh.ok) return this.fetch<T>(url, options, true);

    //   window.location.href = "/login";

    //   throw new Error("Unauthorized");
    // }

    // if (!res.ok) throw new Error(await res.text());
    // return res.json() as Promise<T>;

    return res;
  }
}

export const apiClient = new APIClient();
