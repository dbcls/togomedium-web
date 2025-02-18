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

model ListPhenotypeOfStrainRequest {
  @query
  @doc("strain ID")
  strain_id: string;

  ...ListRequest;
}

model ListPhenotypeOfStrainResponse {
  ...ListResponse<{
    source: ListLink;
    property: string;
    value: string;
  }>;
}

interface ListPhenotypeOfStrain {
  @route("gmdb_phenotype_by_strainid")
  @tag(Tags.ListStanza)
  @doc("List phenotypes of the given strain")
  @get
  get(...ListPhenotypeOfStrainRequest): ListPhenotypeOfStrainResponse;
}
