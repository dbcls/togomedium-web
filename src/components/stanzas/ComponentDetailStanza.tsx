import { FC } from "react";
import { URL_STANZA } from "@/consts/api.ts";

type Props = {
  gmoId: string;
};

const stanzaName = "gmdb-component-by-gmoid";
const StanzaTag = `togostanza-${stanzaName}`;

export const ComponentDetailStanza: FC<Props> = ({ gmoId }) => {
  return (
    <>
      <script
        src={`${URL_STANZA}/${stanzaName}.js`}
        type="module"
        async
      ></script>
      <StanzaTag
        gmo_id={gmoId}
        togostanza-menu-placement="none"
      ></StanzaTag>
    </>
  );
};
