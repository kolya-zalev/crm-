import { render, screen } from "@testing-library/react";
import { LeadDetailHeader } from "../components/LeadDetail/components/LeadDetailHeader/LeadDetailHeader.component";

describe("LeadDetailHeader", () => {
  it("always shows back to leads", () => {
    render(<LeadDetailHeader canMutateLeads={false} onEditOpen={jest.fn()} />);

    expect(
      screen.getByRole("link", { name: "← Back to Leads" }),
    ).toHaveAttribute("href", "/lead");
  });

  it("hides Edit for members and shows it when the user can mutate", () => {
    const { rerender } = render(
      <LeadDetailHeader canMutateLeads={false} onEditOpen={jest.fn()} />,
    );
    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument();

    rerender(<LeadDetailHeader canMutateLeads onEditOpen={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });
});
