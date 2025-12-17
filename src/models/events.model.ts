import { z } from "zod";

export const ticketSchema = z
  .object({
    name: z.string().min(2, "Ticket name must have at least 2 characters."),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be 0 or greater"),
  })
  .required();

export const createEventFormData = z
  .object({
    name: z.string().min(2, "Event name must have at least 2 characters."),
    description: z
      .string()
      .min(2, "Event description must have at least 6 characters."),
    category: z.string().min(1, "Category is required."),
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
    country: z.string().min(1, "Country is required."),
    number: z
      .string()
      .min(2, "Event complement must have at least 2 characters."),
    startDate: z.string().min(1, "Start date is required."),
    startHour: z.string().min(1, "Start hour is required."),
    endDate: z.string().min(1, "End date is required."),
    endHour: z.string().min(1, "End hour is required."),
    tickets: z.array(ticketSchema).min(1, "At least one ticket is required"),
  })
  .required();

export type CreateEventFormData = z.infer<typeof createEventFormData>;
