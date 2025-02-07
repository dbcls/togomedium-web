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

model ListComponentsRequest {
  ...ListRequest;
}

model ListComponentsResponse {
  ...ListResponse<{
    @doc("GMO ID link object")
    gmo_id: ListLink;

    @doc("Component name")
    name: string;
  }>;
}

interface ListComponents {
  @route("list_components")
  @tag(Tags.ListStanza)
  @doc("List all components")
  @get
  get(...ListComponentsRequest): ListComponentsResponse;
}
