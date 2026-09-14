import { filterLeads } from "../utils/filterLeads";
import type { Lead } from "@/types";

const leads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Example Inc.",
    status: "new",
    tags: [],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    company: "Example Corp.",
    status: "won",
    tags: [],
  },
  {
    id: "3",
    name: "Jim Beam",
    email: "jim.beam@example.com",
    company: "Example LLC.",
    status: "lost",
    tags: [],
  },
];

describe("filterLeads", () => {
  it("filters by name", () => {
    expect(filterLeads(leads, "john", "all")).toEqual([leads[0]]);
  });

  it("filters by email", () => {
    expect(filterLeads(leads, "jane.smith", "all")).toEqual([leads[1]]);
  });

  it("filters by company", () => {
    expect(filterLeads(leads, "corp", "all")).toEqual([leads[1]]);
  });
  it("filters by status", () => {
    expect(filterLeads(leads, "", "won")).toEqual([leads[1]]);
  });

  it('returns all leads when search is empty and filter is "all"', () => {
    expect(filterLeads(leads, "", "all")).toEqual(leads);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterLeads(leads, "invalid", "all")).toEqual([]);
  });
});
