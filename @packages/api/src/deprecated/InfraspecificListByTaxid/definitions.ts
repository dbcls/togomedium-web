import { tags } from "%api/consts";
import { createListApiParamsSchema, createListApiResponseSchema } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const deprecatedInfraspecificListByTaxIdResponseSchema = createListApiResponseSchema(
  z.object({
    id: z.object({
      label: z.string(),
      href: z.string(),
    }),
    rank: z.string(),
    name: z.string(),
  }),
);
const deprecatedInfraspecificListByTaxIdParamsSchema = createListApiParamsSchema({});

export type DeprecatedInfraspecificListByTaxIdResponse = z.infer<
  typeof deprecatedInfraspecificListByTaxIdResponseSchema
>;
export type DeprecatedInfraspecificListByTaxIdParams = z.infer<
  typeof deprecatedInfraspecificListByTaxIdParamsSchema
>;

/**
 * @deprecated
 */
export const deprecatedInfraspecificListByTaxIdUrl = makeApiUrl("gmdb_infraspecific_list_by_taxid");
export const PATH_DEPRECATED_INFRASPECIFIC_LIST_BY_TAXID = "/gmdb_infraspecific_list_by_taxid";

export const deprecatedInfraspecificListByTaxIdDoc: RouteConfig = {
  path: PATH_DEPRECATED_INFRASPECIFIC_LIST_BY_TAXID,
  method: "get",
  summary: "Deprecated infraspecific list by tax ID",
  description: "Listing up organisms of taxonomy",
  tags: [tags.deprecated],
  request: {
    params: deprecatedInfraspecificListByTaxIdParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: deprecatedInfraspecificListByTaxIdResponseSchema,
        },
      },
    },
  },
};
