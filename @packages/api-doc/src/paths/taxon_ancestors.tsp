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

model TaxonAncestorsRequest {
  @query
  @doc("Taxonomy ID")
  tax_id: string;
}

model TaxonAncestorsResponse {
  tax_id: string;
  name: string;
  rank: string;
}

interface TaxonAncestors {
  @route("/gmdb_taxonomy_ancestors")
  @tag(Tags.Stanza)
  @tag(Tags.New)
  @doc("Retrieve the ancestors of a taxonomy, useful for visualizing the taxon's hierarchical tree structure")
  @get
  get(...TaxonAncestorsRequest): TaxonAncestorsResponse[];
}
