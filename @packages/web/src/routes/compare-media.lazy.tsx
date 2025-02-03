import { createLazyFileRoute } from "@tanstack/react-router";
import { CompareMediaPage } from "@/components/pages/CompareMediaPage.tsx";

export const Route = createLazyFileRoute("/compare-media")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompareMediaPage />;
}
