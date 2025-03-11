import { FC, useEffect } from "react";
import { TaxonomyType } from "%core/types/TaxonomyType.ts";
import { URL_STANZA } from "@/consts/api.ts";

type Props = {
  type: TaxonomyType;
};

const stanzaName = "gmdb-find-media-by-taxonomic-tree";
const StanzaTag = `togostanza-${stanzaName}`;

const handleRunAction = (e: CustomEvent) => {
  const ids: string[] = e.detail;
  const encodedIds = encodeURIComponent(ids.join(","));
  const target = "compare-media";
  window.open(`/${target}/?gm_ids=${encodedIds}`);
};

export const FindMediaByTaxonomicTreeStanza: FC<Props> = ({ type = "NCBI" }) => {
  useEffect(() => {
    document.addEventListener("STANZA_RUN_ACTION", handleRunAction);
    return () => {
      document.removeEventListener("STANZA_RUN_ACTION", handleRunAction);
    };
  }, []);

  return (
    <>
      <script
        src={`${URL_STANZA}/${stanzaName}.js`}
        type="module"
        async
      ></script>
      <StanzaTag
        className={"flex grow"}
        togostanza-menu-placement="none"
        taxonomy_type={type}
      ></StanzaTag>
    </>
  );
};
