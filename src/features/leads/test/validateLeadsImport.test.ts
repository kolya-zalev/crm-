import { validateLeadsImport } from "../utils/validateLeadsImport";

const validRow = {
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc",
  status: "new",
  phone: "123456",
  tags: "vip",
};

describe("validateLeadsImport", () => {
  it("returns valid rows", () => {
    const result = validateLeadsImport([validRow]);

    expect(result.totalRows).toBe(1);
    expect(result.validRows).toEqual([
      {
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc",
        status: "new",
        phone: "123456",
        tags: ["vip"],
        notes: undefined,
        source: undefined,
      },
    ]);
    expect(result.errors).toEqual([]);
  });

  it("returns errors with row, field, and message", () => {
    const result = validateLeadsImport([
      {
        name: "Jo",
        email: "invalid-email",
        company: "",
        status: "invalid",
        tags: "",
      },
    ]);

    expect(result.validRows).toEqual([]);
    expect(result.totalRows).toBe(1);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatchObject({
      row: 1,
      field: expect.any(String),
      message: expect.any(String),
    });
  });

  it("handles mixed valid and invalid rows", () => {
    const result = validateLeadsImport([
      validRow,
      {
        name: "Jo",
        email: "bad-email",
        company: "Acme Inc",
        status: "new",
        tags: "",
      },
    ]);

    expect(result.totalRows).toBe(2);
    expect(result.validRows).toHaveLength(1);
    expect(result.validRows[0].email).toBe("john@example.com");
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.map((error) => error.row)).toContain(2);
  });
});
