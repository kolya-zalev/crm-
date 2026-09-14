import { getToggleTaskUpdate } from "@/features/tasks/utils/getToggleTaskUpdate";

describe("getToggleTaskUpdate", () => {
  it("returns completed status when checked", () => {
    const result = getToggleTaskUpdate(true);
    expect(result.status).toBe("completed");
    expect(result.completedAt).toBeDefined();
  });
  it("returns pending status when unchecked", () => {
    expect(getToggleTaskUpdate(false)).toEqual({ status: "pending" });
  });
});
