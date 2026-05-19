import { http, HttpResponse } from "msw";
import { fakeLeads } from "@/mocks/fakedata";

export const handlers = [
  http.get("/api/leads", () => {
    return HttpResponse.json([...fakeLeads]);
  }),
];
