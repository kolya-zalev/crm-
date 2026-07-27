import { FormStatus, LeadAddModal } from "../components/LeadAddModal";
import { render, screen } from "@testing-library/react";

describe("LeadAddModal", () => {
  it("if open true, new state - add new lead", () => {
    const onSubmit = jest.fn();
    render(
      <LeadAddModal
        open={true}
        onClose={jest.fn()}
        onSubmit={onSubmit}
        onEdit={jest.fn()}
        formStatus={FormStatus.NEW}
        lead={null}
      />,
    );
    expect(screen.getByText("Add New Lead")).toBeInTheDocument();
  });
  it("if open true, edit state - edit lead", () => {
    const onEdit = jest.fn();
    render(
      <LeadAddModal
        open={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
        onEdit={onEdit}
        formStatus={FormStatus.EDIT}
        lead={null}
      />,
    );
    expect(screen.getByText("Edit Lead")).toBeInTheDocument();
  });
});
