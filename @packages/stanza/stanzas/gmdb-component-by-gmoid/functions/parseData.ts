import { Nullable } from "yohak-tools";
import { ComponentDetailResponse } from "%api/componentDetail/definitions";
import { ViewProps } from "%stanza/stanzas/gmdb-component-by-gmoid/components/StanzaView";
import { LinkLabel } from "%stanza/stanzas/gmdb-component-by-gmoid/functions/LinkLabelInfo";

export const parseData = (res: ComponentDetailResponse): ViewProps => {
  return {
    prefLabel: res.pref_label,
    gmoId: res.id,
    altLabels: res.alt_labels_en,
    properties: res.properties,
    roles: res.roles,
    superClasses: res.super_classes,
    subClasses: res.sub_classes,
    links: res.links
      .filter((str) => !!getLinkLabel(str))
      .map((str) => ({
        label: getLinkLabel(str)!,
        uri: str,
      })),
  };
};

const getLinkLabel = (link: string): Nullable<LinkLabel> => {
  switch (true) {
    case /pccompound\/.+/.test(link):
      return "PubChem";
    case /wikipedia/.test(link):
      return "Wikipedia";
    // case /ncicb/.test(link):
    //   return "NCI Thesaurus";
    case /CHEBI/.test(link):
      return "ChEBI";
    case /SNOMEDCT/.test(link):
      return "SNOMED-CT";
    case /dsmz/.test(link):
      return "MediaDive";
    default:
      return null;
  }
};
