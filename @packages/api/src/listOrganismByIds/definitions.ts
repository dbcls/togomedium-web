import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const listOrganismByIdsUrl = makeApiUrl("gmdb_list_organisms_by_taxids");
export const PATH_LIST_ORGANISMS_BY_TAXIDS = "/gmdb_list_organisms_by_taxids";

const listOrganismByIdsResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: listApiLinkSchema,
    label: z.string(),
  }),
);
export type ListOrganismByIdsResponse = z.infer<typeof listOrganismByIdsResponseSchema>;

const listOrganismByIdsParamsSchema = createListApiParamsSchema({
  tax_ids: z.string(),
});
export type ListOrganismByIdsParams = z.infer<typeof listOrganismByIdsParamsSchema>;

export const listOrganismByIdsDoc: RouteConfig = {
  path: PATH_LIST_ORGANISMS_BY_TAXIDS,
  method: "get",
  summary: "List organisms by tax IDs",
  description: "List organisms with the given tax IDs",
  tags: [tags.list],
  request: {
    params: listOrganismByIdsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listOrganismByIdsResponseSchema,
        },
      },
    },
  },
};
