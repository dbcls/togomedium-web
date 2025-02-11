import { ComponentProps } from "react";
import {
  TaxonDetailParams,
  TaxonDetailResponse,
  taxonDetailURL,
} from "%api/taxonDetail/definitions";
import { getData } from "%core/network/getData";
import { unescapeJsonString } from "%core/string/unescapeJsonString";
import { StanzaView } from "%stanza/stanzas/gmdb-taxon-by-taxid/components/StanzaView";
import { parseLineage } from "%stanza/utils/parseLineage";

export type ViewProps = ComponentProps<typeof StanzaView>;

type OtherMaterialParameter = {
  key: string;
  labels: string[];
};

export const parseData = (body: TaxonDetailResponse): ViewProps => {
  const taxid = body.taxid.toString();
  const scientificName = body.scientific_name;
  const authorityName = unescapeJsonString(body.authority_name);
  const lineage = parseLineage(body.lineage);
  const typeMaterials = body.type_material.map((item) => item.label);
  const otherTypeMaterials = parseOtherTypeMaterial(body.other_type_material);
  return { taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials };
};

const parseOtherTypeMaterial = (
  data: TaxonDetailResponse["other_type_material"]
): OtherMaterialParameter[] => {
  return data
    .map((obj) => obj.name!)
    .reduce<string[]>((a: string[], b: string) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, [])!
    .map((key) => ({
      key,
      labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};

export const getTaxonData = async (tax_id: string) => {
  const result = await getData<TaxonDetailResponse, TaxonDetailParams>(taxonDetailURL, {
    tax_id,
  });
  if (!result.body) {
    throw new Error("No data found");
  }
  return parseData(result.body);
};
