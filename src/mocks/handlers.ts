import { delay, http, HttpResponse } from "msw";
import { fakeLeads } from "@/mocks/fakedata";
import { Lead } from "@/hooks/types";

type IdParam = { id: string };
function getLeads(): Lead[] {
  const data = localStorage.getItem('leads')
  if(!data){
    localStorage.setItem('leads', JSON.stringify(fakeLeads))
    return [...fakeLeads]
  }
  return JSON.parse(data)
}

function saveLeads(leads: Lead[]): void {
  localStorage.setItem('leads', JSON.stringify(leads))
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

  http.post("/api/leads", async ({ request }) => {
    await delay(1000);
    const body = (await request.json()) as Omit<Lead, "id">;
    const newLead: Lead = { ...body, id: crypto.randomUUID() };
    const leads = getLeads()
    leads.push(newLead)
    saveLeads(leads)
    return HttpResponse.json(newLead, { status: 201 });
  }),

  http.put<IdParam>("/api/leads/:id", async ({ request, params }) => {
    await delay(1000);
    const { id } = params;
    const body = (await request.json()) as Partial<Omit<Lead, "id">>;
    const leads = getLeads()
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
    const updated = { ...leads[index], ...body, id: leads[index].id };
    leads[index] = updated;
    saveLeads(leads)
    return HttpResponse.json(updated);
  }),

  http.delete<IdParam>("/api/leads/:id", async ({ params }) => {
    await delay(1);
    const { id } = params;
    const leads = getLeads()
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
    saveLeads(leads)
    return new HttpResponse(null, { status: 204 });
  }),
];
