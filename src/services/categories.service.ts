import { apiClient } from "@/lib";
import type { EventCategory } from "@/models";

export class CategoriesService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  static async getCategories() {
    return apiClient.fetch<EventCategory[]>(
      `${this.BASE_URL}/api/v1/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
