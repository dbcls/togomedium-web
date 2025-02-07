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

model ListMediaByCultivableCountRequest {
  @query
  @doc("number of cultivatable strains")
  cultivable_count?: integer = 1;

  ...ListRequest;
}

model ListMediaByCultivableCountResponse {
  ...ListResponse<{
    @doc("gm id")
    media_id: ListLink;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media name")
    media_name: string;
  }>;
}

interface ListMediaByCultivableCount {
  @route("/gmdb_list_media_by_cultivable_strain_count")
  @tag(Tags.ListStanza)
  @tag(Tags.New)
  @doc("List media by cultivable count")
  @get
  get(...ListMediaByCultivableCountRequest): ListMediaByCultivableCountResponse;
}
