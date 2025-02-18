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

model ListChildrenOfTaxonRequest {
  @doc("single strain_id")
  @query
  tax_id: string;

  ...ListRequest;
}

model ListChildrenOfTaxonResponse {
  ...ListResponse<{
    tax_id: ListLink;
    name: string;
    rank: string;
    num_of_media: integer;
  }>;
}

interface ListChildrenOfTaxon {
  @route("gmdb_organism_under_rank_by_taxid")
  @tag(Tags.ListStanza)
  @doc("List direct children of a taxon. Do not confuse with `gmdb_taxonomy_children` which is not a list type API")
  @get
  get(...ListChildrenOfTaxonRequest): ListChildrenOfTaxonResponse;
}
