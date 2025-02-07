import { createFileRoute } from "@tanstack/react-router";
import { ComponentListPage } from "@/pages/ComponentListPage.tsx";

export const Route = createFileRoute("/component/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComponentListPage />;
}
