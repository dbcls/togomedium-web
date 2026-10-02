import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as combinedJson } from "../search-components2/output.mjs";
import { json } from "./output.mjs";

await test("list needs no facet results and equals the combined page projection", () => {
  const value = (value) => ({ value });
  const empty = { results: { bindings: [] } };
  for (const result of [
    empty,
    {
      results: {
        bindings: [
          {
            gmo_id: value("GMO_001010"),
            label: value("Glucose"),
            alias: value("name,alias"),
            matched_name: value("Glucose"),
            medium_count: value("12"),
          },
        ],
      },
    },
  ]) {
    const inputs = {
      result,
      count: {
        results: { bindings: [{ total: value("1"), limit: value("20"), offset: value("0") }] },
      },
    };
    const { facets, ...expected } = combinedJson({ ...inputs, roles: empty, properties: empty });
    assert.deepEqual(json(inputs), expected);
    assert.equal(facets.roles.length, 0);
    checkStandalone(json, [inputs]);
  }
});

await test("list execution config has only the page and total queries", async () => {
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  assert.deepEqual(Object.keys(config.inputs), ["result", "count"]);
});
