// Explicit network verification; excluded from ordinary tests.
// Run from @packages/sparql after pnpm query .../verification-corpus.rq.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const folder = "queries/apis/search-components";
const localApiUrl = process.argv[2];
const raw = JSON.parse(await readFile(`${folder}/results/verification-corpus.json`, "utf8"));
for (const file of ["verification-associations", "verification-media"]) {
  const result = JSON.parse(await readFile(`${folder}/results/${file}.json`, "utf8"));
  raw.results.bindings.push(...result.results.bindings);
}
const components = new Map();
for (const row of raw.results.bindings) {
  const id = row.gmo_id.value;
  if (!components.has(id))
    components.set(id, {
      id,
      labels: new Map(),
      aliases: new Set(),
      roles: new Set(),
      properties: new Set(),
      media: new Set(),
    });
  const component = components.get(id);
  if (row.label)
    component.labels.set(`${row.label.value}\u0000${row.label["xml:lang"] ?? ""}`, {
      text: row.label.value,
      language: row.label["xml:lang"] ?? "",
    });
  for (const [key, variable] of [
    ["aliases", "alias"],
    ["roles", "role_id"],
    ["properties", "property_id"],
    ["media", "medium"],
  ]) {
    if (row[variable]) component[key].add(row[variable].value);
  }
}
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
for (const component of components.values()) {
  if (!component.labels.size) {
    components.delete(component.id);
    continue;
  }
  const labels = [...component.labels.values()].sort(
    (a, b) =>
      Number(/^en(?:-|$)/i.test(b.language)) - Number(/^en(?:-|$)/i.test(a.language)) ||
      compare(a.text, b.text) ||
      compare(a.language, b.language),
  );
  component.name = labels[0].text;
}
const matches = (component, params, omit) =>
  (!params.name ||
    [...component.labels.values()]
      .map((x) => x.text)
      .concat([...component.aliases])
      .some((label) => label.toLowerCase().includes(params.name.toLowerCase()))) &&
  (omit === "roles" || !params.role_id || component.roles.has(params.role_id)) &&
  (omit === "properties" || !params.property_id || component.properties.has(params.property_id));
const cases = [
  {},
  ...["name", "id", "medium_count"].flatMap((sort) =>
    ["asc", "desc"].flatMap((order) => [
      { sort, order },
      { sort, order, offset: "20" },
    ]),
  ),
  { limit: "50" },
  { limit: "100" },
  { limit: "0" },
  { offset: "2000" },
  { name: "DEXTROSE" },
  { name: "glucose", role_id: "GMO_000042", property_id: "GMO_000050" },
  { role_id: "GMO_000042" },
  { property_id: "GMO_000050" },
  { role_id: "GMO_000042", property_id: "GMO_000050" },
  { role_id: "GMO_999999" },
  { name: '"\\\n{{role_id}},unlikely' },
];
// Exercise a real comma-containing alias, if present, without interpreting it as CSV.
const commaAlias = [...components.values()]
  .flatMap((x) => [...x.aliases])
  .find((x) => x.includes(","));
if (commaAlias) cases.push({ name: commaAlias });
const secondaryNames = [...components.values()].flatMap((component) =>
  [...component.labels.values()]
    .filter((label) => label.text !== component.name && !component.aliases.has(label.text))
    .map((label) => ({
      id: component.id,
      display_name: component.name,
      matched_name: label.text,
      language: label.language,
    })),
);
if (secondaryNames.length) cases.push({ name: secondaryNames[0].matched_name });
const summaries = [];
let options;
for (const supplied of cases) {
  const params = {
    name: "",
    role_id: "",
    property_id: "",
    sort: "medium_count",
    order: "desc",
    limit: "20",
    offset: "0",
    ...supplied,
  };
  const run = spawnSync(
    process.execPath,
    [
      "--env-file-if-exists=.env",
      "scripts/api.mjs",
      folder,
      ...Object.entries(supplied).flatMap(([key, value]) => ["--param", `${key}=${value}`]),
    ],
    { encoding: "utf8" },
  );
  assert.equal(run.status, 0, `${JSON.stringify(supplied)}\n${run.stdout}\n${run.stderr}`);
  const output = JSON.parse(await readFile(`${folder}/results/output.json`, "utf8"));
  if (localApiUrl) {
    const url = new URL(localApiUrl);
    for (const [key, value] of Object.entries(supplied)) url.searchParams.set(key, value);
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assert.equal(response.status, 200, JSON.stringify(supplied));
    assert.deepEqual(
      await response.json(),
      output,
      `Local SPARQList differs: ${JSON.stringify(supplied)}`,
    );
  }
  const all = [...components.values()];
  const expected = all
    .filter((x) => matches(x, params))
    .sort((a, b) => {
      const key = params.sort;
      const aValue = key === "medium_count" ? a.media.size : a[key];
      const bValue = key === "medium_count" ? b.media.size : b[key];
      return (params.order === "desc" ? -1 : 1) * compare(aValue, bValue) || compare(a.id, b.id);
    });
  assert.equal(output.total, String(expected.length));
  assert.equal(output.limit, params.limit);
  assert.equal(output.offset, params.offset);
  assert.deepEqual(
    output.contents.map((x) => x.id),
    expected
      .slice(Number(params.offset), Number(params.offset) + Number(params.limit))
      .map((x) => x.id),
  );
  for (const item of output.contents) {
    const component = components.get(item.id);
    assert.equal(item.name, component.name);
    assert.equal(item.medium_count, component.media.size);
    assert.deepEqual(new Set(item.aliases), component.aliases);
    const matchedNames = params.name
      ? [...component.labels.values()]
          .map((x) => x.text)
          .concat([...component.aliases])
          .filter((name) => name.toLowerCase().includes(params.name.toLowerCase()))
      : [];
    assert.deepEqual(new Set(item.matched_names), new Set(matchedNames));
  }
  const currentOptions = Object.fromEntries(
    Object.entries(output.facets).map(([key, items]) => [
      key,
      items.map(({ count, ...item }) => item),
    ]),
  );
  if (options) assert.deepEqual(currentOptions, options);
  options = currentOptions;
  for (const key of ["roles", "properties"]) {
    const eligible = all.filter((x) => matches(x, params, key));
    for (const item of output.facets[key]) {
      assert.equal(
        item.count,
        eligible.filter((x) => x[key].has(item.gmo_id)).length,
        `${JSON.stringify(supplied)} ${key} ${item.gmo_id}`,
      );
    }
  }
  summaries.push({ parameters: supplied, total: output.total, returned: output.contents.length });
  console.log(
    `Verified ${JSON.stringify(supplied)}: ${output.total} matches, ${output.contents.length} returned`,
  );
}
await writeFile(
  `${folder}/results/verification-summary.json`,
  JSON.stringify(
    {
      verified_at: new Date().toISOString(),
      local_api: localApiUrl ?? null,
      corpus_size: components.size,
      secondary_standard_names: secondaryNames,
      options,
      cases: summaries,
    },
    null,
    2,
  ) + "\n",
);

if (localApiUrl) {
  for (const [key, value] of [
    ["sort", "unknown"],
    ["limit", "-1"],
    ["role_id", "bad"],
    ["offset", "01"],
  ]) {
    const url = new URL(localApiUrl);
    url.searchParams.set(key, value);
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assert.equal(response.ok, false, `${key} should reject ${value}`);
    assert.ok((await response.text()).includes("Invalid"));
    console.log(`Rejected ${key}=${value} (${response.status})`);
  }
}
