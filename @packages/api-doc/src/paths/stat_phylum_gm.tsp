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

model StatPhylumGmRequest {
  ...ListRequest;
}

model StatPhylumGmResponse {
  ...ListResponse<{
    @doc("Phylum link object")
    phylum: string;

    @doc("Number of growth media")
    gms: string;
  }>;
}

interface StatPhylumGm {
  @route("gmdb_stat_phylum_gm")
  @tag(Tags.ListStanza)
  @tag(Tags.Stats)
  @doc("Statistics number of growth media by phylum")
  @get
  get(...StatPhylumGmRequest): StatPhylumGmResponse;
}
