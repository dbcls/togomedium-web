import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const listOrganismsResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: listApiLinkSchema,
    label: z.string(),
  }),
);
const listOrganismsParamsSchema = createListApiParamsSchema({});

export type ListOrganismsResponse = z.infer<typeof listOrganismsResponseSchema>;
export type ListOrganismsParams = z.infer<typeof listOrganismsParamsSchema>;

export const PATH_LIST_ORGANISMS = "/list_organisms";

export const listOrganismsDoc: RouteConfig = {
  path: PATH_LIST_ORGANISMS,
  method: "get",
  summary: "List organisms",
  description: "List all organisms",
  tags: [tags.list],
  request: {
    params: listOrganismsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listOrganismsResponseSchema,
        },
      },
    },
  },
};
