import { FC } from "react";
import { booleanToString } from "@/utils/boolean.ts";

type Props = {
  id?: string;
  api: string;
  limit?: number;
  title?: string;
  columnNames?: boolean;
  columnSizes: number[];
};

export const ListStanza: FC<Props> = ({
  api,
  limit = 20,
  title = "",
  columnNames = true,
  columnSizes,
}) => {
  return (
    <div>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-meta-list
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
