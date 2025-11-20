"use client";

import { create } from "zustand";
import { createDashboardSlice, type DashboardSlice } from "./dashboard.slice";

export type RootStore = DashboardSlice;

export const useRootStore = create<RootStore>()((...args) => ({
  ...createDashboardSlice(...args)
}));

