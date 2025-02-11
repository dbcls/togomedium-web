import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonDetailResponse = {
  scientific_name: string;
  taxid: number | string;
  rank: string;
  authority_name: string;
  lineage: Lineage;
  type_material: { label: string; name?: string }[];
  other_type_material: { label: string; name: string }[];
};
export type TaxonDetailParams = { tax_id: string };
export const taxonDetailURL = makeApiUrl("gmdb_organism_by_taxid");

type Lineage = {
  uri: string;
  taxid: number;
  label: string;
  rank: string;
}[];
