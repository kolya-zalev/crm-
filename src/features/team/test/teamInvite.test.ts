import { teamInviteSchema } from "../../../validators/teamInvite";

describe("teamInviteSchema", () => {
  it("should be valid with valid data", () => {
    const result = teamInviteSchema.safeParse({
      email: "test@example.com",
      role: "manager",
    });
    expect(result.success).toBe(true);
  });
  it("should be invalid with invalid data", () => {
    const result = teamInviteSchema.safeParse({
      email: "...",
      role: "...,",
    });
    expect(result.success).toBe(false);
  });
  it("should be invalid with missing email", () => {
    const result = teamInviteSchema.safeParse({
      email: null,
      role: "manager",
    });
    expect(result.success).toBe(false);
  });
  it("should be invalid with missing role", () => {
    const result = teamInviteSchema.safeParse({
      email: "test@example.com",
      role: "invalid",
    });
    expect(result.success).toBe(false);
  });
});
