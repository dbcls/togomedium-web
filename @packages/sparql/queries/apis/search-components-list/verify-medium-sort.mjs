// Explicit local endpoint comparison; excluded from ordinary tests.
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const base = "http://localhost:3000/sparqlist/api/";
const request = async (api, parameters) => {
  const url = new URL(base + api);
  for (const [key, value] of Object.entries(parameters)) url.searchParams.set(key, value);
  const start = performance.now();
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  const body = await response.text();
  assert.equal(response.status, 200, body);
  return { elapsed_ms: performance.now() - start, output: JSON.parse(body) };
};
const cases = [
  ...["asc", "desc"].flatMap((order) =>
    [
      {},
      { limit: "50" },
      { limit: "100" },
      { offset: "20" },
      { offset: "2000" },
      { limit: "0" },
      { name: "DEXTROSE", role_id: "GMO_000042", property_id: "GMO_000050" },
      { name: "リン酸鉄(III)" },
      { role_id: "GMO_999999" },
    ].map((parameters) => ({ sort: "medium_count", order, ...parameters })),
  ),
  ...["name", "id"].flatMap((sort) =>
    ["asc", "desc"].map((order) => ({ sort, order, offset: "20" })),
  ),
];
let zeroUsages = 0;
let tiesChecked = 0;
for (const params of cases) {
  const [combined, list] = await Promise.all([
    request("gmdb_search_components", params),
    request("gmdb_search_components_list", params),
  ]);
  const { facets, ...expected } = combined.output;
  assert.deepEqual(list.output, expected, JSON.stringify(params));
  assert.equal(Object.hasOwn(list.output, "facets"), false);
  if (params.sort === "medium_count") {
    const rows = list.output.contents;
    for (const [index, row] of rows.entries()) {
      if (row.medium_count === 0) zeroUsages++;
      if (!index) continue;
      const previous = rows[index - 1];
      assert.ok(
        params.order === "asc"
          ? previous.medium_count <= row.medium_count
          : previous.medium_count >= row.medium_count,
      );
      if (previous.medium_count === row.medium_count) {
        assert.ok(previous.id < row.id, "equal medium counts use GMO ID ascending");
        tiesChecked++;
      }
    }
  }
  console.log(
    `Verified ${JSON.stringify(params)}: ${list.output.total}/${list.output.contents.length}`,
  );
}
assert.ok(zeroUsages > 0, "zero-usage components remain in the list");
assert.ok(tiesChecked > 0);
const rounds = [];
for (let round = 0; round < 3; round++) {
  const name = await request("gmdb_search_components_list", { sort: "name", order: "asc" });
  const medium = await request("gmdb_search_components_list", {
    sort: "medium_count",
    order: "desc",
  });
  rounds.push({ name_asc_ms: name.elapsed_ms, medium_count_desc_ms: medium.elapsed_ms });
}
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const report = {
  verified_at: new Date().toISOString(),
  base,
  cases_verified: cases.length,
  zero_usage_rows_observed: zeroUsages,
  adjacent_ties_verified: tiesChecked,
  timing_filters: { name: "", role_id: "", property_id: "", limit: "20", offset: "0" },
  rounds,
  medians_ms: Object.fromEntries(
    Object.keys(rounds[0]).map((key) => [key, median(rounds.map((row) => row[key]))]),
  ),
};
await writeFile(
  "queries/apis/search-components-list/results/medium-sort-verification.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
