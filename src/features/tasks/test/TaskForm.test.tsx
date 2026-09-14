import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TaskForm } from "../components/TaskForm";

const emptyValues = {
  title: "",
  priority: "medium" as const,
  dueDate: "",
};

const validData = {
  title: "Call client",
  priority: "low" as const,
  dueDate: "2026-07-26",
};

describe("TaskForm", () => {
  it("renders form fields", () => {
    render(
      <TaskForm
        isEditing={false}
        defaultValues={emptyValues}
        onSubmit={() => {}}
      />,
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Task" }),
    ).toBeInTheDocument();
  });

  it("shows validation error on empty submit", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <TaskForm
        isEditing={false}
        defaultValues={emptyValues}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Invalid title")).toBeInTheDocument();
  });

  it("calls onSubmit with valid data", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <TaskForm
        isEditing={false}
        defaultValues={emptyValues}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText("Title"), validData.title);
    await user.selectOptions(
      screen.getByLabelText("Priority"),
      validData.priority,
    );
    await user.type(screen.getByLabelText("Due Date"), validData.dueDate);
    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(validData);
  });
});
