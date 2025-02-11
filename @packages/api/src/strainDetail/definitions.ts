import { makeApiUrl } from "%core/network/makeApiUrl";

export type StrainDetailResponse = {
  strain: {
    strain_id: string;
    strain_name: string;
    other_strain_id_list: {
      other_strain_id: string;
      other_strain_link: string;
    }[];
  };
  taxonomy: {
    scientific_name: string;
    taxid: number;
    rank: string;
    authority_name: string;
    lineage: {
      uri: string;
      taxid: number;
      label: string;
      rank: string;
    }[];
  };
};
export type StrainDetailParams = { strain_id: string };
export const strainDetailURL = makeApiUrl("gmdb_strain_by_strainid");
