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

model GTDBTaxonAncestorsRequest {
  @query
  @doc("Taxonomy ID")
  tax_id: string;
}

model GTDBTaxonAncestorsResponse {
  tax_id: string;
  name: string;
  rank: string;
}

interface GTDBTaxonAncestors {
  @route("/gmdb_gtdb_taxonomy_ancestors")
  @tag(Tags.Stanza)
  @tag(Tags.New)
  @tag(Tags.GTDB)
  @doc("Retrieve the ancestors of a taxonomy, useful for visualizing the taxon's hierarchical tree structure")
  @get
  get(...GTDBTaxonAncestorsRequest): GTDBTaxonAncestorsResponse[];
}
