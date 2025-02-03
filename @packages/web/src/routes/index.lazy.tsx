import { createLazyFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage.tsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <HomePage />;
}
