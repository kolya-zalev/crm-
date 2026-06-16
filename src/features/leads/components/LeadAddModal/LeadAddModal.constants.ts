import { LeadAddFormValues } from "@/validators";

export const LeadFormDefaultValues: LeadAddFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "new",
  tags: [],
  notes: "",
  source: "",
};

export const LeadStatusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
] as const;
