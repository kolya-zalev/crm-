import * as z from "zod";

export const schemaLeadAdd = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name is too long" }),

  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(1, { message: "Enter company" }),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
  phone: z.string().min(3, { message: "Phone is too short" }).optional(),

  tags: z.array(z.string()),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type LeadAddFormValues = z.infer<typeof schemaLeadAdd>;
