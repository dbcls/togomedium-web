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

model GTDBTaxonChildrenRequest {
  @query
  @doc("Taxonomy ID")
  tax_id: string;
}

model GTDBTaxonChildrenResponse {
  @doc("List of direct child taxa")
  items: {
    tax_id: string;
    name: string;
    rank: string;
  }[];
}

interface GTDBTaxonChildren {
  @route("gmdb_gtdb_taxonomy_children")
  @tag(Tags.MediaFinder)
  @tag(Tags.New)
  @tag(Tags.GTDB)
  @doc("Returns the direct children of the given taxonomy ID. Mostly used at 'Find media by taxonomic tree' page.")
  @get
  get(...GTDBTaxonChildrenRequest): GTDBTaxonChildrenResponse;
}
