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

model ListMediaByGmIdsRequest {
  @query
  @doc("Comma-separated GMIDs")
  gm_ids: string;

  ...ListRequest;
}

model ListMediaByGmIdsResponse {
  ...ListResponse<{
    @doc("Media ID link object")
    media_id: ListLink;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface ListMediaByGmIds {
  @route("gmdb_list_media_by_gmids")
  @tag(Tags.ListStanza)
  @doc("List growth media with the given GMIDs")
  @get
  get(...ListMediaByGmIdsRequest): ListMediaByGmIdsResponse;
}
