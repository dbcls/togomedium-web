import { createLazyFileRoute } from "@tanstack/react-router";
import { StatisticsPage } from "@/components/pages/StatisticsPage.tsx";

export const Route = createLazyFileRoute("/statistics")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StatisticsPage />;
}
