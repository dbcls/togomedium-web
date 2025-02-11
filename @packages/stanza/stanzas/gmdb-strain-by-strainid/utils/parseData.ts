import { ComponentProps } from "react";
import { StrainDetailResponse } from "%api/strainDetail/definitions";
import { StanzaView } from "%stanza/stanzas/gmdb-strain-by-strainid/components/StanzaView";

type ViewProps = ComponentProps<typeof StanzaView>;
export const parseData = (body: StrainDetailResponse): ViewProps => {
  const strainId = body.strain.strain_id;
  const strainName = body.strain.strain_name;
  const infoSources = body.strain.other_strain_id_list.map((item) => ({
    url: item.other_strain_link,
    label: item.other_strain_id,
  }));
  const taxonomy: ViewProps["taxonomy"] = body.taxonomy
    ? {
        name: body.taxonomy.scientific_name,
        taxId: body.taxonomy.taxid.toString(),
        rank: body.taxonomy.rank,
        authorityName: body.taxonomy.authority_name,
        lineage: body.taxonomy.lineage.reduce((accum, current) => {
          return {
            ...accum,
            [current.rank]: {
              taxid: current.taxid.toString(),
              label: current.label,
            },
          };
        }, {}),
      }
    : null;
  return {
    strainId,
    strainName,
    infoSources,
    taxonomy,
  };
};
