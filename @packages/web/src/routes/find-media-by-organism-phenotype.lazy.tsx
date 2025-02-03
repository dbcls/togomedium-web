import { createLazyFileRoute } from "@tanstack/react-router";
import { FindMediaByOrganismPhenotypePage } from "@/components/pages/FineMediaByOrganismPhenotypePage.tsx";

export const Route = createLazyFileRoute("/find-media-by-organism-phenotype")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FindMediaByOrganismPhenotypePage />;
}
