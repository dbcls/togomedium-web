// Explicit network verification, independent corpus/predicate observations; no temporary API registration.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
const endpoint = "https://dev.togomedium.org/sparql";
const base = "http://localhost:3000/sparqlist/api/";
const sparql = async (file) => {
  const query = await readFile(new URL(file, import.meta.url), "utf8");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({ query }),
    signal: AbortSignal.timeout(60000),
  });
  assert.equal(response.status, 200);
  return (await response.json()).results.bindings;
};
const request = async (api, params) => {
  const url = new URL(base + api);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  const body = await response.text();
  assert.equal(response.status, 200, `${url}: ${body}`);
  return JSON.parse(body);
};
const corpus = new Map();
for (const row of await sparql("../search-components/verification-corpus.rq")) {
  const id = row.gmo_id.value;
  const item = corpus.get(id) ?? {
    id,
    names: new Set(),
    aliases: new Set(),
    roles: new Set(),
    properties: new Set(),
    hasRole: false,
    hasProperty: false,
    media: new Set(),
  };
  item.names.add(row.label.value);
  if (row.alias) {
    item.names.add(row.alias.value);
    if (row.alias["xml:lang"] === "en") item.aliases.add(row.alias.value);
  }
  corpus.set(id, item);
}
for (const row of await sparql("./verification-assignments.rq")) {
  const item = corpus.get(row.gmo_id.value);
  item.hasRole ||= !!row.assigned_role;
  item.hasProperty ||= !!row.assigned_property;
  if (row.role_id) item.roles.add(row.role_id.value);
  if (row.property_id) item.properties.add(row.property_id.value);
}
for (const row of await sparql("../search-components/verification-media.rq"))
  corpus.get(row.gmo_id.value)?.media.add(row.medium.value);
const matches = (item, params, exclude = "") => {
  const text = (params.name ?? "").toLowerCase();
  if (
    text &&
    !item.id.toLowerCase().includes(text) &&
    ![...item.names].some((name) => name.toLowerCase().includes(text))
  )
    return false;
  for (const kind of ["role", "property"]) {
    if (exclude === kind) continue;
    const selected = params[kind + "_id"];
    if (!selected) continue;
    if (selected === "none") {
      if (item[kind === "role" ? "hasRole" : "hasProperty"]) return false;
    } else if (!item[kind === "role" ? "roles" : "properties"].has(selected)) return false;
  }
  return true;
};
const all = [...corpus.values()];
const cases = [
  {},
  { name: "GMO_001009" },
  { name: "001009" },
  { name: "gmo_001009" },
  { name: "リン酸一水素カリウム" },
  { name: "DEXTROSE" },
  { role_id: "none" },
  { property_id: "none" },
  { role_id: "none", property_id: "none" },
  { name: "yeast", role_id: "none" },
  { role_id: "none", property_id: "GMO_000047" },
  { role_id: "GMO_000038", property_id: "none" },
  { name: "001009", role_id: "GMO_000038", property_id: "GMO_000040" },
  { name: "001009", role_id: "none" },
  { name: "no match impossible", role_id: "none", property_id: "none" },
];
const record = [];
for (const params of cases) {
  const expected = all.filter((item) => matches(item, params));
  const list = await request("gmdb_search_components_list", params);
  assert.equal(Number(list.total), expected.length, JSON.stringify(params));
  for (const row of list.contents) {
    assert.ok(matches(corpus.get(row.id), params));
    assert.deepEqual(
      row.aliases,
      [...corpus.get(row.id).aliases].sort((left, right) =>
        left < right ? -1 : left > right ? 1 : 0,
      ),
    );
    assert.equal(row.medium_count, corpus.get(row.id).media.size);
  }
  const facets = await request("gmdb_search_components_facets", params);
  for (const kind of ["role", "property"]) {
    const eligible = all.filter((item) => matches(item, params, kind));
    assert.equal(
      facets[kind + "_none_count"],
      eligible.filter((item) => !item[kind === "role" ? "hasRole" : "hasProperty"]).length,
    );
    for (const option of facets[kind === "role" ? "roles" : "properties"])
      assert.equal(
        option.count,
        eligible.filter((item) => item[kind === "role" ? "roles" : "properties"].has(option.gmo_id))
          .length,
        kind + option.gmo_id + JSON.stringify(params),
      );
  }
  record.push({
    params,
    total: list.total,
    role_none_count: facets.role_none_count,
    property_none_count: facets.property_none_count,
  });
  console.log("Verified", JSON.stringify(record.at(-1)));
}
const detail = await request("gmdb_component_by_gmoid", { gmo_id: "GMO_001009" });
const page = await request("gmdb_search_components_list", { name: "001009" });
assert.deepEqual(page.contents[0].aliases, detail.alt_labels_en);
assert.equal(detail.alt_labels_en.length, 3);
for (const sort of ["name", "id", "medium_count"])
  for (const order of ["asc", "desc"]) {
    const full = await request("gmdb_search_components_list", { sort, order, limit: "100" });
    const page = await request("gmdb_search_components_list", {
      sort,
      order,
      limit: "20",
      offset: "20",
    });
    assert.deepEqual(page.contents, full.contents.slice(20, 40));
    assert.equal(page.total, full.total);
    for (let i = 1; i < full.contents.length; i++) {
      const before = full.contents[i - 1],
        after = full.contents[i];
      const key = sort === "name" ? "name" : sort === "id" ? "id" : "medium_count";
      assert.ok(order === "asc" ? before[key] <= after[key] : before[key] >= after[key]);
      if (before[key] === after[key]) assert.ok(before.id < after.id);
    }
  }
for (const params of [{ limit: "0" }, { offset: "2000" }])
  assert.deepEqual((await request("gmdb_search_components_list", params)).contents, []);
await mkdir(new URL("./results/", import.meta.url), { recursive: true });
await writeFile(
  new URL("./results/adjustments-verification.json", import.meta.url),
  JSON.stringify(
    {
      endpoint,
      corpus_count: corpus.size,
      cases: record,
      detail_aliases: detail.alt_labels_en,
      paging_sort_cases: 6,
    },
    null,
    2,
  ),
);
