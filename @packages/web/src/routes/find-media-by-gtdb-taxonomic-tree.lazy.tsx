import { createLazyFileRoute } from "@tanstack/react-router";
import { FindMediaByTaxonomicTreePage } from "@/pages/FindMediaByTaxonomicTreePage.tsx";

export const Route = createLazyFileRoute("/find-media-by-gtdb-taxonomic-tree")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FindMediaByTaxonomicTreePage type={"GTDB"} />;
}
