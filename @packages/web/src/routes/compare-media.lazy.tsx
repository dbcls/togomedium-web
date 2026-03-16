import { createLazyFileRoute } from "@tanstack/react-router";

import { CompareMediaPage } from "@/pages/CompareMediaPage.tsx";

export const Route = createLazyFileRoute("/compare-media")({
  component: () => <CompareMediaPage />,
});
