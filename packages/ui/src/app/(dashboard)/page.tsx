import { SummaryCard } from "../../components/dashboard/SummaryCard";
import { PeriodSelector } from "../../components/dashboard/PeriodSelector";
import { getDashboardSummary } from "../../services/dashboardService";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-body-sm text-subtle">Overview</p>
          <h2 className="text-heading-lg text-white">Status do agente</h2>
        </div>
        <PeriodSelector />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {summary.items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>
      <p className="text-body-sm text-subtle">
        Atualizado em{" "}
        <time dateTime={summary.updatedAt}>
          {new Date(summary.updatedAt).toLocaleString("pt-BR")}
        </time>
      </p>
    </div>
  );
}

