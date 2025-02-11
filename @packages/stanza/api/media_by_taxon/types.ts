/**
 * @deprecated
 */
export type MediaByTaxonResponse = {
  total: number;
  offset: number;
  limit: number;
  contents: {
    gm_id: string;
    name: string;
  }[];
};

/**
 * @deprecated
 */
export type MediaByTaxonParams = {
  tax_ids: string[];
  limit: number;
  offset: number;
};
