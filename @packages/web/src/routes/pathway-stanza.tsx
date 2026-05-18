import { createFileRoute } from "@tanstack/react-router";
import { PathwayStanzaPage } from "@/pages/PathwayStanzaPage.tsx";

export const Route = createFileRoute("/pathway-stanza")({
  component: PathwayStanzaPage,
});
