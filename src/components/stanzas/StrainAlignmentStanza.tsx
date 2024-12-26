import { FC } from "react";
import { booleanToString } from "@/utils/boolean.ts";

type Props = {
  gmIds: string[];
  hideMedia?: boolean;
};
export const StrainAlignmentStanza: FC<Props> = ({ gmIds, hideMedia = false }) => {
  return (
    <div className={"overflow-x-hidden"}>
      <script
        src="https://dbcls.github.io/togomedium-stanza/gmdb-media-strains-alignment-table.js"
        type="module"
        async
      ></script>
      <togostanza-gmdb-media-strains-alignment-table
        gm_ids={gmIds.join(",")}
        hide_media={booleanToString(hideMedia)}
        togostanza-menu-placement="none"
      ></togostanza-gmdb-media-strains-alignment-table>
    </div>
  );
};
