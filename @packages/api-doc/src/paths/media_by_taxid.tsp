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

model MediaByTaxIdRequest {
  @query
  @doc("NCBI's tax ID")
  tax_id: string;

  ...ListRequest;
}

model MediaByTaxIdResponse {
  ...ListResponse<{
    @doc("Media ID link object")
    media_id: string;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface MediaByTaxId {
  @route("gmdb_media_by_taxid")
  @tag(Tags.ListStanza)
  @doc("Get growth media by NCBI's tax ID")
  @get
  get(...MediaByTaxIdRequest): MediaByTaxIdResponse;
}
