import { render, screen } from "@testing-library/react";
import { WelcomeBanner } from "../components/WelcomeBanner";

describe("WelcomeBanner", () => {
  it("renders welcome message with new leads count", () => {
    render(<WelcomeBanner newLeadsCount={5} />);

    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText("You have 5 new leads waiting for review"),
    ).toBeInTheDocument();
  });

  it("renders link to leads page", () => {
    render(<WelcomeBanner newLeadsCount={0} />);

    expect(screen.getByRole("link", { name: "Go to leads" })).toHaveAttribute(
      "href",
      "/lead",
    );
  });
});
