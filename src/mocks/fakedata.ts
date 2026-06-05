import { Lead, Note, Activity } from "@/hooks/types";

export const fakeLeads: Lead[] = [
  {
    id: "1",
    name: "Kolya",
    email: "kolaov356@gmail.com",
    phone: "+380986359129",
    company: "Home",
    status: "new",
    tags: [],
    notes: "yes",
    source: "no",
  },
  {
    id: "2",
    name: "John",
    email: "johnexample@gmail.com",
    phone: "",
    company: "mcdonalds",
    status: "contacted",
    tags: [],
    notes: "test",
  },
  {
    id: "3",
    name: "Alex",
    email: "Alexexample@gmail.com",
    phone: "+44444444",
    company: "Apple",
    status: "qualified",
    tags: [],
    notes: "yes",
    source: "no",
  },
  {
    id: "4",
    name: "Mark",
    email: "markexample@gmail.com",
    phone: "+1241241124",
    company: "adidas",
    status: "won",
    tags: [],
    notes: "test",
  },
  {
    id: "5",
    name: "Adam",
    email: "adamexample@gmail.com",
    phone: "+8777777777",
    company: "Sony",
    status: "lost",
    tags: ["1"],
    notes: "yes",
    source: "no",
  },
];

export const fakeNotes: Note[] = [
  {
    id: "note-1",
    leadId: "1",
    text: "Initial contact via LinkedIn",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "note-2",
    leadId: "2",
    text: "Sent proposal email",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "note-3",
    leadId: "3",
    text: "Replied, interested",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export const fakeActivities: Activity[] = [
  {
    id: "activity-1",
    leadId: "1",
    type: "lead_created",
    description: "Lead was created",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "activity-2",
    leadId: "2",
    type: "status_changed",
    description: "new → contacted",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "activity-3",
    leadId: "3",
    type: "note_added",
    description: "Initial contact",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
