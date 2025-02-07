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

model TaxonomyAncestorsRequest {
  @query
  @doc("Taxonomy ID")
  tax_id: string;
}

model TaxonomyAncestorsResponse {
  tax_id: string;
  name: string;
  rank: string;
}

interface TaxonomyAncestors {
  @route("/gmdb_taxonomy_ancestors")
  @tag(Tags.Stanza)
  @tag(Tags.New)
  @doc("Get the ancestors of a taxonomy")
  @get
  get(...TaxonomyAncestorsRequest): TaxonomyAncestorsResponse[];
}
