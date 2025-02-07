import { createLazyFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage.tsx";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <AboutPage />;
}
