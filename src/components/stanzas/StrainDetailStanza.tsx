import { FC } from "react";
import { URL_STANZA } from "@/consts.ts";

type Props = {
  strainId: string;
};

const stanzaName = "gmdb-strain-by-strainid";
const StanzaTag = `togostanza-${stanzaName}`;

export const StrainDetailStanza: FC<Props> = ({ strainId }) => {
  return (
    <div>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag strain_id={strainId} togostanza-menu-placement="none"></StanzaTag>
    </div>
  );
};
