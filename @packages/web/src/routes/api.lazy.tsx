import { createLazyFileRoute } from "@tanstack/react-router";
import { ApiPage } from "@/pages/ApiPage";

export const Route = createLazyFileRoute("/api")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ApiPage />;
}
