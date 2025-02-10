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

model AllComponentsResponse {
  @doc("List of all components in GMDB")
  items: {
    gmo_id: string;
    name: string;
  }[];
}

interface AllComponents {
  #deprecated ""
  @route("gmdb_all_components")
  @tag(Tags.Deprecated)
  @doc("Deprecated, in favor of `components_with_components`. This endpoint returns a list of all components in the GMDB.")
  @get
  get(): AllComponentsResponse;
}
