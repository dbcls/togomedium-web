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

model ListMediaByKeywordRequest {
  @query
  @doc("Keyword to search for")
  keyword: string;

  ...ListRequest;
}

model ListMediaByKeywordResponse {
  ...ListResponse<{
    @doc("Media ID link object")
    media_id: ListLink;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface ListMediaByKeyword {
  @route("gmdb_list_media_by_keyword")
  @tag(Tags.ListStanza)
  @doc("List growth media with the given keyword")
  @get
  get(...ListMediaByKeywordRequest): ListMediaByKeywordResponse;
}
