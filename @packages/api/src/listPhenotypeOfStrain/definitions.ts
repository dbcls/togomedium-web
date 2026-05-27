import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_PHENOTYPE_OF_STRAIN = "/gmdb_phenotype_by_strainid";

const listPhenotypeOfStrainResponseSchema = createListApiResponseSchema(
  z.object({
    source: listApiLinkSchema,
    property: z.string(),
    value: z.string(),
  }),
);
export type ListPhenotypeOfStrainResponse = z.infer<typeof listPhenotypeOfStrainResponseSchema>;

const listPhenotypeOfStrainParamsSchema = createListApiParamsSchema({
  strain_id: z.string(),
});
export type ListPhenotypeOfStrainParams = z.infer<typeof listPhenotypeOfStrainParamsSchema>;

export const listPhenotypeOfStrainDoc: RouteConfig = {
  path: PATH_LIST_PHENOTYPE_OF_STRAIN,
  method: "get",
  summary: "List phenotype of strain",
  description: "List phenotypes of the given strain",
  tags: [tags.list],
  request: {
    params: listPhenotypeOfStrainParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listPhenotypeOfStrainResponseSchema,
        },
      },
    },
  },
};
