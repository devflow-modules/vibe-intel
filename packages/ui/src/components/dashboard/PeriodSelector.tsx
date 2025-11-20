"use client";

import { useDashboardFilters } from "../../hooks/useDashboardFilters";

const PERIOD_OPTIONS = [
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 30 dias", value: "30d" }
] as const;

export function PeriodSelector() {
  const { period, setPeriod, pendingSync, setPendingSync } = useDashboardFilters();

  const handleChange = (value: (typeof PERIOD_OPTIONS)[number]["value"]) => {
    if (value === period) return;
    setPendingSync(true);
    setPeriod(value);
    setTimeout(() => setPendingSync(false), 300);
  };

  return (
    <fieldset className="flex flex-wrap items-center gap-2" aria-label="Filtros de período">
      <legend className="sr-only">Selecione o período</legend>
      {PERIOD_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`rounded-pill border px-4 py-2 text-body-sm transition keyboard-focus:outline keyboard-focus:outline-2 keyboard-focus:outline-offset-2 ${
            period === option.value
              ? "border-primary bg-primary text-white"
              : "border-slate-800 bg-background text-subtle hover:border-primary"
          }`}
          aria-pressed={period === option.value}
          aria-busy={pendingSync}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}

