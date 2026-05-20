import { http, HttpResponse } from "msw";
import { fakeLeads } from "@/mocks/fakedata";

let leadsDb = [...fakeLeads];

export const handlers = [
  http.get("/api/leads", () => {
    return HttpResponse.json(leadsDb);
  }),

  http.get<{ id: string }>("/api/leads/:id", ({ params }) => {
    const { id } = params;
    const foundLead = leadsDb.find((lead) => lead.id === id);
    if (!foundLead) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(foundLead);
  }),
];
