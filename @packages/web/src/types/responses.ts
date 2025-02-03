export type MediaAlignmentTableResponse = {
  media: {
    gm_id: string;
    original_media_id: string;
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
    parent: string | null;
    function: string | null;
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
//
export type ListResponse = {
  columns: any[];
  contents: any[];
  limit: string | number;
  total: string | number;
  offset: string | number;
};
