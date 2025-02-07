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

model CountMediaByCultivableStrainCountRequest {
  @query
  @doc("")
  threshold?: integer = 11;
}

model CountMediaByCultivableStrainCountResponse {
  @doc("number of cultivatable strains")
  num_cultivatable_strains: integer;

  @doc("number of media")
  num_media: integer;
}

interface CountMediaByCultivableStrainCount {
  @route("/gmdb_stat_count_media_by_cultivable_strain_count")
  @tag(Tags.Stats)
  @tag(Tags.New)
  @doc("")
  @get
  get(...CountMediaByCultivableStrainCountRequest): CountMediaByCultivableStrainCountResponse;
}
