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

model ListOrganismsOfMediumRequest {
  @query
  @doc("Growth medium ID")
  gm_id: string;

  ...ListRequest;
}

model ListOrganismsOfMediumResponse {
  ...ListResponse<{
    @doc("Taxonomy ID link object")
    tax_id: string;

    @doc("Organism name")
    name: string;
  }>;
}

interface ListOrganismsOfMedium {
  @route("gmdb_organisms_by_gmid")
  @tag(Tags.ListStanza)
  @doc("Get organisms by a growth medium ID")
  @get
  get(...ListOrganismsOfMediumRequest): ListOrganismsOfMediumResponse;
}
