import { createFileRoute } from "@tanstack/react-router";
import { PathwayStanzaPage } from "@/pages/PathwayStanzaPage.tsx";
import { StatisticsPage } from "@/pages/StatisticsPage.tsx";

export const Route = createFileRoute("/pathway-stanza")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PathwayStanzaPage />;
}
