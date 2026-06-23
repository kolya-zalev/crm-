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
