import { schemaLeadImport } from "@/validators/leadImport";

describe("schemaLeadImport", () => {
  it("valid data passes validation", () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Example Inc.",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadImport.safeParse(data);
    expect(result.success).toBe(true);
  });
  it("invalid email fails validation", () => {
    const data = {
      name: "John Doe",
      email: "invalid-email",
      company: "Example Inc.",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadImport.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid email address");
  });
  it("short name fails validation", () => {
    const data = {
      name: "Jo",
      email: "john.doe@example.com",
      company: "Example Inc.",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadImport.safeParse(data);
    expect(result.success).toBe(false);
  });
  it("invalid status fails validation", () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Example Inc.",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadImport.safeParse(data);
    expect(result.success).toBe(false);
  });
});
