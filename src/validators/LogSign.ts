import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
});


export const schemaLogSign = signupSchema;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;

export type LogSign = SignupFormValues;
