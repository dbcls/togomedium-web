import "@typespec/http";
import "@typespec/rest";
import "@typespec/json-schema";
import "@typespec/openapi3";
import "../models/ListStanza.tsp";
import "../models/variables.tsp";

using TypeSpec.JsonSchema;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

model GmsKeggCodeTidResponse {
  @doc("Response model for gmsKeggCodeTid")
  success: boolean;
}

interface GmsKeggCodeTid {
  @route("gms_kegg_code_tid")
  @tag(Tags.Stanza)
  @doc("Mostly used at the alignment page.")
  @get
  get(): GmsKeggCodeTidResponse;
}
