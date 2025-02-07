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

model MediaByTaxonRequest {
  @doc("comma-separated tax_id")
  @query
  tax_ids: integer;

  ...ListRequest;
}

model MediaByTaxonResponse {
  ...ListResponse<{
    tax_id: {
      label: string;
      href: string;
    };
    label: string;
  }>;
}

interface MediaByTaxon {
  @route("gmdb_media_by_taxon")
  @tag(Tags.ListStanza)
  @doc("Search for media associated with a taxon and return a list")
  @get
  get(...MediaByTaxonRequest): MediaByTaxonResponse;
}
