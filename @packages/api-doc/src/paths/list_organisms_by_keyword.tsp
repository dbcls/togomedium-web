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

model ListOrganismsByKeywordRequest {
  @query
  @doc("Keyword to search for")
  keyword: string;

  ...ListRequest;
}

model ListOrganismsByKeywordResponse {
  ...ListResponse<{
    @doc("Taxonomy ID link object")
    tax_id: ListLink;

    @doc("Organism label")
    label: string;
  }>;
}

interface ListOrganismsByKeyword {
  @route("gmdb_list_organisms_by_keyword")
  @tag(Tags.ListStanza)
  @doc("List organisms with the given keyword")
  @get
  get(...ListOrganismsByKeywordRequest): ListOrganismsByKeywordResponse;
}
