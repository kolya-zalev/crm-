import { formatCalendarDay } from "../utils/formatCalendarDay";

describe("formatCalendarDay", () => {
  it("formats as YYYY-MM-DD", () => {
    const date = new Date(2026, 7, 3);
    expect(formatCalendarDay(date)).toBe("2026-08-03");
  });
});
