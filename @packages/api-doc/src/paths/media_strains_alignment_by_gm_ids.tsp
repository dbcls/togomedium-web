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

model SimpleTaxon {
  @doc("Taxon ID")
  id: string;

  @doc("Taxon label")
  label: string;
}

model MediaStrainsAlignmentByGmIdsRequest {
  @query
  @doc("Comma-separated GM IDs")
  gm_ids: string;
}

model MediaStrainsAlignmentByGmIdsResponse {
  @doc("List of media alignment information")
  items: {
    @doc("GM ID")
    gm_id: string;

    @doc("Original media ID")
    original_media_id: string;

    @doc("Media label")
    label: string;

    @doc("List of organisms")
    organisms: {
      superkingdom: SimpleTaxon;
      phylum: SimpleTaxon;
      class: SimpleTaxon;
      order: SimpleTaxon;
      family: SimpleTaxon;
      genus: SimpleTaxon;
      species: SimpleTaxon;
      strain: SimpleTaxon;
    }[];
  }[];
}

interface MediaStrainsAlignmentByGmIds {
  @route("gmdb_media_strains_alignment_by_gm_ids")
  @tag(Tags.Stanza)
  @doc("Find multiple media by GM ID and return alignment information of organisms")
  @get
  get(...MediaStrainsAlignmentByGmIdsRequest): MediaStrainsAlignmentByGmIdsResponse;
}
