import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// Import the generated route tree
import { App } from "./app.tsx";

// Create a new router instance

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
