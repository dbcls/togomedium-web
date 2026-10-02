// Explicit network checks and measurements, excluded from ordinary tests.
// Run from @packages/sparql; the default URLs target the existing local Docker.
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { renderParameters } from "../../../scripts/parameters.mjs";

const base = "http://localhost:3000/sparqlist/api/";
const endpoint = "https://dev.togomedium.org/sparql";
const oldFolder = "queries/apis/search-components";
const newFolder = "queries/apis/search-components2";
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const request = async (name, parameters) => {
  const url = new URL(base + name);
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
for (const supplied of cases) {
  const parameters = { sort: "name", order: "asc", ...supplied };
  const [old, next] = await Promise.all([
    request("gmdb_search_components", parameters),
    request("gmdb_search_components2", supplied),
  ]);
  assert.deepEqual(next.output, old.output, JSON.stringify(supplied));
  console.log(
    `Same response ${JSON.stringify(supplied)}: ${next.output.total} matches, ${next.output.contents.length} returned`,
  );
}
const invalid = new URL(base + "gmdb_search_components2");
invalid.searchParams.set("sort", "medium_count");
const rejected = await fetch(invalid, { signal: AbortSignal.timeout(30_000) });
assert.equal(rejected.ok, false);
assert.ok((await rejected.text()).includes("Invalid"));

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const samples = {};
const apiCases = [
  ["old_name_asc", "gmdb_search_components", { sort: "name", order: "asc" }],
  ["new_name_asc", "gmdb_search_components2", { sort: "name", order: "asc" }],
  ["old_default_medium_desc", "gmdb_search_components", {}],
  ["new_default_name_asc", "gmdb_search_components2", {}],
];
// Interleave the APIs for three measured rounds after the verification warm-up.
for (let round = 0; round < 3; round++) {
  for (const [key, api, params] of apiCases) {
    const result = await request(api, params);
    (samples[key] ??= []).push(result.elapsed_ms);
  }
}
const oldConfig = await readJson(`${oldFolder}/api.json`);
const newConfig = await readJson(`${newFolder}/api.json`);
const queryCases = [
  ["list_medium_desc", oldFolder, "list-components-by-medium-count.rq", oldConfig, {}],
  [
    "old_list_name_asc",
    oldFolder,
    "list-components-with-properties.rq",
    oldConfig,
    { sort: "name", order: "asc" },
  ],
  ["new_list_name_asc", newFolder, "list-components-with-properties.rq", newConfig, {}],
  ["total", newFolder, "count-components.rq", newConfig, {}],
  ["roles", newFolder, "count-components-by-role.rq", newConfig, {}],
  ["properties", newFolder, "count-components-by-property.rq", newConfig, {}],
];
for (let round = 0; round < 3; round++) {
  for (const [key, folder, file, config, supplied] of queryCases) {
    const source = await readFile(`${folder}/${file}`, "utf8");
    const query = renderParameters(source, config.parameters, supplied);
    const url = new URL(endpoint);
    url.searchParams.set("query", query);
    const start = performance.now();
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
      signal: AbortSignal.timeout(30_000),
    });
    const body = await response.text();
    assert.equal(response.status, 200, body);
    JSON.parse(body);
    (samples[key] ??= []).push(performance.now() - start);
  }
}
const report = {
  verified_at: new Date().toISOString(),
  local_base: base,
  sparql_endpoint: endpoint,
  cases_verified: cases.length,
  rounds: 3,
  samples,
  medians_ms: Object.fromEntries(
    Object.entries(samples).map(([key, values]) => [key, median(values)]),
  ),
};
await writeFile(`${newFolder}/results/benchmark.json`, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
