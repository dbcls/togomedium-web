import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      Hello from About!
      <script
        type="module"
        src="https://dbcls.github.io/togomedium-stanza/gmdb-find-media-by-components.js"
        async
      ></script>
      <togostanza-gmdb-find-media-by-components></togostanza-gmdb-find-media-by-components>
    </div>
  );
}
