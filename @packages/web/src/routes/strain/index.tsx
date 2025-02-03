import { createFileRoute } from "@tanstack/react-router";
import { StrainListPage } from "@/components/pages/StrainListPage.tsx";

export const Route = createFileRoute("/strain/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StrainListPage />;
}
