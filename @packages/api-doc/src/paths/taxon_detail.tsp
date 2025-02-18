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

model TaxonDetailRequest {
  @query
  @doc("NCBI Tax ID")
  tax_id: string;
}

model TaxonDetailResponse {
  @doc("Scientific name")
  scientific_name: string;

  @doc("NCBI Taxonomy ID")
  taxid: integer;

  @doc("Taxonomic rank URI")
  rank: string;

  @doc("Authority name")
  authority_name: string;

  @doc("Lineage information")
  lineage: {
    uri: string;
    taxid: integer;
    label: string;
    rank: string;
  }[];

  @doc("Type material, available when species is returned")
  type_material: {
    label: string;
  }[];

  @doc("Other type material, available when species is returned")
  other_type_material: {
    label: string;
    name: string;
  }[];
}

interface TaxonDetail {
  @route("gmdb_organism_by_taxid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns the detailed information of taxon by its tax ID")
  @get
  get(...TaxonDetailRequest): TaxonDetailResponse;
}
