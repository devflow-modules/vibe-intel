import { render, screen } from "@testing-library/react";
import { SummaryCard } from "../../components/dashboard/SummaryCard";

describe("SummaryCard", () => {
  it("renderiza conteúdo acessível", () => {
    render(
      <SummaryCard
        title="Reviews"
        value="24"
        description="Execuções nos últimos dias"
      />
    );

    expect(screen.getByRole("status").textContent).toContain("Reviews");
    expect(screen.getByText("24")).toBeTruthy();
    expect(screen.getByText("Execuções nos últimos dias")).toBeTruthy();
  });
});

