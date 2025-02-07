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
  @route("gmdb_all_components")
  @tag(Tags.MediaFinder)
  @doc("This endpoint returns a list of all components in the GMDB.")
  @get
  get(): AllComponentsResponse;
}
