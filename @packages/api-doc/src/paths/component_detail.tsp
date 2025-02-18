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

model ComponentDetailRequest {
  @query
  @doc("GMO ID")
  gmo_id: string;
}

model ComponentDetailResponse {
  @doc("Preferred label")
  pref_label: string;

  @doc("Component ID")
  id: string;

  @doc("Japanese label")
  label_ja: string;

  @doc("Alternative labels in English")
  alt_labels_en: string[];

  @doc("Alternative labels in Japanese")
  alt_labels_ja: string[];

  @doc("Super classes")
  super_classes: {
    gmo_id: string;
    uri: string;
    label_en: string;
  }[];

  @doc("Sub classes")
  sub_classes: {
    gmo_id: string;
    uri: string;
    label_en: string;
  }[];

  @doc("Properties")
  properties: {
    gmo_id: string;
    uri: string;
    label_en: string;
  }[];

  @doc("Roles")
  roles: {
    gmo_id: string;
    uri: string;
    label_en: string;
  }[];

  @doc("External links")
  links: string[];
}

interface ComponentDetail {
  @route("gmdb_component_by_gmoid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns detailed information of a component based on gmo_id.")
  @get
  get(...ComponentDetailRequest): ComponentDetailResponse;
}
