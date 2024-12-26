import { FC } from "react";

type Props = {
  strainId: string;
};

export const StrainDetailStanza: FC<Props> = ({ strainId }) => {
  return (
    <div>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-strain-by-strainid.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-strain-by-strainid
        strain_id={strainId}
        togostanza-menu-placement="none"
      ></togostanza-gmdb-strain-by-strainid>
    </div>
  );
};
