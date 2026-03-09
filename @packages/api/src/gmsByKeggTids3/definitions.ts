import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const gmsByKeggTids3ResponseSchema = z.object({
  success: z.boolean(),
});
const gmsByKeggTids3ParamsSchema = z.object({});

export type GmsByKeggTids3Response = z.infer<typeof gmsByKeggTids3ResponseSchema>;
export type GmsByKeggTids3Params = z.infer<typeof gmsByKeggTids3ParamsSchema>;

export const gmsByKeggTids3Url = makeApiUrl("gms_by_kegg_tids_3");
export const PATH_GMS_BY_KEGG_TIDS_3 = "/gms_by_kegg_tids_3";

export const gmsByKeggTids3Doc: RouteConfig = {
  path: PATH_GMS_BY_KEGG_TIDS_3,
  method: "get",
  summary: "GMS by KEGG TIDs 3",
  description: "Mostly used at the Alignment page.",
  tags: [tags.stanza],
  request: {
    params: gmsByKeggTids3ParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: gmsByKeggTids3ResponseSchema,
        },
      },
    },
  },
};
