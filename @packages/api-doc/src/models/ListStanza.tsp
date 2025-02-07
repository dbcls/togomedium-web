import "@typespec/http";
import "@typespec/rest";
import "@typespec/json-schema";
import "@typespec/openapi3";

using TypeSpec.JsonSchema;
using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

model ListRequest {
  @doc("Maximum number of results to return")
  @query
  limit?: integer;

  @doc("Number of results to skip before returning")
  @query
  offset?: integer;
}

model ListResponse<T> {
  contents: T[];

  @example(100)
  total: integer;

  @example(0)
  offset: integer;

  @example(10)
  limit: integer;

  columns: {
    key: string;
    label: string;
  }[];
}

model ListLink {
  @doc("URL to the target object. Link should be a valid URI. Do not use relative URLs.")
  href: string;

  @doc("Label for the link")
  label: string;
}
