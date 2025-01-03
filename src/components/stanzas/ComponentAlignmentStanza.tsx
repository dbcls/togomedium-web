import clsx from "clsx";
import { FC } from "react";
import { URL_STANZA } from "@/consts.ts";

type Props = {
  gmIds: string[];
  isVisible?: boolean;
  prioritizedTaxIds?: string[];
};
const stanzaName = "gmdb-media-alignment-table";
const StanzaTag = `togostanza-${stanzaName}`;

export const ComponentAlignmentStanza: FC<Props> = ({
  gmIds,
  isVisible = true,
  prioritizedTaxIds = [],
}) => {
  const visibleClass = clsx(isVisible ? "block" : "hidden");
  return (
    <>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      {gmIds.length > 0 && (
        <StanzaTag
          gm_ids={gmIds.join(",")}
          className={visibleClass}
          togostanza-menu-placement="none"
          prioritized_tax_ids={prioritizedTaxIds.join(",")}
        ></StanzaTag>
      )}
    </>
  );
};
