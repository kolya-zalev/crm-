import { render, screen } from "@testing-library/react";
import { LeadsFilter } from "../components/LeadsFilter/LeadsFilter";
import userEvent from "@testing-library/user-event";

describe("LeadsFilter", () => {
  it("renders current filter value", () => {
    render(<LeadsFilter value="all" onChange={() => {}} />);
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("calls onChange when option selected", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<LeadsFilter value="all" onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "New" }));

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
