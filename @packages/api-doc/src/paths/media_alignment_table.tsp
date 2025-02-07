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

model MediaAlignmentTableByGmIdsRequest {
  @query
  @doc("Single string of GM IDs separated by comma")
  gm_ids: string;
}

model MediaAlignmentTableByGmIdsResponse {
  @doc("List of media")
  media: {
    gm_id: string;
    original_media_id: string;
    name: string;

    @doc("List of tax IDs")
    components: string[];

    @doc("List of GMO IDs")
    organisms: string[];
  }[];

  @doc("List of organisms")
  organisms: {
    tax_id: string;
    name: string;
  }[];

  @doc("List of components")
  components: {
    gmo_id: string;
    name: string;
    parent: string | null;
    category: string | null;
    display_order: integer;
  }[];
}

interface MediaAlignmentTableByGmIds {
  @route("gmdb_media_alignment_by_gm_ids")
  @tag(Tags.Stanza)
  @doc("Returns the alignment information of components based on GM IDs. Mostly used at 'Compare media' page.")
  @get
  get(...MediaAlignmentTableByGmIdsRequest): MediaAlignmentTableByGmIdsResponse;
}
