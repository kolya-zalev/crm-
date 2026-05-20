export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  tags: string[];
  notes: string;
  source?: string;
};


