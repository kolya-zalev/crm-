import { z } from "zod";
import { loginSchema, signupSchema } from "./LogSign";

export const updateNameSchema = z.object({
  name: signupSchema.shape.name,
});

export const updateEmailSchema = z.object({
  email: loginSchema.shape.email,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type UpdateNameFormValues = z.infer<typeof updateNameSchema>;
export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
