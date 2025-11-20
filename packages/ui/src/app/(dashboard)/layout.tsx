import type { PropsWithChildren } from "react";
import { PageLayout } from "../../components/global/PageLayout";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <PageLayout>{children}</PageLayout>;
}

