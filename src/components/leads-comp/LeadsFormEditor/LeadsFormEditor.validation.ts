import * as z from "zod";

export const schemaLeadAdd = z.object({
  name: z.string().min(3, { message: "Enter your name" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(1, { message: "Enter company" }),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
  phone: z.string().optional(),
  tags: z.array(z.string()),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type LeadAddFormValues = z.infer<typeof schemaLeadAdd>;
