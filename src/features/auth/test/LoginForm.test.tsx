import { LoginForm } from "../components/LoginForm/LoginForm.component";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  it("should render the fields and buttons", () => {
    render(<LoginForm onSubmit={jest.fn()} isLoading={false} error={null} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" }));
  });
  it("if invalid onSubmit is not called", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} isLoading={false} error={null} />);

    await user.type(screen.getByLabelText("Email"), "1111@1/com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("if valid onSubmit is called", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} isLoading={false} error={null} />);

    await user.type(screen.getByLabelText("Email"), "test@gmail.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: "test@gmail.com",
      password: "12345678",
    });
  });
  it("shows validation error", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} isLoading={false} error={null} />);
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.getByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.getByText("Password must be at least 8 characters long"),
    ).toBeInTheDocument();
  });
});
