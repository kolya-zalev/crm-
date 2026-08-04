import { leadsTags } from "../components/LeadDetail/components/LeadDetailsInfo/utils/leadsTags";

describe("leadsTags", () => {
  it('returns "—" when tags are undefined', () => {
    expect(leadsTags(undefined)).toBe("—");
  });

  it('returns "—" when tags array is empty', () => {
    expect(leadsTags([])).toBe("—");
  });

  it("joins tags with comma and space", () => {
    expect(leadsTags(["vip", "enterprise", "hot"])).toBe(
      "vip, enterprise, hot",
    );
  });
});
