import { FC } from "react";
import { URL_STANZA } from "@/consts/api.ts";

type Props = {
  sourceGmId?: string;
};

const stanzaName = "gmdb-medium-builder";
const StanzaTag = `togostanza-${stanzaName}`;

export const MediumBuilderStanza: FC<Props> = ({ sourceGmId }) => {
  return (
    <div>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag source_gm_id={sourceGmId} togostanza-menu-placement="none"></StanzaTag>
    </div>
  );
};
