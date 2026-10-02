import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { renderParameters } from "../../../scripts/parameters.mjs";
import { json as originalJson } from "../search-components/output.mjs";
import { json } from "./output.mjs";

await test("page-local search preserves the response and standalone Output", () => {
  const value = (value) => ({ value });
  const empty = { results: { bindings: [] } };
  const row = {
    gmo_id: value("GMO_001010"),
    label: value("Glucose"),
    alias: value("name,with,commas"),
    matched_name: value("Glucose"),
    medium_count: value("12"),
  };
  for (const result of [empty, { results: { bindings: [row, row] } }]) {
    const inputs = {
      result,
      count: {
        results: { bindings: [{ total: value("1"), limit: value("20"), offset: value("0") }] },
      },
      roles: empty,
      properties: empty,
    };
    assert.deepEqual(json(inputs), originalJson(inputs));
    checkStandalone(json, [inputs]);
  }
});

await test("page-local search has no query variant and rejects medium count sorting", async () => {
  const config = JSON.parse(await readFile(new URL("./api.json", import.meta.url), "utf8"));
  assert.equal(config.queryVariants, undefined);
  assert.equal(renderParameters('"{{sort}}" "{{order}}"', config.parameters), '"name" "asc"');
  assert.throws(
    () => renderParameters('"{{sort}}"', config.parameters, { sort: "medium_count" }),
    /Invalid/,
  );
});
