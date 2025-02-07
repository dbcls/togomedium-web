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

model MediaByAttributesRequest {
  @query
  @doc("String of gmo_id(s) separated by comma.")
  gmo_ids: string;

  ...ListRequest;
}

model MediaByAttributesResponse {
  ...ListResponse<{
    @doc("Media ID")
    gm_id: string;

    @doc("Media name")
    name: string;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Indicates if this is an exact match")
    exact_match: boolean;
  }>;
}

interface MediaByAttributes {
  @route("gmdb_media_by_attributes")
  @tag(Tags.MediaFinder)
  @tag(Tags.ListStanza)
  @doc("Search media by attributes. Currently, only component(gmo_id) is supported. Mostly used at 'Find media by components' page.")
  @get
  get(...MediaByAttributesRequest): MediaByAttributesResponse;
}
