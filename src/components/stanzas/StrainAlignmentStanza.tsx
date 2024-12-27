import { FC } from "react";
import { URL_STANZA } from "@/consts.ts";
import { booleanToString } from "@/utils/boolean.ts";

type Props = {
  gmIds: string[];
  hideMedia?: boolean;
};
const stanzaName = "gmdb-media-strains-alignment-table";
const StanzaTag = `togostanza-${stanzaName}`;

export const StrainAlignmentStanza: FC<Props> = ({ gmIds, hideMedia = false }) => {
  return (
    <>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag
        gm_ids={gmIds.join(",")}
        hide_media={booleanToString(hideMedia)}
        togostanza-menu-placement="none"
      ></StanzaTag>
    </>
  );
};
