import { http, HttpResponse } from "msw";
import { fakeLeads } from "@/mocks/fakedata";
import { Lead } from "@/lib/types/lead";

let leadsDb = [...fakeLeads];

export const handlers = [
  http.get("/api/leads", () => {
    return HttpResponse.json(leadsDb);
  }),

  http.get<{ id: string }>("/api/leads/:id", ({ params }) => {
    const { id } = params;
    const foundLead = leadsDb.find((lead) => lead.id === id);
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
    const body = (await request.json()) as Omit<Lead, "id">;
    const newLead: Lead = { ...body, id: crypto.randomUUID() };
    leadsDb.push(newLead);
    return HttpResponse.json(newLead, { status: 201 });
  }),

  http.put<{ id: string }>("/api/leads/:id", async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Omit<Lead, "id">>;
    const index = leadsDb.findIndex((l) => l.id === id);
    if (index === -1) {
      return HttpResponse.json(
        {
          error: {
            message: "Index not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }
    const updated = { ...leadsDb[index], ...body, id: leadsDb[index].id };
    leadsDb[index] = updated;
    return HttpResponse.json(updated);
  }),

  http.delete<{id: string}>('/api/leads/:id', async({params}) => {
    const {id} = params
    const index = leadsDb.findIndex(l => l.id === id)
    if(index !== -1){
      leadsDb.splice(index, 1)
      return new HttpResponse(null, {status: 204})
    }
    return new HttpResponse(null, {status: 404})

  })
];
