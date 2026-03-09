import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const deprecatedTaxonomicRankByTaxIdResponseSchema = z.object({
  scientific_name: z.string(),
  taxid: z.string(),
  rank: z.string(),
  authority_name: z.string(),
  lineage: z.array(
    z.object({
      rank: z.string(),
      label: z.string(),
      uri: z.string(),
      taxid: z.string(),
    }),
  ),
});
const deprecatedTaxonomicRankByTaxIdParamsSchema = z.object({
  tax_id: z.string(),
});

export type DeprecatedTaxonomicRankByTaxIdResponse = z.infer<
  typeof deprecatedTaxonomicRankByTaxIdResponseSchema
>;
export type DeprecatedTaxonomicRankByTaxIdParams = z.infer<
  typeof deprecatedTaxonomicRankByTaxIdParamsSchema
>;

/**
 * @deprecated
 */
export const deprecatedTaxonomicRankByTaxIdUrl = makeApiUrl("gmdb_taxonomic_rank_by_taxid");
export const PATH_DEPRECATED_TAXONOMIC_RANK_BY_TAXID = "/gmdb_taxonomic_rank_by_taxid";

export const deprecatedTaxonomicRankByTaxIdDoc: RouteConfig = {
  path: PATH_DEPRECATED_TAXONOMIC_RANK_BY_TAXID,
  method: "get",
  summary: "Deprecated taxonomic rank by tax ID",
  description:
    "Deprecated, in favor of `organism_by_taxid`, Returns detailed information of a taxonomic rank based on tax ID",
  tags: [tags.deprecated],
  request: {
    params: deprecatedTaxonomicRankByTaxIdParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: deprecatedTaxonomicRankByTaxIdResponseSchema,
        },
      },
    },
  },
};
