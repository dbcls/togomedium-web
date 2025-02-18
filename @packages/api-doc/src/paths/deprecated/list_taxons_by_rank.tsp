import "@typespec/http";
import "@typespec/rest";
import "@typespec/json-schema";
import "@typespec/openapi3";
import "../../models/ListStanza.tsp";
import "../../models/variables.tsp";

using TypeSpec.JsonSchema;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

interface ListTaxonsByRank {
  #deprecated ""
  @route("list_taxons_by_rank")
  @tag(Tags.Deprecated)
  @doc("Historically used at the top page for displaying the taxon hierarchy")
  @get
  get(): unknown;
}
