import { canMutateLeads } from "../utils/canMutate";

describe("canMutateLeads", () => {
  it("allows admin and manager", () => {
    expect(canMutateLeads("admin")).toBe(true);
    expect(canMutateLeads("manager")).toBe(true);
  });

  it("blocks member and missing role", () => {
    expect(canMutateLeads("member")).toBe(false);
    expect(canMutateLeads(undefined)).toBe(false);
  });
});
