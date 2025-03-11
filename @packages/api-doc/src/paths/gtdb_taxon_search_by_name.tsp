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

model GTDBTaxonSearchByNameRequest {
  @query
  @doc("Taxonomy name")
  @minLength(4)
  q: string;

  @query
  @doc("Maximum number of results to return")
  max: integer;
}

model GTDBTaxonSearchByNameResponse {
  tax_id: string;
  name: string;
  rank: string;
}

interface GTDBTaxonSearchByName {
  @route("/gmdb_gtdb_taxonomy_search_by_name")
  @tag(Tags.Stanza)
  @tag(Tags.New)
  @tag(Tags.GTDB)
  @doc("Searches for a taxonomy by its name, which is particularly useful for incremental searching.")
  @get
  get(...GTDBTaxonSearchByNameRequest): GTDBTaxonSearchByNameResponse[];
}
