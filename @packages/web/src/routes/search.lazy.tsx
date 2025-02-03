import { createLazyFileRoute } from "@tanstack/react-router";
import { SearchPage } from "@/components/pages/SearchPage.tsx";

export const Route = createLazyFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SearchPage />;
}
