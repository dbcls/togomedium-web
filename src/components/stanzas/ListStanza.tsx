import { FC } from "react";

type Props = {
  id?: string;
  api_url?: string;
  limit?: string;
  title?: string;
  column_names?: boolean;
  column_size?: number[];
};

export const ListStanza: FC<Props> = () => {
  return (
    <div>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-meta-list
        id="list"
        api_url="https://togomedium.org/sparqlist/api/list_media"
        limit="20"
        title=""
        column_names="true"
        column-size="15,85"
        togostanza-menu-placement="none"
      />
    </div>
  );
};
