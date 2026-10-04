import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as combinedJson } from "../search-components2/output.mjs";
import { json } from "./output.mjs";

await test("facets need no page results and preserve zero counts and hierarchy", () => {
  const value = (value) => ({ value });
  const inputs = {
    role_none: { results: { bindings: [{ count: value("0") }] } },
    property_none: { results: { bindings: [{ count: value("1") }] } },
    roles: {
      results: {
        bindings: [
          {
            id: value("GMO_000042"),
            label: value("Nutrient source"),
            count: value("0"),
            parent: value("http://purl.jp/bio/10/gmo/GMO_000037"),
          },
        ],
      },
    },
    properties: { results: { bindings: [] } },
  };
  const expected = combinedJson({
    ...inputs,
    result: { results: { bindings: [] } },
    count: {
      results: { bindings: [{ total: value("0"), limit: value("20"), offset: value("0") }] },
    },
  }).facets;
  assert.deepEqual(json(inputs), { ...expected, role_none_count: 0, property_none_count: 1 });
  checkStandalone(json, [inputs]);
});

await test("facets config contains only conditional queries and search filters", async () => {
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(config.inputs), [
    "roles",
    "properties",
    "role_none",
    "property_none",
  ]);
  assert.deepEqual(Object.keys(config.parameters), ["name", "role_id", "property_id"]);
});

await test("unassigned counts reject missing, negative or unsafe values", () => {
  const empty = { results: { bindings: [] } };
  for (const raw of [undefined, "-1", "0.5", "9007199254740992"]) {
    const count = { results: { bindings: raw === undefined ? [] : [{ count: { value: raw } }] } };
    assert.throws(
      () => json({ roles: empty, properties: empty, role_none: count, property_none: count }),
      /Invalid unassigned/,
    );
  }
});
