import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const deprecatedListTaxonsByRankResponseSchema = z.unknown();
const deprecatedListTaxonsByRankParamsSchema = z.object({});

export type DeprecatedListTaxonsByRankResponse = z.infer<
  typeof deprecatedListTaxonsByRankResponseSchema
>;
export type DeprecatedListTaxonsByRankParams = z.infer<
  typeof deprecatedListTaxonsByRankParamsSchema
>;

/**
 * @deprecated
 */
export const deprecatedListTaxonsByRankUrl = makeApiUrl("list_taxons_by_rank");
export const PATH_DEPRECATED_LIST_TAXONS_BY_RANK = "/list_taxons_by_rank";

export const deprecatedListTaxonsByRankDoc: RouteConfig = {
  path: PATH_DEPRECATED_LIST_TAXONS_BY_RANK,
  method: "get",
  summary: "Deprecated list taxons by rank",
  description: "Historically used at the top page for displaying the taxon hierarchy",
  tags: [],
  request: {
    params: deprecatedListTaxonsByRankParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: deprecatedListTaxonsByRankResponseSchema,
        },
      },
    },
  },
};
