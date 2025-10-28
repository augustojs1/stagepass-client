import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must have at least 6 characters."),
    lastName: z.string().min(2, "Last name must have at least 6 characters."),
    email: z.email("Value must be a valid e-mail."),
    password: z.string().min(6, "Password must have at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must have at least 6 characters."),
  })
  .required()
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password does not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignInFormData = z.infer<typeof signUpSchema>;
