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

model ListComponentsByKeywordRequest {
  @query
  @doc("Keyword to search for")
  keyword: string;

  ...ListRequest;
}

model ListComponentsByKeywordResponse {
  ...ListResponse<{
    @doc("GMO ID link object")
    gmo_id: ListLink;

    @doc("Component name")
    name: string;
  }>;
}

interface ListComponentsByKeyword {
  @route("gmdb_list_components_by_keyword")
  @tag(Tags.ListStanza)
  @doc("List growth media components with the given keyword")
  @get
  get(...ListComponentsByKeywordRequest): ListComponentsByKeywordResponse;
}
