import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import { ProfileComponent } from "../Profile.component";
import type { ProfileComponentProps } from "../Profile.types";
import type {
  ChangePasswordFormValues,
  UpdateEmailFormValues,
  UpdateNameFormValues,
} from "@/validators";

const fakeRegister = <T extends FieldValues>(): UseFormRegister<T> =>
  ((name: string) => ({
    name,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  })) as UseFormRegister<T>;

const baseProps: ProfileComponentProps = {
  isNameSaving: false,
  onNameSubmit: jest.fn(),
  nameRegister: fakeRegister<UpdateNameFormValues>(),
  isEmailSaving: false,
  emailLocked: false,
  emailLockLabel: null,
  onEmailSubmit: jest.fn(),
  emailRegister: fakeRegister<UpdateEmailFormValues>(),
  isPasswordSaving: false,
  onPasswordSubmit: jest.fn(),
  passwordRegister: fakeRegister<ChangePasswordFormValues>(),
};

describe("ProfileComponent", () => {
  it("renders name, email and password fields", () => {
    render(<ProfileComponent {...baseProps} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Current password")).toBeInTheDocument();
    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Save" })).toHaveLength(3);
  });

  it("locks email and shows the cooldown label", () => {
    render(
      <ProfileComponent
        {...baseProps}
        emailLocked
        emailLockLabel="You can change email again on 20 Oct"
      />,
    );

    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(
      screen.getByText("You can change email again on 20 Oct"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Save" })[1]).toBeDisabled();
  });

  it("submits the name form", async () => {
    const onNameSubmit = jest.fn((event) => event.preventDefault());
    const user = userEvent.setup();
    render(<ProfileComponent {...baseProps} onNameSubmit={onNameSubmit} />);

    await user.click(screen.getAllByRole("button", { name: "Save" })[0]);

    expect(onNameSubmit).toHaveBeenCalledTimes(1);
  });
});
