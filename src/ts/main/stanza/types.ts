import { Nullable } from "yohak-tools";

export type MediaAlignmentTableResponse = {
  media: {
    gm_id: string;
    name: string;
    components: string[];
    organisms: string[];
  }[];
  organisms: {
    tax_id: string;
    name: string;
  }[];
  components: {
    gmo_id: string;
    name: string;
    parent: Nullable<string>;
    function: Nullable<string>;
  }[];
};
export type MediaByTaxonResponse = {
  total: number;
  offset: number;
  limit: number;
  contents: {
    gm_id: string;
    name: string;
  }[];
};
