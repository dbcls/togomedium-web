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

model ListOrganismsByPhenotypesRequest {
  @doc("string of 2 numbers separated by comma to represent min and max")
  @example("0,110")
  @query
  growth_temp?: string;

  @doc("string of 2 numbers separated by comma to represent min and max")
  @example("0,14")
  @query
  growth_ph?: string;

  @doc("string of 2 numbers separated by comma to represent min and max")
  @example("0,15")
  @query
  growth_salinity?: string;

  @doc("Single MPO id of Oxygen requirement")
  @example("MPO_04002")
  @query
  MPO_10002?: string;

  @doc("Single MPO id of Gram Strain")
  @example("MPO_07002")
  @query
  MPO_07001?: string;

  @doc("Single MPO id of Motility")
  @example("MPO_02001")
  @query
  MPO_02000?: string;

  @doc("Single MPO id of Cell shape")
  @example("MPO_01015")
  @query
  MPO_01001?: string;

  @doc("Single MPO id of Salinity")
  @example("MPO_03007")
  @query
  MPO_03006?: string;

  @doc("Single MPO id of Carbon fixation")
  @example("MPO_03007")
  @query
  MPO_04053?: string;

  ...ListRequest;
}

model ListOrganismsByPhenotypesResponse {
  ...ListResponse<{
    tax_id: string;
    name: string;
  }>;
}

interface ListOrganismsByPhenotypes {
  @route("gmdb_organisms_by_phenotypes")
  @tag(Tags.ListStanza)
  @doc("Mostly used at `Find media by organism phenotype` page. Search organisms by various phenotypes")
  @get
  get(...ListOrganismsByPhenotypesRequest): ListOrganismsByPhenotypesResponse;
}
