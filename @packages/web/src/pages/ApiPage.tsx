import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export const ApiPage = () => {
  return (
    <div className={"flex grow flex-col"}>
      <ApiReferenceReact
        configuration={{
          theme: "default",
          forceDarkModeState: "light",
          spec: {
            url: "/assets/togomedium-api.yaml",
          },
          hideModels: true,
          tagsSorter: (a, b) => {
            const first = "New";
            if (a.name === first) return -1;
            if (b.name === first) return 1;

            const last = "Deprecated";
            if (a.name === last) return 1;
            if (b.name === last) return -1;

            return a.name.localeCompare(b.name);
          },
          defaultOpenAllTags: true,
        }}
      />
    </div>
  );
};
