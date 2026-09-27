import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json as roles } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });

await test("Role output merges repeated parents and preserves missing values", () => {
  const a = {
    role: v("urn:r"),
    id: v("R1"),
    label: v("Role"),
    parent: v("urn:p1"),
    parent_id: v("P1"),
  };
  assert.deepEqual(
    roles({ result: result({ ...a, parent_id: undefined }, a, a, { role: v("urn:empty") }) }),
    [
      { uri: "urn:r", id: "R1", labels: ["Role"], parent: { uri: "urn:p1", id: "P1" } },
      { uri: "urn:empty", id: null, labels: [], parent: null },
    ],
  );
  assert.throws(
    () => roles({ result: result(a, { ...a, parent: v("urn:p2") }) }),
    /Multiple parents/,
  );
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(roles, [
    { result: result({ role: v("urn:r"), id: v("R1"), label: v("Role"), parent: v("urn:p") }) },
    { result: result() },
  ]);
});
