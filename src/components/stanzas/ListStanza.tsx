import { FC } from "react";
import { URL_STANZA } from "@/consts.ts";
import { booleanToString } from "@/utils/boolean.ts";

type Props = {
  id?: string;
  api: string;
  limit?: number;
  title?: string;
  columnNames?: boolean;
  columnSizes: number[];
};

const stanzaName = "gmdb-meta-list";
const StanzaTag = `togostanza-${stanzaName}`;

export const ListStanza: FC<Props> = ({
  api,
  limit = 20,
  title = "",
  columnNames = true,
  columnSizes,
}) => {
  return (
    <div>
      <script src={`${URL_STANZA}/${stanzaName}.js`} type="module" async></script>
      <StanzaTag
        id="list"
        api_url={api}
        limit={Math.round(limit).toString()}
        title={title}
        column_names={booleanToString(columnNames)}
        column_sizes={columnSizes.join(",")}
        togostanza-menu-placement="none"
      />
    </div>
  );
};
