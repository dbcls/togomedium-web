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

model StrainDetailRequest {
  @query
  @doc("Strain ID")
  strain_id: string;
}

model StrainDetailResponse {
  strain: {
    strain_id: string;
    strain_name: string;
    other_strain_id_list: {
      other_strain_id: string;
      other_strain_link: string;
    }[];
  };
  taxonomy: {
    scientific_name: string;
    taxid: integer;
    rank: string;
    authority_name: string;
    lineage: {
      uri: string;
      taxid: integer;
      label: string;
      rank: string;
    }[];
  };
}

interface StrainDetail {
  @route("gmdb_strain_by_strainid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns the detailed information of a strain by its strain ID")
  @get
  get(...StrainDetailRequest): StrainDetailResponse;
}
