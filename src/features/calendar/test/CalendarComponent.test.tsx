import { render, screen } from "@testing-library/react";
import { CalendarComponent } from "../Calendar.component";
import { defTask } from "./DayTaskList.test";
describe("CalendarComponent", () => {
  it("shows spinner while loading", () => {
    render(
      <CalendarComponent
        isLoading={false}
        selected={new Date(2026, 7, 3)}
        onSelect={jest.fn()}
        tasksByDate={{}}
        dayTasks={[]}
        getLeadName={() => ""}
      />,
    );
    expect(screen.queryByText("No tasks for this day")).not.toBeInTheDocument();
  });
  it("shows dat tasks when loaded", () => {
    render(
      <CalendarComponent
        isLoading={false}
        selected={new Date(2026, 7, 3)}
        onSelect={jest.fn()}
        tasksByDate={{}}
        dayTasks={[defTask({ title: "My task" })]}
        getLeadName={() => ""}
      />,
    );
    expect(screen.getByText("My task")).toBeInTheDocument();
  });
});
