import type { StateCreator } from "zustand";

export type PeriodRange = "7d" | "30d";

export type DashboardSlice = {
  period: PeriodRange;
  pendingSync: boolean;
  setPeriod: (value: PeriodRange) => void;
  setPendingSync: (value: boolean) => void;
};

export const createDashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  period: "7d",
  pendingSync: false,
  setPeriod: (period) => set({ period }),
  setPendingSync: (pendingSync) => set({ pendingSync })
});

