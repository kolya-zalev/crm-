import { schemaLeadAdd } from "@/validators/validation";

describe("scheamLeadAdd", () => {
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
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(true);
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
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Name must be at least 3 characters",
    );
  });
  it("no name fails validation", () => {
    const data = {
      email: "john.doe@example.com",
      company: "Example Inc.",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(false);
  });
  it("no email fails validation", () => {
    const data = {
      name: "John Doe",
      company: "Example Inc.",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(false);
  });
  it("no company fails validation", () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      status: "new",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(false);
  });
  it("no status fails validation", () => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Example Inc.",
      phone: "1234567890",
      tags: ["tag1", "tag2"],
      notes: "Notes",
      source: "Source",
    };
    const result = schemaLeadAdd.safeParse(data);
    expect(result.success).toBe(false);
  });
});
