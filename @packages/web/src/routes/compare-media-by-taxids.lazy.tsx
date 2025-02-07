import { createLazyFileRoute } from "@tanstack/react-router";
import { CompareMediaByTaxIdsPage } from "@/pages/CompareMediaByTaxIdsPage.tsx";

export const Route = createLazyFileRoute("/compare-media-by-taxids")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompareMediaByTaxIdsPage />;
}
