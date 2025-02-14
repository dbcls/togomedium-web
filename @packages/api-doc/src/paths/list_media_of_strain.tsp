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

model ListMediaOfStrainRequest {
  @doc("single strain_id")
  @query
  strain_id: string;

  ...ListRequest;
}

model ListMediaOfStrainResponse {
  ...ListResponse<{
    media_id: ListLink;
    name: string;
    original_media_id: string;
  }>;
}

interface ListMediaOfStrain {
  @route("gmdb_media_by_strainid")
  @tag(Tags.ListStanza)
  @doc("Search for media associated with a strain and return a list")
  @get
  get(...ListMediaOfStrainRequest): ListMediaOfStrainResponse;
}
