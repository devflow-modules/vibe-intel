"use client";

import { useRootStore } from "../store";

export function useDashboardFilters() {
  const period = useRootStore((state) => state.period);
  const pendingSync = useRootStore((state) => state.pendingSync);
  const setPeriod = useRootStore((state) => state.setPeriod);
  const setPendingSync = useRootStore((state) => state.setPendingSync);

  return {
    period,
    pendingSync,
    setPeriod,
    setPendingSync
  };
}

