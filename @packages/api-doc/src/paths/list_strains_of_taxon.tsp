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

model ListStrainsOfTaxonRequest {
  @query
  tax_id: string;

  ...ListRequest;
}

model ListStrainsOfTaxonResponse {
  ...ListResponse<{
    @doc("ID link object")
    id: ListLink;

    name: string;
    other_ids: string;
  }>;
}

interface ListStrainsOfTaxon {
  @route("gmdb_strain_list_by_taxid")
  @tag(Tags.ListStanza)
  @doc("List organisms with the given tax IDs")
  @get
  get(...ListStrainsOfTaxonRequest): ListStrainsOfTaxonResponse;
}
