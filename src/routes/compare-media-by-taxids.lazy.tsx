import { createLazyFileRoute } from "@tanstack/react-router";
import { CompareMediaByTaxIdsPage } from "@/components/pages/CompareMediaByTaxIdsPage.tsx";

export const Route = createLazyFileRoute("/compare-media-by-taxids")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompareMediaByTaxIdsPage />;
}
