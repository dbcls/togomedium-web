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

model ListComponentsByGmoIdsRequest {
  @query
  @doc("Comma-separated GMO IDs.")
  gmo_ids: string;

  ...ListRequest;
}

model ListComponentsByGmoIdsResponse {
  ...ListResponse<{
    @doc("GMO ID link object")
    gmo_id: ListLink;

    @doc("Component name")
    name: string;
  }>;
}

interface ListComponentsByGmoIds {
  @route("gmdb_list_components_by_gmoids")
  @tag(Tags.ListStanza)
  @doc("List growth media components with the given GMO IDs")
  @get
  get(...ListComponentsByGmoIdsRequest): ListComponentsByGmoIdsResponse;
}
