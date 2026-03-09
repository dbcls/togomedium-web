import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const gmsKeggCodeTidResponseSchema = z.object({
  success: z.boolean(),
});
const gmsKeggCodeTidParamsSchema = z.object({});

export type GmsKeggCodeTidResponse = z.infer<typeof gmsKeggCodeTidResponseSchema>;
export type GmsKeggCodeTidParams = z.infer<typeof gmsKeggCodeTidParamsSchema>;

export const gmsKeggCodeTidUrl = makeApiUrl("gms_kegg_code_tid");
export const PATH_GMS_KEGG_CODE_TID = "/gms_kegg_code_tid";

export const gmsKeggCodeTidDoc: RouteConfig = {
  path: PATH_GMS_KEGG_CODE_TID,
  method: "get",
  summary: "GMS KEGG code TID",
  description: "Mostly used at the alignment page.",
  tags: [],
  request: {
    params: gmsKeggCodeTidParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: gmsKeggCodeTidResponseSchema,
        },
      },
    },
  },
};
