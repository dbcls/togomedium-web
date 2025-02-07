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

model OrganismByTaxIdRequest {
  @query
  @doc("NCBI Tax ID")
  tax_id: string;
}

model OrganismByTaxIdResponse {
  @doc("Scientific name")
  scientific_name: string;

  @doc("Taxonomy ID")
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

  @doc("Type material")
  type_material: {
    label: string;
  }[];

  @doc("Other type material")
  other_type_material: {
    label: string;
    name: string;
  }[];
}

interface OrganismByTaxId {
  @route("gmdb_organism_by_taxid")
  @tag(Tags.Stanza)
  @tag(Tags.Detail)
  @doc("Returns the detailed information of an organism by its tax ID")
  @get
  get(...OrganismByTaxIdRequest): OrganismByTaxIdResponse;
}
