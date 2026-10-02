import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as searchJson } from "./output.mjs";
const json = (inputs) =>
  searchJson({
    roles: { results: { bindings: [] } },
    properties: { results: { bindings: [] } },
    ...inputs,
  });

const value = (value) => ({ value });
const count = {
  results: { bindings: [{ total: value("100"), limit: value("20"), offset: value("0") }] },
};
const component = {
  gmo_id: value("GMO_001010"),
  label: value("D-Glucose"),
  alias: value("Dextrose"),
  medium_count: value("12"),
};
const property = {
  property: value("http://example.org/property/1"),
  property_id: value("P1"),
  property_label_en: value("Property 1"),
};

await test("groups properties without duplicating components or repeated properties", () => {
  const row = { ...component, ...property };
  const second = {
    ...row,
    property: value("http://example.org/property/2"),
    property_id: value("P2"),
  };
  const output = json({ result: { results: { bindings: [row, row, second] } }, count });
  assert.equal(output.contents.length, 1);
  assert.equal(output.contents[0].id, "GMO_001010");
  assert.equal(Object.hasOwn(output.contents[0], "gmo_id"), false);
  assert.equal(Object.hasOwn(output.contents[0], "href"), false);
  assert.equal(Object.hasOwn(output, "columns"), false);
  assert.equal(output.contents[0].name, "D-Glucose");
  assert.deepEqual(output.contents[0].aliases, ["Dextrose"]);
  assert.deepEqual(
    output.contents[0].properties.map((item) => item.gmo_id),
    ["P1", "P2"],
  );
});

await test("keeps components without properties and without aliases", () => {
  const row = { gmo_id: value("C1"), label: value("Component") };
  const output = json({ result: { results: { bindings: [row] } }, count });
  assert.deepEqual(output.contents, [
    {
      id: "C1",
      name: "Component",
      aliases: [],
      matched_names: [],
      medium_count: 0,
      properties: [],
      roles: [],
    },
  ]);
});

await test("keeps the actual total and pagination on an empty page", () => {
  const output = json({ result: { results: { bindings: [] } }, count });
  assert.deepEqual(output.contents, []);
  assert.equal(Object.hasOwn(output, "columns"), false);
  assert.equal(output.total, "100");
  assert.equal(output.limit, "20");
  assert.equal(output.offset, "0");
});

// Verify the same function outside its ES module.
await test("SPARQList Output runs independently", () => {
  checkStandalone(searchJson, [
    {
      result: { results: { bindings: [{ ...component, ...property }] } },
      count,
      roles: { results: { bindings: [] } },
      properties: { results: { bindings: [] } },
    },
    {
      result: { results: { bindings: [] } },
      count,
      roles: { results: { bindings: [] } },
      properties: { results: { bindings: [] } },
    },
  ]);
});

await test("collects sparse role and property rows without URIs or duplicates", () => {
  const role = { role: value("urn:role"), role_id: value("R1"), role_label_en: value("Role 1") };
  const inputs = {
    result: {
      results: {
        bindings: [
          component,
          { ...component, ...property },
          { ...component, ...role },
          { ...component, ...role },
        ],
      },
    },
    count,
  };
  const item = json(inputs).contents[0];
  assert.deepEqual(item.properties, [{ gmo_id: "P1", label_en: "Property 1" }]);
  assert.deepEqual(item.roles, [{ gmo_id: "R1", label_en: "Role 1", parent: null }]);
  checkStandalone(searchJson, [
    { roles: { results: { bindings: [] } }, properties: { results: { bindings: [] } }, ...inputs },
  ]);
});

await test("includes one parent ID per role and normalizes the root", () => {
  const row = {
    ...component,
    role_id: value("R1"),
    role_label_en: value("Role"),
    role_parent: value("urn:parent"),
    role_parent_id: value("P1"),
  };
  const inputs = { result: { results: { bindings: [row, row] } }, count };
  assert.deepEqual(json(inputs).contents[0].roles, [
    { gmo_id: "R1", label_en: "Role", parent: "P1" },
  ]);
  checkStandalone(searchJson, [
    { roles: { results: { bindings: [] } }, properties: { results: { bindings: [] } }, ...inputs },
  ]);
  const root = {
    ...row,
    role_parent: value("http://purl.jp/bio/10/gmo/GMO_000037"),
    role_parent_id: value("GMO_000037"),
  };
  assert.equal(
    json({ result: { results: { bindings: [root] } }, count }).contents[0].roles[0].parent,
    null,
  );
  assert.throws(
    () => json({ result: { results: { bindings: [row, root] } }, count }),
    /Multiple parents/,
  );
});

await test("returns a numeric medium count without adding repeated association rows", () => {
  const row = { ...component, ...property };
  const inputs = { result: { results: { bindings: [row, row, component] } }, count };
  assert.equal(json(inputs).contents[0].medium_count, 12);
  const zero = { ...component, medium_count: value("0") };
  assert.equal(
    json({ result: { results: { bindings: [zero] } }, count }).contents[0].medium_count,
    0,
  );
  checkStandalone(searchJson, [
    { roles: { results: { bindings: [] } }, properties: { results: { bindings: [] } }, ...inputs },
  ]);
});

await test("preserves query order when association rows repeat", () => {
  const first = { ...component, gmo_id: value("GMO_002000"), medium_count: value("2") };
  const second = { ...component, gmo_id: value("GMO_001000"), medium_count: value("1") };
  const input = { result: { results: { bindings: [first, first, second, second] } }, count };
  assert.deepEqual(
    json(input).contents.map((item) => item.id),
    ["GMO_002000", "GMO_001000"],
  );
  checkStandalone(searchJson, [
    { roles: { results: { bindings: [] } }, properties: { results: { bindings: [] } }, ...input },
  ]);
});

await test("accepts the six sort combinations and rejects unsupported sort inputs", async () => {
  const { readFile } = await import("node:fs/promises");
  const { renderParameters } = await import("../../../scripts/parameters.mjs");
  const { parameters } = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  assert.equal(renderParameters('"{{sort}}" "{{order}}"', parameters), '"medium_count" "desc"');
  for (const sort of ["name", "id", "medium_count"]) {
    for (const order of ["asc", "desc"]) {
      assert.equal(
        renderParameters('"{{sort}}" "{{order}}"', parameters, { sort, order }),
        `"${sort}" "${order}"`,
      );
    }
  }
  for (const supplied of [{ sort: "unknown" }, { order: "DESC" }, { sort: "name) LIMIT 1 #" }]) {
    assert.throws(() => renderParameters('"{{sort}}"', parameters, supplied), /Invalid/);
  }
});

await test("aliases preserve comma and quote characters without splitting or duplicates", () => {
  const rows = ["a,b", "a,b", 'a"b', "和名"].map((alias) => ({
    ...component,
    alias: value(alias),
  }));
  const inputs = {
    result: { results: { bindings: rows } },
    count,
    roles: { results: { bindings: [] } },
    properties: { results: { bindings: [] } },
  };
  assert.deepEqual(searchJson(inputs).contents[0].aliases, ["a,b", 'a"b', "和名"]);
  assert.equal(searchJson(inputs).contents[0].name, "D-Glucose");
  checkStandalone(searchJson, [inputs]);
});

await test("matched names retain a nonpreferred standard name without adding it to aliases", () => {
  const row = { ...component, matched_name: value("リン酸鉄(III)") };
  const inputs = {
    result: { results: { bindings: [row, row] } },
    count,
    roles: { results: { bindings: [] } },
    properties: { results: { bindings: [] } },
  };
  const item = searchJson(inputs).contents[0];
  assert.deepEqual(item.matched_names, ["リン酸鉄(III)"]);
  assert.deepEqual(item.aliases, ["Dextrose"]);
  assert.equal(item.name, "D-Glucose");
  checkStandalone(searchJson, [inputs]);
});

await test("facet output retains zero, hierarchy and repeated rows without summing counts", () => {
  const role = {
    id: value("GMO_000042"),
    label: value("Nutrient source"),
    count: value("0"),
    parent: value("http://purl.jp/bio/10/gmo/GMO_000037"),
    parent_id: value("GMO_000037"),
  };
  const property = {
    id: value("GMO_000050"),
    label: value("Complex component"),
    count: value("2"),
  };
  const inputs = {
    result: { results: { bindings: [] } },
    count,
    roles: { results: { bindings: [role, role] } },
    properties: { results: { bindings: [property] } },
  };
  assert.deepEqual(searchJson(inputs).facets, {
    roles: [{ gmo_id: "GMO_000042", label_en: "Nutrient source", parent: null, count: 0 }],
    properties: [{ gmo_id: "GMO_000050", label_en: "Complex component", count: 2 }],
  });
  checkStandalone(searchJson, [inputs]);
  for (const invalid of ["-1", "01", "1.5", "9007199254740992", ""]) {
    assert.throws(
      () =>
        searchJson({
          ...inputs,
          properties: { results: { bindings: [{ ...property, count: value(invalid) }] } },
        }),
      /Invalid facet count/,
    );
  }
  assert.throws(
    () =>
      searchJson({
        ...inputs,
        roles: { results: { bindings: [role, { ...role, parent: value("urn:other") }] } },
      }),
    /Multiple parents/,
  );
});
