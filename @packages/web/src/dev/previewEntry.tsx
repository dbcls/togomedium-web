import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUiPreviewPanel } from "./HeroUiPreviewPanel";
import "../index.css";

if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HeroUiPreviewPanel />
    </StrictMode>,
  );
}
