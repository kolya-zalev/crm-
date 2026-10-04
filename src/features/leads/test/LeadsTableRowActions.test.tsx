import { render, screen } from "@testing-library/react";
import { LeadsTableRowActionsComponent } from "../components/LeadsTable/components/LeadsTableRowActions/LeadsTableRowActions.component";

const baseProps = {
  leadDetailHref: "/lead/1",
  deleteDialogTitle: "Delete lead",
  deleteDialogDescription: "This cannot be undone",
  isDeleteDialogOpen: false,
  isDeleting: false,
  onEditClick: jest.fn(),
  onViewClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onDeleteDialogOpenChange: jest.fn(),
  onDeleteConfirm: jest.fn(),
};

describe("LeadsTableRowActions", () => {
  it("hides edit and delete for members", () => {
    render(
      <LeadsTableRowActionsComponent {...baseProps} canMutateLeads={false} />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/lead/1");
  });

  it("shows edit, view and delete when the user can mutate leads", () => {
    render(<LeadsTableRowActionsComponent {...baseProps} canMutateLeads />);

    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});
