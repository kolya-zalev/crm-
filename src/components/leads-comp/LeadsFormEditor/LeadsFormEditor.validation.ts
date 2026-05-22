import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Enter your name" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(1, { message: "Enter company" }),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
  phone: z.string(),
  tags: z.array(z.string()),
  notes: z.string(),
  source: z.string(),
});
