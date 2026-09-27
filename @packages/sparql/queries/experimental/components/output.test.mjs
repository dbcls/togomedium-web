import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json } from "./output.mjs";

const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });

await test("keeps distinct labels for the same ID", () => {
  assert.deepEqual(
    json({ result: result({ id: v("C1"), label: v("A") }, { id: v("C1"), label: v("B") }) }),
    [
      { id: "C1", label: "A" },
      { id: "C1", label: "B" },
    ],
  );
});

await test("SPARQList Output runs independently", () => {
  checkStandalone(json, [
    { result: result({ id: v("C1"), label: v("Name") }) },
    { result: result() },
  ]);
});
