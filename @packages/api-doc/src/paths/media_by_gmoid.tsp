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

model MediaByGmoIdRequest {
  @query
  @doc("GMO ID")
  gmo_id: string;

  ...ListRequest;
}

model MediaByGmoIdResponse {
  ...ListResponse<{
    @doc("Media ID link object")
    media_id: string;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface MediaByGmoId {
  @route("gmdb_media_by_gmoid")
  @tag(Tags.ListStanza)
  @doc("Get growth media by a component's GMO ID")
  @get
  get(...MediaByGmoIdRequest): MediaByGmoIdResponse;
}
