import { z } from "zod";

export const schemaLeadImport = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  company: z.string().min(1),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
  phone: z.string().min(3).optional(),
  tags: z.array(z.string()),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type LeadImport = z.infer<typeof schemaLeadImport>;
