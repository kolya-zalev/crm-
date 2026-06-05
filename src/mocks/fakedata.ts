import { Lead, Note, Activity, Task } from "@/hooks/types";
import { id } from "zod/locales";

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

export const fakeTasks: Task[] = [
  {
    id: "task-1",
    leadId: "1",
    title: "Initial Discovery Call",
    description:
      "Discuss project scope, budget constraints, and preliminary development timelines.",
    status: "completed",
    priority: "high",
    dueDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "task-2",
    leadId: "1",
    title: "Send Commercial Proposal",
    description:
      "Prepare the proposal based on the discovery call and send it via Email/Telegram.",
    status: "pending",
    priority: "high",
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },

  {
    id: "task-3",
    leadId: "2",
    title: "Follow up on Contract Status",
    description:
      "Reach out to the client to check if their legal team has reviewed our draft agreement.",
    status: "pending",
    priority: "medium",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },

  {
    id: "task-4",
    leadId: "3",
    title: "Approve API Integration Specs",
    description:
      "Review the technical specifications sent by the client's CTO. Schedule a quick call with our Tech Lead.",
    status: "pending",
    priority: "high",
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "task-5",
    leadId: "3",
    title: "Issue Invoice for Down Payment",
    description:
      "Generate and send the invoice for the 50% upfront payment for Phase 1.",
    status: "pending",
    priority: "high",
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    createdAt: new Date(Date.now()).toISOString(),
  },

  {
    id: "task-6",
    leadId: "4",
    title: "Add to Marketing Newsletter",
    description:
      "Export contact details to the marketing mailing list for the weekly digest.",
    status: "completed",
    priority: "low",
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },

  {
    id: "task-7",
    leadId: "5",
    title: "Post-Demo Follow-Up",
    description:
      "Get feedback on the trial period. Client is not answering calls—try messaging on WhatsApp.",
    status: "pending",
    priority: "medium",
    dueDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];
