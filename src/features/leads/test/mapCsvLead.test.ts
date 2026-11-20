import { mapCsvLead } from "../utils/mapCsvLead";

describe("mapCsvLead", () => {
  it("trims name, email, and company", () => {
    expect(
      mapCsvLead({
        name: "  John Doe  ",
        email: "  john@example.com  ",
        company: "  Acme Inc  ",
        status: "new",
        tags: "",
      }),
    ).toEqual({
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Inc",
      status: "new",
      phone: "",
      tags: [],
      notes: undefined,
      source: undefined,
    });
  });

  it("splits tags by semicolon and trims each tag", () => {
    expect(
      mapCsvLead({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc",
        status: "new",
        tags: " vip ; enterprise ;  ",
      }).tags,
    ).toEqual(["vip", "enterprise"]);
  });

  it('defaults status to "new" when empty', () => {
    expect(
      mapCsvLead({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc",
        status: "",
        tags: "",
      }).status,
    ).toBe("new");
  });

  it("returns undefined for empty optional notes and source", () => {
    expect(
      mapCsvLead({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc",
        status: "new",
        tags: "",
        notes: "   ",
        source: "",
      }),
    ).toMatchObject({
      notes: undefined,
      source: undefined,
    });
  });
});
