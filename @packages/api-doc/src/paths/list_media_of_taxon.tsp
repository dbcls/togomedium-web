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

model ListMediaOfTaxonRequest {
  @doc("single tax_id")
  @query
  tax_id: string;

  ...ListRequest;
}

model ListMediaOfTaxonResponse {
  ...ListResponse<{
    name: string;
    original_media_id: string;
    media_id: ListLink;
  }>;
}

interface ListMediaOfTaxon {
  @route("gmdb_media_by_taxid")
  @tag(Tags.ListStanza)
  @doc("Search for media associated with a taxon and return a list")
  @get
  get(...ListMediaOfTaxonRequest): ListMediaOfTaxonResponse;
}
