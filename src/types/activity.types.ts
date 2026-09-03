export type Activity = {
  id: string;
  leadId: string;
  type:
    | "lead_created"
    | "status_changed"
    | "note_added"
    | "note_deleted"
    | "lead_updated"
    | "assigned";
  description: string;
  createdAt: string;
};
