import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadsSearch } from "../components/LeadsSearch/LeadsSearch";

describe("LeadsSearch", () => {
  it("renders search input", () => {
    render(<LeadsSearch value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<LeadsSearch value="" onChange={onChange} />);
    await user.type(screen.getByPlaceholderText("Search"), "test");

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("t");
  });
});
