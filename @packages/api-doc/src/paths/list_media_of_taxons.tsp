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

model ListMediaOfTaxonsRequest {
  @doc("comma-separated tax_id")
  @query
  tax_ids: string;

  ...ListRequest;
}

model ListMediaOfTaxonsResponse {
  ...ListResponse<{
    gm_id: string;
    name: string;
    original_media_id: string;
  }>;
}

interface ListMediaOfTaxons {
  @route("gmdb_media_by_taxon")
  @tag(Tags.ListStanza)
  @doc("Search for media associated with a taxon and return a list")
  @get
  get(...ListMediaOfTaxonsRequest): ListMediaOfTaxonsResponse;
}
