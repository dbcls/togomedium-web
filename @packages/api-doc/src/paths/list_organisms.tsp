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

model ListOrganismsRequest {
  ...ListRequest;
}

model ListOrganismsResponse {
  ...ListResponse<{
    @doc("Taxonomy ID link object")
    tax_id: ListLink;

    @doc("Organism label")
    label: string;
  }>;
}

interface ListOrganisms {
  @route("list_organisms")
  @tag(Tags.ListStanza)
  @doc("List all organisms")
  @get
  get(...ListOrganismsRequest): ListOrganismsResponse;
}
