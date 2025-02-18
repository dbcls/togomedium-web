import "@typespec/http";
import "@typespec/rest";
import "@typespec/json-schema";
import "@typespec/openapi3";
import "../../models/ListStanza.tsp";
import "../../models/variables.tsp";

using TypeSpec.JsonSchema;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

interface ListMediaDeprecated {
  #deprecated ""
  @route("gmdb_list_media")
  @tag(Tags.Deprecated)
  @doc("This endpoint is deprecated. Use `/list_media` instead.")
  @get
  get(): unknown;
}
