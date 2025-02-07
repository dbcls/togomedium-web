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

model ListOrganismsByTaxIdsRequest {
  @query
  @doc("Comma-separated list of tax IDs")
  tax_ids: string;

  ...ListRequest;
}

model ListOrganismsByTaxIdsResponse {
  ...ListResponse<{
    @doc("Taxonomy ID link object")
    tax_id: ListLink;

    @doc("Organism label")
    label: string;
  }>;
}

interface ListOrganismsByTaxIds {
  @route("gmdb_list_organisms_by_taxids")
  @tag(Tags.ListStanza)
  @doc("List organisms with the given tax IDs")
  @get
  get(...ListOrganismsByTaxIdsRequest): ListOrganismsByTaxIdsResponse;
}
