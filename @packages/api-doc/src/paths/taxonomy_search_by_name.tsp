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

model TaxonomySearchByNameRequest {
  @query
  @doc("Taxonomy name")
  @minLength(4)
  q: string;

  @query
  @doc("Maximum number of results to return")
  max: integer;
}

model TaxonomySearchByNameResponse {
  tax_id: string;
  name: string;
  rank: string;
}

interface TaxonomySearchByName {
  @route("/gmdb_taxonomy_search_by_name")
  @tag(Tags.Stanza)
  @tag(Tags.New)
  @doc("Search for a taxonomy by name; useful for incremental search.")
  @get
  get(...TaxonomySearchByNameRequest): TaxonomySearchByNameResponse[];
}
