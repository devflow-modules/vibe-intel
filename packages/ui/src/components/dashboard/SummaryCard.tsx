"use client";

import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  icon?: ReactNode;
};

export function SummaryCard({
  title,
  value,
  description,
  icon
}: SummaryCardProps) {
  return (
    <article
      className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-background/60 p-5 text-white shadow-[0_0_40px_rgba(15,23,42,0.6)]"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-body-sm text-subtle">{title}</p>
        {icon}
      </div>
      <p className="text-heading-xl">{value}</p>
      <p className="text-body-sm text-subtle">{description}</p>
    </article>
  );
}

