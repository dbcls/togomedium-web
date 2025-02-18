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

model MediumDetailRequest {
  @query
  @doc("Growth medium ID")
  gmid: string;
}

model MediumDetailResponse {
  @doc("Metadata about the medium")
  meta: {
    gm: string;
    name: string;
    original_media_id: string;
    src_url: string;
    ph: string;
  };

  @doc("List of components")
  components: {
    paragraph_index: float;
    subcomponent_name: string;
    items: {
      component_name: string;
      conc_unit: string;
      conc_value: float;
      reference_media_id: string;
      volume: float;
      unit: string;
      gmo: string;
      gmo_id: string;
      label: string;
      properties: {
        id: string;
        uri: string;
        label: string;
      }[];
      roles: {
        id: string;
        uri: string;
        label: string;
      }[];
    }[];
  }[];

  @doc("Comments about the medium")
  comments: {
    paragraph_index: integer;
    comment: string;
  }[];
}

interface MediumDetail {
  @route("gmdb_medium_by_gmid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns the detailed information of a medium by its GMID")
  @get
  get(...MediumDetailRequest): MediumDetailResponse;
}
