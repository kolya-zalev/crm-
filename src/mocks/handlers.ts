import { delay, http, HttpResponse } from "msw";
import { fakeLeads, fakeNotes, fakeActivities } from "@/mocks/fakedata";
import { Lead, Note, Activity } from "@/hooks/types";

type IdParam = { id: string };
type NoteIdParam = { id: string; noteId: string };

function getLeads(): Lead[] {
  const data = localStorage.getItem("leads");
  if (!data) {
    localStorage.setItem("leads", JSON.stringify(fakeLeads));
    return [...fakeLeads];
  }
  return JSON.parse(data);
}

function saveLeads(leads: Lead[]): void {
  localStorage.setItem("leads", JSON.stringify(leads));
}

function getNotes(): Note[] {
  const data = localStorage.getItem("notes");
  if (!data) {
    localStorage.setItem("notes", JSON.stringify(fakeNotes));
    return [...fakeNotes];
  }
  return JSON.parse(data);
}

function saveNotes(note: Note[]): void {
  localStorage.setItem("notes", JSON.stringify(note));
}

function getActivities(): Activity[] {
  const data = localStorage.getItem("activity");
  if (!data) {
    localStorage.setItem("activity", JSON.stringify(fakeActivities));
    return [...fakeActivities];
  }
  return JSON.parse(data);
}

function saveActivities(activity: Activity[]): void {
  localStorage.setItem("activity", JSON.stringify(activity));
}

export const handlers = [
  http.get("/api/leads", async () => {
    await delay(1000);
    return HttpResponse.json(getLeads());
  }),

  http.get<IdParam>("/api/leads/:id", async ({ params }) => {
    await delay(1000);
    const { id } = params;
    const foundLead = getLeads().find((lead) => lead.id === id);
    if (!foundLead) {
      return HttpResponse.json(
        {
          error: {
            message: "Lead not Found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }
    return HttpResponse.json(foundLead);
  }),
  http.get<IdParam>("/api/leads/:id/notes", async ({ params }) => {
    await delay(1000);
    const { id } = params;
    const foundNote = getNotes().filter((note) => note.leadId === id);
    return HttpResponse.json(foundNote);
  }),
  http.get<IdParam>("/api/leads/:id/activities", async ({ params }) => {
    await delay(1000);
    const { id } = params;
    const foundActivity = getActivities().filter(
      (activity) => activity.leadId === id,
    );
    return HttpResponse.json(foundActivity);
  }),

  http.post("/api/leads", async ({ request }) => {
    await delay(1000);
    const body = (await request.json()) as Omit<Lead, "id">;
    const newLead: Lead = { ...body, id: crypto.randomUUID() };

    const leads = getLeads();
    leads.push(newLead);
    saveLeads(leads);

    const activities = getActivities();
    activities.push({
      id: crypto.randomUUID(),
      leadId: newLead.id,
      type: "lead_created",
      description: "Lead was created",
      createdAt: new Date().toISOString(),
    });
    saveActivities(activities);
    return HttpResponse.json(newLead, { status: 201 });
  }),

  http.post<IdParam>("/api/leads/:id/notes", async ({ request, params }) => {
    await delay(1000);
    const { id } = params;
    const body = (await request.json()) as { text: string };
    const newNote: Note = {
      id: crypto.randomUUID(),
      leadId: id,
      text: body.text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
    const activities = getActivities();
    activities.push({
      id: crypto.randomUUID(),
      leadId: id,
      type: "note_added",
      description: "Note_added",
      createdAt: new Date().toISOString(),
    });
    saveActivities(activities);
    return HttpResponse.json(newNote, { status: 201 });
  }),

  http.put<IdParam>("/api/leads/:id", async ({ request, params }) => {
    await delay(1000);
    const { id } = params;
    const body = (await request.json()) as Partial<Omit<Lead, "id">>;
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) {
      return HttpResponse.json(
        {
          error: {
            message: "Lead not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }
    const oldLead = leads[index];
    const updated = { ...oldLead, ...body, id: oldLead.id };
    leads[index] = updated;
    saveLeads(leads);

    const activities = getActivities();
    if (body.status && body.status !== oldLead.status) {
      activities.push({
        id: crypto.randomUUID(),
        leadId: id,
        type: "status_changed",
        description: `${oldLead.status} → ${body.status}`,
        createdAt: new Date().toISOString(),
      });
    } else {
      activities.push({
        id: crypto.randomUUID(),
        leadId: id,
        type: "lead_updated",
        description: "Lead was updated",
        createdAt: new Date().toISOString(),
      });
    }
    saveActivities(activities);

    return HttpResponse.json(updated);
  }),

  http.delete<IdParam>("/api/leads/:id", async ({ params }) => {
    await delay(1);
    const { id } = params;
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) {
      return HttpResponse.json(
        {
          error: {
            message: "Lead not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }

    leads.splice(index, 1);
    saveLeads(leads);
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete<NoteIdParam>(
    "/api/leads/:id/notes/:noteId",
    async ({ params }) => {
      await delay(1);
      const { noteId, id } = params;
      const note = getNotes();
      const index = note.findIndex((n) => n.id === noteId);
      if (index === -1) {
        return HttpResponse.json(
          {
            error: {
              message: "Activity not found",
              code: "NOT_FOUND",
            },
          },
          { status: 404 },
        );
      }

      note.splice(index, 1);
      saveNotes(note);
      const activities = getActivities();
      activities.push({
        id: crypto.randomUUID(),
        leadId: id,
        type: "note_deleted",
        description: "Note deleted",
        createdAt: new Date().toISOString(),
      });
      saveActivities(activities);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
