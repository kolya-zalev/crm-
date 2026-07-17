import { z } from "zod";

export const teamInviteSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["admin", "manager", "member"], {
    message: "Role is required",
  }),
});

export type TeamInvite = z.infer<typeof teamInviteSchema>;
