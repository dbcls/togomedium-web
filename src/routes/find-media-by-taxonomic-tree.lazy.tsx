import { createLazyFileRoute } from "@tanstack/react-router";
import { FindMediaByTaxonomicTreePage } from "@/components/pages/FindMediaByTaxonomicTreePage.tsx";

export const Route = createLazyFileRoute("/find-media-by-taxonomic-tree")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FindMediaByTaxonomicTreePage />;
}
