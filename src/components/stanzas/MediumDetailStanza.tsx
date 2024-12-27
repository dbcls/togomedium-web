import { FC } from "react";
import { URL_STANZA } from "@/consts.ts";

type Props = {
  gmId: string;
};

const stanzaName = "gmdb-medium-by-gmid";
const StanzaTag = `togostanza-${stanzaName}`;

export const MediumDetailStanza: FC<Props> = ({ gmId }) => {
  return (
    <>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag gm_id={gmId} togostanza-menu-placement="none"></StanzaTag>
    </>
  );
};
