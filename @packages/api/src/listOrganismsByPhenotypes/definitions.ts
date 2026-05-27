import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListOrganismsByPhenotypesResponse = ListApiResponse<{
  tax_id: string;
  name: string;
}>;
export type ListOrganismsByPhenotypesParams = ListApiParams<{
  growth_temp?: string;
  growth_ph?: string;
  growth_salinity?: string;
  MPO_10002?: string;
  MPO_07001?: string;
  MPO_02000?: string;
  MPO_01001?: string;
  MPO_03006?: string;
  MPO_04053?: string;
}>;

export const PATH_LIST_ORGANISMS_BY_PHENOTYPES = "/gmdb_organisms_by_phenotypes";

const listOrganismsByPhenotypesResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: z.string(),
    name: z.string(),
  }),
);

const listOrganismsByPhenotypesParamsSchema = createListApiParamsSchema({
  growth_temp: z.string().optional(),
  growth_ph: z.string().optional(),
  growth_salinity: z.string().optional(),
  MPO_10002: z.string().optional(),
  MPO_07001: z.string().optional(),
  MPO_02000: z.string().optional(),
  MPO_01001: z.string().optional(),
  MPO_03006: z.string().optional(),
  MPO_04053: z.string().optional(),
});

export const listOrganismsByPhenotypesDoc: RouteConfig = {
  path: PATH_LIST_ORGANISMS_BY_PHENOTYPES,
  method: "get",
  summary: "List organisms by phenotypes",
  description: "Search organisms by various phenotypes",
  tags: [tags.list],
  request: {
    params: listOrganismsByPhenotypesParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listOrganismsByPhenotypesResponseSchema,
        },
      },
    },
  },
};
