import { FC, useEffect } from "react";

type Props = {};

const handleRunAction = (e: CustomEvent) => {
  const ids: string[] = e.detail;
  const encodedIds = encodeURIComponent(ids.join(","));
  const target = "compare-media";
  window.open(`/${target}/?gm_ids=${encodedIds}`);
};

export const FindMediaByComponentsStanza: FC<Props> = () => {
  useEffect(() => {
    document.addEventListener("STANZA_RUN_ACTION", handleRunAction);
    return () => {
      document.removeEventListener("STANZA_RUN_ACTION", handleRunAction);
    };
  }, []);

  return (
    <>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-find-media-by-components.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-find-media-by-components
        className={"flex grow"}
        togostanza-menu-placement="none"
      ></togostanza-gmdb-find-media-by-components>
    </>
  );
};
