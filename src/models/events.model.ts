import { z } from "zod";

import { parseLocalDateTime } from "@/lib";

export const ticketSchema = z
  .object({
    name: z.string().min(2, "Ticket name must have at least 2 characters."),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    amount: z.number().min(0, "Price must be 0 or greater"),
  })
  .required();

export const createEventFormData = z
  .object({
    name: z.string().min(2, "Event name must have at least 2 characters."),
    description: z
      .string()
      .min(2, "Event description must have at least 6 characters."),
    event_category_id: z.string().min(1, "Category is required."),
    zipcode: z.string().min(5, "Zipcode must have at least 5 characters."),
    address_street: z
      .string()
      .min(6, "Address password must have at least 6 characters."),
    address_neighborhood: z
      .string()
      .min(6, "Neighborhood password must have at least 6 characters."),
    address_district: z
      .string()
      .min(5, "District password must have at least 5 characters."),
    country_id: z.string().min(1, "Country is required."),
    address_number: z
      .string()
      .min(2, "Event complement must have at least 2 characters."),
    starts_at: z.string().min(1, "Start date is required."),
    startHour: z.string().min(1, "Start hour is required."),
    ends_at: z.string().min(1, "End date is required."),
    endHour: z.string().min(1, "End hour is required."),
    is_free: z.boolean().default(false),
    event_tickets: z
      .array(ticketSchema)
      .min(1, "At least one ticket is required"),
  })
  .required()
  .superRefine((data, ctx) => {
    const hasStartDate = !!data.starts_at;
    const hasEndDate = !!data.ends_at;

    if (hasStartDate && hasEndDate) {
      if (data.ends_at < data.starts_at) {
        ctx.addIssue({
          code: "custom",
          path: ["ends_at"],
          message: "End date must be after start date.",
        });
        return;
      }
    }

    const sameDay =
      hasStartDate && hasEndDate && data.starts_at === data.ends_at;

    if (sameDay && data.startHour && data.endHour) {
      const start = parseLocalDateTime(data.starts_at, data.startHour);
      const end = parseLocalDateTime(data.ends_at, data.endHour);

      if (Number.isNaN(start.getTime())) {
        ctx.addIssue({
          code: "custom",
          path: ["startHour"],
          message: "Invalid start time.",
        });
        return;
      }

      if (Number.isNaN(end.getTime())) {
        ctx.addIssue({
          code: "custom",
          path: ["endHour"],
          message: "Invalid end time.",
        });
        return;
      }

      if (end <= start) {
        ctx.addIssue({
          code: "custom",
          path: ["endHour"],
          message: "End time must be after start time.",
        });
      }
    }
  });

export type CreateEventFormData = z.infer<typeof createEventFormData>;
