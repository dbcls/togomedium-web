import { createFileRoute } from "@tanstack/react-router";
import { MediaListPage } from "@/pages/MediaListPage.tsx";

export const Route = createFileRoute("/medium/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MediaListPage />;
}
