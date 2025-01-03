import { createLazyFileRoute } from "@tanstack/react-router";
import { ApiPage } from "@/components/pages/ApiPage";

export const Route = createLazyFileRoute("/api")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ApiPage />;
}
