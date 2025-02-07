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

model ListSimilarMediaByGmIdRequest {
  @query
  @doc("GM ID")
  gm_id: string;

  ...ListRequest;
}

model ListSimilarMediaByGmIdResponse {
  ...ListResponse<{
    @doc("GM ID link object")
    gm_id: ListLink;

    @doc("Media name")
    name: string;

    @doc("Similarity score")
    score: float;
  }>;
}

interface ListSimilarMediaByGmId {
  @route("gmdb_list_similar_media_by_gmid")
  @tag(Tags.ListStanza)
  @doc("Get similar growth media by GM ID")
  @get
  get(...ListSimilarMediaByGmIdRequest): ListSimilarMediaByGmIdResponse;
}
