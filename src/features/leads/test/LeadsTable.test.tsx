import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadsTable } from "../components/LeadsTable";
import { LeadsTableComponentProps } from "../components/LeadsTable/LeadsTable.types";
import type { Lead } from "@/types/lead.types";

const fakeLead: Lead = {
  id: "1",
  name: "John",
  email: "john@example.com",
  company: "Acme Inc",
  status: "new",
  tags: [],
};

const tableProps: LeadsTableComponentProps = {
  leads: [],
  search: "",
  filter: "all",
  isLoading: false,
  onSearchChange: jest.fn(),
  onFilterChange: jest.fn(),
  onDelete: jest.fn(),
  onAddClick: jest.fn(),
  onEditClick: jest.fn(),
  onImportClick: jest.fn(),
};

describe("LeadsTable", () => {
  it("renders toolbar with Add Lead button", () => {
    render(<LeadsTable {...tableProps} />);
    expect(
      screen.getByRole("button", { name: "Add Lead" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onAddClick", async () => {
    const onAddClick = jest.fn();
    const user = userEvent.setup();
    render(<LeadsTable {...tableProps} onAddClick={onAddClick} />);

    await user.click(screen.getByRole("button", { name: "Add Lead" }));
    expect(onAddClick).toHaveBeenCalledTimes(1);
  });

  it("shows total 0 when leads are empty", () => {
    render(<LeadsTable {...tableProps} leads={[]} />);
    expect(screen.getByText("Total Leads: 0")).toBeInTheDocument();
  });

  it("renders lead name in the table", () => {
    render(<LeadsTable {...tableProps} leads={[fakeLead]} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Total Leads: 1")).toBeInTheDocument();
  });
});
