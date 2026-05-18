import { FC } from "react";
import { URL_STANZA } from "@/consts/api.ts";

const stanzaName = "gmdb-medium-builder";
const StanzaTag = `togostanza-${stanzaName}`;

export const MediumBuilderStanza: FC = () => {
  return (
    <div>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag togostanza-menu-placement="none"></StanzaTag>
    </div>
  );
};
