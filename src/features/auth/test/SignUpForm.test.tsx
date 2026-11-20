import { SignUpForm } from "../components/SignUpForm/SignUpForm.component";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SignUpForm", () => {
  it("should render the fields and buttons", () => {
    render(<SignUpForm onSubmit={jest.fn()} isLoading={false} error={null} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });
  it("if invalid  onSubmit will not be called", () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} isLoading={false} error={null} />);
    userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
  it("if valid  onSubmit will be called", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<SignUpForm onSubmit={onSubmit} isLoading={false} error={null} />);
    await user.type(screen.getByLabelText("Name"), "Jest Test");
    await user.type(screen.getByLabelText("Email"), "jest@test.com");
    await user.type(screen.getByLabelText("Password"), "jest1234");
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: "Jest Test",
      email: "jest@test.com",
      password: "jest1234",
    });
  });
  it("shows validation error", async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSubmit={jest.fn()} isLoading={false} error={null} />);
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(await screen.getByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.getByText("Name must be at least 3 characters long"),
    ).toBeInTheDocument();
    expect(await screen.getByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.getByText("Password must be at least 8 characters long"),
    ).toBeInTheDocument();
  });
});
