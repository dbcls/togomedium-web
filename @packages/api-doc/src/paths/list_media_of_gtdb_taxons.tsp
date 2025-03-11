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

model GTDBListMediaOfTaxonsRequest {
  @doc("single tax_id")
  @query
  tax_id: string;

  ...ListRequest;
}

model GTDBListMediaOfTaxonsResponse {
  ...ListResponse<{
    name: string;
    original_media_id: string;
    media_id: ListLink;
  }>;
}

interface GTDBListMediaOfTaxons {
  @route("gmdb_media_by_gtdb_taxon")
  @tag(Tags.ListStanza)
  @tag(Tags.New)
  @tag(Tags.GTDB)
  @doc("Search for media associated with a taxon and return a list")
  @get
  get(...GTDBListMediaOfTaxonsRequest): GTDBListMediaOfTaxonsResponse;
}
