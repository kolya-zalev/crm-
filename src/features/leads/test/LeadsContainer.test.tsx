jest.mock("../hooks/useLeads", () => ({
  useLeads: jest.fn(),
}));

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLeads } from "../hooks/useLeads";
import { LeadsContainer } from "../Leads.container";

const fakeLead = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc",
  status: "new" as const,
  phone: "1234567890",
  tags: ["vip"],
  notes: "Notes",
  source: "Web",
};

const otherLead = {
  id: "2",
  name: "Jane Smith",
  email: "jane@example.com",
  company: "Beta Corp",
  status: "won" as const,
  phone: "0987654321",
  tags: [],
};

const createLeadData = {
  name: "New Lead",
  email: "new@example.com",
  phone: "1234567890",
  company: "New Co",
  status: "new" as const,
  tags: [] as string[],
  notes: "",
  source: "",
};

const mockUseLeads = (overrides: Partial<ReturnType<typeof useLeads>> = {}) => {
  (useLeads as jest.Mock).mockReturnValue({
    leads: [],
    isLoading: false,
    createLead: jest.fn().mockResolvedValue(fakeLead),
    deleteLead: jest.fn().mockResolvedValue(undefined),
    updateLead: jest.fn().mockResolvedValue(fakeLead),
    ...overrides,
  });
};

describe("LeadsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLeads();
  });

  it("opens modal and createLead closes it", async () => {
    const createLead = jest.fn().mockResolvedValue(fakeLead);
    mockUseLeads({ createLead });

    const user = userEvent.setup();
    render(<LeadsContainer />);

    await user.click(screen.getByRole("button", { name: "Add Lead" }));
    expect(screen.getByText("Add New Lead")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Enter name"), createLeadData.name);
    await user.type(screen.getByLabelText("Enter email"), createLeadData.email);
    await user.type(screen.getByLabelText("Enter phone"), createLeadData.phone);
    await user.type(
      screen.getByLabelText("Enter company"),
      createLeadData.company,
    );
    await user.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createLead).toHaveBeenCalledWith(createLeadData);
    });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("filters leads when search changes", async () => {
    mockUseLeads({ leads: [fakeLead, otherLead] });

    const user = userEvent.setup();
    render(<LeadsContainer />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Search"), "jane");

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("deleteLead calls API after confirm", async () => {
    const deleteLead = jest.fn().mockResolvedValue(undefined);
    mockUseLeads({ leads: [fakeLead], deleteLead });

    const user = userEvent.setup();
    render(<LeadsContainer />);

    const row = screen.getByText("John Doe").closest("tr")!;
    const deleteButton = within(row).getAllByRole("button").at(-1)!;

    await user.click(deleteButton);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(deleteLead).toHaveBeenCalledWith(fakeLead.id);
    });
  });
});
