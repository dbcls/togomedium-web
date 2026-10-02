// Read-only verification of the saved default response using independent RDF rows.
// First refresh the three verification datasets documented by search-components.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const source = "queries/apis/search-components/results";
const components = new Map();
for (const row of (await readJson(`${source}/verification-corpus.json`)).results.bindings) {
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
  const item = components.get(id);
  item.labels.set(`${row.label.value}\u0000${row.label["xml:lang"] ?? ""}`, {
    name: row.label.value,
    language: row.label["xml:lang"] ?? "",
  });
  if (row.alias) item.aliases.add(row.alias.value);
}
for (const file of ["verification-associations", "verification-media"]) {
  for (const row of (await readJson(`${source}/${file}.json`)).results.bindings) {
    const item = components.get(row.gmo_id.value);
    if (!item) continue;
    for (const [key, variable] of [
      ["roles", "role_id"],
      ["properties", "property_id"],
      ["media", "medium"],
    ]) {
      if (row[variable]) item[key].add(row[variable].value);
    }
  }
}
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
for (const item of components.values()) {
  item.name = [...item.labels.values()].sort(
    (a, b) =>
      Number(/^en(?:-|$)/i.test(b.language)) - Number(/^en(?:-|$)/i.test(a.language)) ||
      compare(a.name, b.name) ||
      compare(a.language, b.language),
  )[0].name;
}
const output = await readJson("queries/apis/search-components2/results/output.json");
assert.equal(output.limit, "20");
assert.equal(output.offset, "0");
assert.equal(output.total, String(components.size));
const expected = [...components.values()]
  .sort((a, b) => compare(a.name, b.name) || compare(a.id, b.id))
  .slice(0, 20);
assert.deepEqual(
  output.contents.map((x) => x.id),
  expected.map((x) => x.id),
);
for (const item of output.contents) {
  const expected = components.get(item.id);
  assert.equal(item.name, expected.name);
  assert.equal(item.medium_count, expected.media.size);
  assert.deepEqual(new Set(item.aliases), expected.aliases);
  assert.deepEqual(item.matched_names, []);
}
for (const key of ["roles", "properties"]) {
  for (const facet of output.facets[key]) {
    assert.equal(
      facet.count,
      [...components.values()].filter((x) => x[key].has(facet.gmo_id)).length,
    );
  }
}
console.log(
  `Independent default verification: ${components.size} components, ${output.contents.length} page items, all Role/Property counts match`,
);
