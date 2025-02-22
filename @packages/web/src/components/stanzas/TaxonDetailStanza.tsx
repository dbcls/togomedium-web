import { FC } from "react";
import { URL_STANZA } from "@/consts/api.ts";

type Props = {
  taxId: string;
};

const stanzaName = "gmdb-taxon-detail";
const StanzaTag = `togostanza-${stanzaName}`;

export const TaxonDetailStanza: FC<Props> = ({ taxId }) => {
  return (
    <div>
      <script
        src={`${URL_STANZA}/${stanzaName}.js`}
        type="module"
        async
      ></script>
      <StanzaTag
        tax_id={taxId}
        togostanza-menu-placement="none"
      ></StanzaTag>
    </div>
  );
};
