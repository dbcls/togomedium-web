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

model ComponentsWithComponentsRequest {
  @query
  @doc("Comma-separated GMO IDs. If omitted, return all components")
  gmo_ids?: string;
}

model ComponentsWithComponentsResponse {
  @doc("List of components")
  items: {
    gmo_id: string;
    name: string;
  }[];
}

interface ComponentsWithComponents {
  @route("gmdb_components_with_components")
  @tag(Tags.MediaFinder)
  @doc("Find media with the given components, then return all components in the media. Mostly used at 'Find media by components' page.")
  @get
  get(...ComponentsWithComponentsRequest): ComponentsWithComponentsResponse;
}
