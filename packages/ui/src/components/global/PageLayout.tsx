"use client";

import type { PropsWithChildren } from "react";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <section
      className="flex min-h-screen flex-col bg-surface text-text"
      role="main"
      aria-label="Painel principal Vibe Intel"
    >
      <header className="border-b border-slate-800 bg-background px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-body-sm text-subtle">Vibe Intel</p>
            <h1 className="text-heading-lg text-white">Centro de Operações</h1>
          </div>
          <button
            type="button"
            className="rounded-pill bg-primary px-4 py-2 text-body-md font-semibold text-white transition hover:bg-primary-hover keyboard-focus:outline keyboard-focus:outline-2 keyboard-focus:outline-offset-2 keyboard-focus:outline-primary"
          >
            Sincronizar
          </button>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-8 py-10">
        {children}
      </div>
    </section>
  );
}

