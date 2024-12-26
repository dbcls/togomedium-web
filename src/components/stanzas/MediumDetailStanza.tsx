import { FC } from "react";

type Props = {
  gmId: string;
};

export const MediumDetailStanza: FC<Props> = ({ gmId }) => {
  return (
    <div>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-medium-by-gmid.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-medium-by-gmid
        gm_id={gmId}
        togostanza-menu-placement="none"
      ></togostanza-gmdb-medium-by-gmid>
    </div>
  );
};
