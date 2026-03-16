import { tags } from "%api/consts";
import { createListApiParamsSchema, createListApiResponseSchema } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const listOrganismsOfMediumResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: z.string(),
    name: z.string(),
  }),
);
const listOrganismsOfMediumParamsSchema = createListApiParamsSchema({
  gm_id: z.string(),
});

export type ListOrganismsOfMediumResponse = z.infer<typeof listOrganismsOfMediumResponseSchema>;
export type ListOrganismsOfMediumParams = z.infer<typeof listOrganismsOfMediumParamsSchema>;

export const listOrganismsOfMediumUrl = makeApiUrl("gmdb_organisms_by_gmid");
export const PATH_LIST_ORGANISMS_OF_MEDIUM = "/gmdb_organisms_by_gmid";

export const listOrganismsOfMediumDoc: RouteConfig = {
  path: PATH_LIST_ORGANISMS_OF_MEDIUM,
  method: "get",
  summary: "List organisms of medium",
  description: "Get organisms by a growth medium ID",
  tags: [tags.list],
  request: {
    params: listOrganismsOfMediumParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listOrganismsOfMediumResponseSchema,
        },
      },
    },
  },
};
