import * as z from "zod";

export const schemaLogin = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6, {message: 'Min 6 characters'}),
})

export const schemaRegister = schemaLogin.extend({
    name: z.string().min(2, {message: "Min 2 characters"})
})

export type LoginFormValues = z.infer<typeof schemaLogin>;
export type RegisterFormValues = z.infer<typeof schemaRegister>;