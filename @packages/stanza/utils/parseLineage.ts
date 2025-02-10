import { ComponentProps } from "react";
import { ApiLineage, LineageList } from "%stanza/components/styled/LineageList";

export const parseLineage = (lineage: ApiLineage): ComponentProps<typeof LineageList>["lineage"] =>
  lineage.reduce((accum, current) => {
    return current.label === "NA"
      ? { ...accum }
      : {
          ...accum,
          [current.rank]: {
            taxid: current.taxid.toString(),
            label: current.label,
          },
        };
  }, {});
