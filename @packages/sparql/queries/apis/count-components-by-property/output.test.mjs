import assert from "node:assert/strict";
import test from "node:test";
import { checkStandalone } from "../../../scripts/output-test-helper.mjs";
import { json } from "./output.mjs";
const v = (value) => ({ value });
const result = (...bindings) => ({ results: { bindings } });

await test("returns numeric counts including zero and omits URI and hierarchy fields", () => {
  const inputs = {
    result: result(
      { property: v("urn:p"), id: v("P1"), label: v("Property"), count: v("12") },
      { count: v("0") },
    ),
  };
  assert.deepEqual(json(inputs), [
    { id: "P1", label: "Property", count: 12 },
    { id: null, label: null, count: 0 },
  ]);
  checkStandalone(json, [inputs, { result: result() }]);
});

await test("rejects missing, invalid, or unsafe counts", () => {
  for (const count of [undefined, v(""), v("-1"), v("1.5"), v("9007199254740992")]) {
    assert.throws(() => json({ result: result({ count }) }), /safe integer/);
  }
});
