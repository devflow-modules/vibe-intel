import { act, renderHook } from "@testing-library/react";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";

describe("useDashboardFilters", () => {
  it("altera período com estado consistente", () => {
    const { result } = renderHook(() => useDashboardFilters());

    expect(result.current.period).toBe("7d");

    act(() => {
      result.current.setPeriod("30d");
    });

    expect(result.current.period).toBe("30d");
  });
});

