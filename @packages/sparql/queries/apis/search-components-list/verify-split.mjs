// Explicit network validation and list-first measurements, excluded from ordinary tests.
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const base = "http://localhost:3000/sparqlist/api/";
const request = async (api, parameters = {}) => {
  const url = new URL(base + api);
  for (const [key, value] of Object.entries(parameters)) url.searchParams.set(key, value);
  const start = performance.now();
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  const body = await response.text();
  assert.equal(response.status, 200, body);
  return { elapsed_ms: performance.now() - start, output: JSON.parse(body) };
};
const cases = [
  {},
  ...["name", "id"].flatMap((sort) =>
    ["asc", "desc"].flatMap((order) => [
      { sort, order },
      { sort, order, offset: "20" },
    ]),
  ),
  { limit: "50" },
  { limit: "100" },
  { limit: "0" },
  { offset: "2000" },
  { name: "リン酸鉄(III)" },
  { role_id: "GMO_000042", property_id: "GMO_000050" },
  { name: "DEXTROSE", role_id: "GMO_000042" },
  { role_id: "GMO_999999" },
];
const facetResponses = new Map();
for (const params of cases) {
  const filters = {
    name: params.name ?? "",
    role_id: params.role_id ?? "",
    property_id: params.property_id ?? "",
  };
  const key = JSON.stringify(filters);
  const [combined, list] = await Promise.all([
    request("gmdb_search_components2", params),
    request("gmdb_search_components_list", { sort: "name", order: "asc", ...params }),
  ]);
  const { facets, ...expectedList } = combined.output;
  assert.deepEqual(list.output, expectedList, JSON.stringify(params));
  if (!facetResponses.has(key))
    facetResponses.set(key, (await request("gmdb_search_components_facets", filters)).output);
  assert.deepEqual(facetResponses.get(key), facets, JSON.stringify(params));
  console.log(
    `Split response verified ${JSON.stringify(params)}: ${list.output.total} matches, ${list.output.contents.length} returned`,
  );
}
const rounds = [];
for (let round = 0; round < 3; round++) {
  const combined = await request("gmdb_search_components2");
  const start = performance.now();
  const list = await request("gmdb_search_components_list", { sort: "name", order: "asc" });
  const listReady = performance.now() - start;
  const facets = await request("gmdb_search_components_facets");
  const allReady = performance.now() - start;
  const { facets: expectedFacets, ...expectedList } = combined.output;
  assert.deepEqual(list.output, expectedList);
  assert.deepEqual(facets.output, expectedFacets);
  rounds.push({
    combined_ms: combined.elapsed_ms,
    list_ms: list.elapsed_ms,
    facets_ms: facets.elapsed_ms,
    list_ready_ms: listReady,
    all_ready_ms: allReady,
  });
}
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const report = {
  verified_at: new Date().toISOString(),
  base,
  params: {
    name: "",
    role_id: "",
    property_id: "",
    sort: "name",
    order: "asc",
    limit: "20",
    offset: "0",
  },
  cases_verified: cases.length,
  distinct_facet_requests: facetResponses.size,
  rounds,
  medians_ms: Object.fromEntries(
    Object.keys(rounds[0]).map((key) => [key, median(rounds.map((row) => row[key]))]),
  ),
};
await writeFile(
  "queries/apis/search-components-list/results/split-benchmark.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
