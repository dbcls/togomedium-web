import { createFileRoute } from "@tanstack/react-router";
import { MediaListPage } from "@/pages/MediaListPage.tsx";

export const Route = createFileRoute("/medium/")({
  component: () => <MediaListPage />,
});
