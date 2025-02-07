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

model GmsByKeggTids3Response {
  @doc("Response model for gmsByKeggTids3")
  success: boolean;
}

interface GmsByKeggTids3 {
  @route("gms_by_kegg_tids_3")
  @tag(Tags.Stanza)
  @doc("Mostly used at the Alignment page.")
  @get
  get(): GmsByKeggTids3Response;
}
