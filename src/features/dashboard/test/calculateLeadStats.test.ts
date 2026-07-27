import { calculateLeadStats } from "../utils/calculateLeadStats";
import type { Lead } from "@/types";

const makeLead = (overrides: Partial<Lead> = {}): Lead => ({
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc",
  status: "new",
  tags: [],
  ...overrides,
});

describe("calculateLeadStats", () => {
  it("returns zero counts for empty leads", () => {
    expect(calculateLeadStats([])).toEqual({
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      won: 0,
      lost: 0,
    });
  });

  it("counts leads by status", () => {
    const leads = [
      makeLead({ id: "1", status: "new" }),
      makeLead({ id: "2", status: "new" }),
      makeLead({ id: "3", status: "won" }),
      makeLead({ id: "4", status: "lost" }),
      makeLead({ id: "5", status: "contacted" }),
      makeLead({ id: "6", status: "qualified" }),
    ];

    expect(calculateLeadStats(leads)).toEqual({
      total: 6,
      new: 2,
      contacted: 1,
      qualified: 1,
      won: 1,
      lost: 1,
    });
  });

  it("sets total to leads length", () => {
    const leads = [
      makeLead({ id: "1", status: "won" }),
      makeLead({ id: "2", status: "won" }),
      makeLead({ id: "3", status: "won" }),
    ];

    const stats = calculateLeadStats(leads);

    expect(stats.total).toBe(3);
    expect(stats.won).toBe(3);
    expect(stats.new).toBe(0);
  });
});
