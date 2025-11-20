import { render, screen } from "@testing-library/react";
import DashboardPage from "../../../app/(dashboard)/page";

describe("DashboardPage", () => {
  it("exibe cards da API do agente", async () => {
    render(await DashboardPage());
    expect(screen.getByRole("heading", { name: /status do agente/i })).toBeTruthy();
    expect(screen.getAllByRole("status").length).toBeGreaterThanOrEqual(3);
  });
});

