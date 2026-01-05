import { APIError } from "@/lib";
import { ApiResponse, EventCategory } from "@/models";
import { CategoriesService } from "@/services/categories.service";

export async function getEventCategories(): Promise<
  ApiResponse<EventCategory[]>
> {
  try {
    const { data } = await CategoriesService.getCategories();

    return {
      success: true,
      message: "Successfully get categories!",
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
