import { createLazyFileRoute } from "@tanstack/react-router";

import { BuilderPage } from "@/pages/BuilderPage.tsx";

export const Route = createLazyFileRoute("/builder")({
  component: () => <BuilderPage />,
});
