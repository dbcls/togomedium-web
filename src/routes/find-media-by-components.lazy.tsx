import { createLazyFileRoute } from "@tanstack/react-router";
import { FindMediaByComponentsPage } from "@/components/pages/FindMediaByComponentsPage.tsx";

export const Route = createLazyFileRoute("/find-media-by-components")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FindMediaByComponentsPage />;
}
