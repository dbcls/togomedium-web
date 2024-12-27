import { FC, useEffect } from "react";
import { URL_STANZA } from "@/consts.ts";

type Props = {};

const stanzaName = "gmdb-find-media-by-organism-phenotype";
const StanzaTag = `togostanza-${stanzaName}`;

const handleRunAction = (e: CustomEvent) => {
  const ids: string[] = e.detail;
  const encodedIds = encodeURIComponent(ids.join(","));
  const target = "compare-media";
  window.open(`/${target}/?gm_ids=${encodedIds}`);
};

export const FindMediaByOrganismPhenotypeStanza: FC<Props> = () => {
  useEffect(() => {
    document.addEventListener("STANZA_RUN_ACTION", handleRunAction);
    return () => {
      document.removeEventListener("STANZA_RUN_ACTION", handleRunAction);
    };
  }, []);

  return (
    <>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag className={"flex grow"} togostanza-menu-placement="none"></StanzaTag>
    </>
  );
};
