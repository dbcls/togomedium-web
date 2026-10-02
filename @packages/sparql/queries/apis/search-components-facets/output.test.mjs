import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as combinedJson } from "../search-components2/output.mjs";
import { json } from "./output.mjs";

await test("facets need no page results and preserve zero counts and hierarchy", () => {
  const value = (value) => ({ value });
  const inputs = {
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
  assert.deepEqual(json(inputs), expected);
  checkStandalone(json, [inputs]);
});

await test("facets config contains only conditional queries and search filters", async () => {
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(config.inputs), ["roles", "properties"]);
  assert.deepEqual(Object.keys(config.parameters), ["name", "role_id", "property_id"]);
});
