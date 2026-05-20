import { delay, http, HttpResponse } from "msw";
import { fakeLeads } from "@/mocks/fakedata";
import { Lead } from "@/lib/types/lead";

type IdParam = { id: string };
let leadsDb = [...fakeLeads];

export const handlers = [
  http.get("/api/leads", async () => {
    await delay(1000);
    return HttpResponse.json(leadsDb);
  }),

  http.get<IdParam>("/api/leads/:id", async ({ params }) => {
    await delay(1000);
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
    await delay(1000);
    const body = (await request.json()) as Omit<Lead, "id">;
    const newLead: Lead = { ...body, id: crypto.randomUUID() };
    leadsDb.push(newLead);
    return HttpResponse.json(newLead, { status: 201 });
  }),

  http.put<IdParam>("/api/leads/:id", async ({ request, params }) => {
    await delay(1000);
    const { id } = params;
    const body = (await request.json()) as Partial<Omit<Lead, "id">>;
    const index = leadsDb.findIndex((l) => l.id === id);
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
    const updated = { ...leadsDb[index], ...body, id: leadsDb[index].id };
    leadsDb[index] = updated;
    return HttpResponse.json(updated);
  }),

  http.delete<IdParam>("/api/leads/:id", async ({ params }) => {
    await delay(1000);
    const { id } = params;
    const index = leadsDb.findIndex((l) => l.id === id);
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

    leadsDb.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
