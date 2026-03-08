import { createLazyFileRoute } from "@tanstack/react-router";

import { ApiPage } from "@/pages/ApiPage";

export const Route = createLazyFileRoute("/api")({
  component: () => <ApiPage />,
});
