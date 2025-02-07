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

model ListMediaRequest {
  ...ListRequest;
}

model ListMediaResponse {
  ...ListResponse<{
    @doc("media id link object")
    media_id: ListLink;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface ListMedia {
  @route("list_media")
  @tag(Tags.ListStanza)
  @doc("List all growth media")
  @get
  get(...ListMediaRequest): ListMediaResponse;
}
