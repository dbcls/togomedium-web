import clsx from "clsx";
import { FC } from "react";
import { URL_STANZA } from "@/consts/api.ts";
import { booleanToString } from "@/utils/boolean.ts";

type Props = {
  gmIds: string[];
  hideMedia?: boolean;
  isVisible?: boolean;
};
const stanzaName = "gmdb-media-alignment-table-by-strains";
const StanzaTag = `togostanza-${stanzaName}`;

export const StrainAlignmentStanza: FC<Props> = ({
  gmIds,
  hideMedia = false,
  isVisible = true,
}) => {
  const visibleClass = clsx(isVisible ? "block" : "hidden");
  return (
    <>
      <script
        src={`${URL_STANZA}/${stanzaName}.js`}
        type="module"
        async
      ></script>
      <StanzaTag
        gm_ids={gmIds.join(",")}
        hide_media={booleanToString(hideMedia)}
        className={visibleClass}
        togostanza-menu-placement="none"
      ></StanzaTag>
    </>
  );
};
