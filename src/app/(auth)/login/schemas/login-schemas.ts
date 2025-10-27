import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Value must be a valid e-mail."),
  password: z.string().min(6, "Password must have at least 6 characters."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
