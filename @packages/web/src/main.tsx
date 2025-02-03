import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app.tsx";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

declare global {
  interface DocumentEventMap {
    STANZA_ON_QUERY_DATA: CustomEvent<string>;
    STANZA_ON_LOAD_DATA: CustomEvent<string>;
    STANZA_ROUND_TREE_CLICK: CustomEvent<string>;
    STANZA_RUN_ACTION: CustomEvent<string>;
  }
}
