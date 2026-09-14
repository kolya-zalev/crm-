import { LeadAddForm } from "../components/LeadAddModal/components/LeadAddForm/LeadAddForm.component";
import { emptyLeadValues } from "../components/LeadAddModal/utils/emptyLeadValues";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const validData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  company: "Acme",
  status: "new" as const,
  tags: [] as string[],
  notes: "",
  source: "",
};

describe("LeadAddForm", () => {
  it("render all form", () => {
    render(
      <LeadAddForm
        isNew={true}
        defaultValues={emptyLeadValues}
        onSubmit={() => {}}
        onReset={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Notes")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Source")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("empty submit should show validation errors", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(
      <LeadAddForm
        isNew={true}
        defaultValues={emptyLeadValues}
        onSubmit={onSubmit}
        onReset={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("valid data submit should call onSubmit", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(
      <LeadAddForm
        isNew={true}
        defaultValues={emptyLeadValues}
        onSubmit={onSubmit}
        onReset={() => {}}
      />,
    );

    await user.type(screen.getByPlaceholderText("Name"), validData.name);
    await user.type(screen.getByPlaceholderText("Email"), validData.email);
    await user.type(screen.getByPlaceholderText("Phone"), validData.phone);
    await user.type(screen.getByPlaceholderText("Company"), validData.company);
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(validData);
  });
});
