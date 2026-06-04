export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  tags: string[];
  notes?: string;
  source?: string;
};

export type Note = {
  id: string;
  leadId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  leadId: string;
  type:
    | "lead_created"
    | "status_changed"
    | "note_added"
    | "note_deleted"
    | "lead_updated";
  description: string;
  createdAt: string;
};
