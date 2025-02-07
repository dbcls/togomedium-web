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

model TaxonomicRankByTaxIdRequest {
  @query
  @doc("NCBI Tax ID")
  tax_id: string;
}

model TaxonomicRankByTaxIdResponse {
  @doc("Scientific name")
  scientific_name: string;

  @doc("Taxonomy ID")
  taxid: string;

  @doc("Taxonomic rank")
  rank: string;

  @doc("Authority name")
  authority_name: string;

  @doc("Lineage information")
  lineage: {
    rank: string;
    label: string;
    uri: string;
    taxid: string;
  }[];
}

interface TaxonomicRankByTaxId {
  @route("gmdb_taxonomic_rank_by_taxid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns detailed information of a taxonomic rank based on tax ID")
  @get
  get(...TaxonomicRankByTaxIdRequest): TaxonomicRankByTaxIdResponse;
}
