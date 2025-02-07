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

model InfraspecificListByTaxIdResponse {
  @doc("Total number of results")
  total: integer;

  @doc("Offset of the results")
  offset: integer;

  @doc("Limit of results per request")
  limit: integer;

  @doc("List of organisms")
  contents: {
    id: {
      label: string;
      href: string;
    };
    rank: string;
    name: string;
  }[];

  @doc("Column metadata")
  columns: {
    key: string;
    label: string;
  }[];
}

interface InfraspecificListByTaxId {
  #deprecated ""
  @route("gmdb_infraspecific_list_by_taxid")
  @tag(Tags.Deprecated)
  @doc("Listing up organisms of taxonomy")
  @get
  get(): InfraspecificListByTaxIdResponse;
}
