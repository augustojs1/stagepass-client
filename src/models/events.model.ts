import { z } from "zod";

export const createEventFormData = z
  .object({
    name: z.string().min(2, "Event name must have at least 2 characters."),
    description: z
      .string()
      .min(2, "Event description must have at least 6 characters."),
    category: z.string(),
    zipcode: z.string().min(5, "Zipcode must have at least 5 characters."),
    address: z
      .string()
      .min(6, "Address password must have at least 6 characters."),
    neighborhood: z
      .string()
      .min(6, "Neighborhood password must have at least 6 characters."),
    district: z
      .string()
      .min(5, "District password must have at least 5 characters."),
    country: z.string(),
    number: z
      .string()
      .min(2, "Event complement must have at least 2 characters."),
    startDate: z.string(),
    startHour: z.string(),
    endDate: z.string(),
    endHour: z.string(),
  })
  .required();

export type CreateEventFormData = z.infer<typeof createEventFormData>;
